import React from 'react';

export default function useIsMounted() {
  const isMountedRef = React.useRef<boolean>(true);
  const isMounted = React.useCallback((): boolean => isMountedRef.current, []);

  React.useEffect((): (() => void) => {
    return () => void (isMountedRef.current = false);
  });

  return isMounted;
}
