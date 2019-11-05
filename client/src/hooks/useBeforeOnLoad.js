import { useEffect } from 'react';

export function useBeforeOnLoad(fn) {
  useEffect(() => {
    window.addEventListener('beforeunload', fn);

    return () => {
      window.removeEventListener('beforeunload', fn);
    };
  }, []);
}
