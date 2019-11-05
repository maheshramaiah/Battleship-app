import { useState, useEffect } from 'react';

export function useOnline() {
  const [isOnline, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const isOnline = () => setOnline(true);
    const isOffline = () => setOnline(false);

    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOffline);

    return () => {
      window.removeEventListener('online', isOnline);
      window.removeEventListener('offline', isOffline);
    };
  }, []);

  return { isOnline };
}
