import React from 'react';

const useCombinedRefs = <T extends unknown>(
  ...refs: Array<React.Ref<T>>
): React.MutableRefObject<T> => {
  const targetRef = React.useRef<T>();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

export default useCombinedRefs;
