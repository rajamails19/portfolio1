#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readFile, unlink } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';

const DEFAULT_START_PORT = 8092;
const MAX_PORT_ATTEMPTS = 100;
const NEXT_LOCK_FILE = new URL('../.next/dev/lock', import.meta.url);
const NEXT_BIN = new URL('../node_modules/next/dist/bin/next', import.meta.url);

function parsePort(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed < 65536 ? parsed : fallback;
}

function isProcessRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function isHttpServerReady(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(true);
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
    req.once('error', () => resolve(false));
  });
}

async function getRunningNextServer() {
  try {
    const lock = JSON.parse(await readFile(NEXT_LOCK_FILE, 'utf8'));
    const appUrl = lock.appUrl ?? `http://localhost:${lock.port}`;
    if (isProcessRunning(lock.pid) && await isHttpServerReady(appUrl)) return { ...lock, appUrl };

    await unlink(NEXT_LOCK_FILE);
    console.log('Removed stale Next dev lock.');
  } catch {
    // Missing or unreadable lock files are fine; start a fresh dev server.
  }
  return null;
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once('error', () => resolve(false));
    server.listen({ port, host: '0.0.0.0' }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findOpenPort(startPort) {
  for (let port = startPort; port < startPort + MAX_PORT_ATTEMPTS; port += 1) {
    if (await canUsePort(port)) return port;
  }
  throw new Error(`No open port found from ${startPort} to ${startPort + MAX_PORT_ATTEMPTS - 1}.`);
}

const running = await getRunningNextServer();
if (running) {
  console.log(`ABC Notes is already running at ${running.appUrl ?? `http://localhost:${running.port}`}`);
  console.log(`Existing dev server PID: ${running.pid}`);
  process.exit(0);
}

const forwardedArgs = process.argv.slice(2);
const cliPort = forwardedArgs.find((arg) => /^\d+$/.test(arg));
const startPort = parsePort(cliPort ?? process.env.PORT ?? process.env.START_PORT, DEFAULT_START_PORT);
const port = await findOpenPort(startPort);
const devModeArgs = forwardedArgs.some((arg) => arg === '--turbopack' || arg === '--webpack') ? [] : ['--webpack'];

console.log(`Starting ABC Notes on http://localhost:${port}`);

const child = spawn(process.execPath, [NEXT_BIN.pathname, 'dev', '-p', String(port), ...devModeArgs, ...forwardedArgs.filter((arg) => arg !== cliPort)], {
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(`Unable to start ABC Notes dev server: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
