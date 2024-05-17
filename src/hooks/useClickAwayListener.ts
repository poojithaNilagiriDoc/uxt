import React from 'react';

const useClickAwayListener = <T extends Element>(onClickAway: () => void) => {
  const ref = React.useRef<T>(null);

  const keyboardListener = React.useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClickAway();
    },
    [onClickAway],
  );

  const clickListener = React.useCallback(
    (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Element)) {
        onClickAway();
      }
    },
    [ref, onClickAway],
  );

  const unregisterEvents = React.useCallback((): void => {
    document.removeEventListener('click', clickListener);
    document.removeEventListener('keyup', keyboardListener);
  }, [clickListener, keyboardListener]);

  const registerEvents = React.useCallback((): void => {
    unregisterEvents();
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', keyboardListener);
  }, [clickListener, keyboardListener, unregisterEvents]);

  React.useEffect((): (() => void) => {
    registerEvents();

    return () => {
      unregisterEvents();
    };
  }, [registerEvents, unregisterEvents]);

  return ref;
};

export default useClickAwayListener;
