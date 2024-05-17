import React from 'react';
import useIsMounted from './useIsMounted';

export type Point = { x: number; y: number };

const useLongPress = function <T>(
  onClick: () => void,
  onLongPress: () => void,
  invokeCallbackOnDuration = 0,
  holdDuration = 300,
  holdDistance = 3 ** 2,
): {} {
  const timer = React.useRef<number | null>(null);
  const [startPoint, setStartPoint] = React.useState<Point>({ x: 0, y: 0 });
  const isMounted: () => boolean = useIsMounted();

  const clearTimers = (): void => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };

  React.useEffect((): (() => void) => {
    return () => {
      if (!isMounted()) {
        clearTimers();
      }
    };
  }, [isMounted]);

  const handleTimeout = React.useCallback((): void => {
    clearTimers();
    onLongPress();

    if (invokeCallbackOnDuration) {
      timer.current = window.setInterval(() => {
        onLongPress();
      }, invokeCallbackOnDuration);
    }
  }, [timer, invokeCallbackOnDuration, onLongPress]);

  function onPointerDown(e: React.PointerEvent<T>) {
    setStartPoint({ x: e.clientX, y: e.clientY });
    clearTimers();
    timer.current = window.setTimeout(handleTimeout, holdDuration);
  }

  function onPointerUp(e: React.PointerEvent<T>) {
    clearTimers();
    onClick();
  }

  function onPointerMove(e: React.PointerEvent<T>) {
    if (timer.current) {
      const fromStartPoint: number =
        (e.clientX - startPoint.x) ** 2 + (e.clientY - startPoint.y) ** 2;

      if (fromStartPoint > holdDistance) {
        clearTimers();
      }
    }
  }

  return {
    onPointerDown,
    onPointerUp,
    onPointerMove,
  };
};

export default useLongPress;
