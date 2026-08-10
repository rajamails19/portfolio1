#!/usr/bin/env bash
# Runs before a dev:* script starts its vite server. If the target port is
# already taken by a leftover/orphaned process (exactly what happened with
# the seminarteach mixup), this prints who's holding it and a ready-to-run
# kill command, then stops — instead of letting vite silently pick a
# different port or, worse, a second process silently binding the same port.
#
# Usage: scripts/check-port.sh <port>

set -uo pipefail

PORT="${1:?Usage: check-port.sh <port>}"

PIDS=$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | sort -u)

if [ -z "$PIDS" ]; then
  exit 0
fi

PID_SPACE=$(echo "$PIDS" | tr '\n' ' ' | sed 's/ *$//')
PID_CSV=$(echo "$PIDS" | tr '\n' ',' | sed 's/,$//')

echo ""
echo "Port $PORT is already in use:"
echo ""
ps -o pid,lstart,command -p "$PID_CSV"
echo ""
echo "To free it, run:"
echo ""
echo "  kill $PID_SPACE"
echo ""

exit 1
