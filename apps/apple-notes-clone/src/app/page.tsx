'use client';

import { useSyncExternalStore } from 'react';
import AppShell from '@/components/AppShell';

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-editor)',
      color: 'var(--text-muted)',
      fontFamily: 'BlinkMacSystemFont, \"SF Pro Text\", sans-serif',
      fontSize: 14,
    }}>
      Opening ABC Notes...
    </div>
  );
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Home() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) return <LoadingScreen />;
  return <AppShell />;
}
