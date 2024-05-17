import safeGet from './safeGet';

const withoutBy = <T>(
  values: T[],
  array: T[],
  propName: string = 'id',
): T[] => {
  if (
    (!values && !array) ||
    (values &&
      array &&
      ((values.length === 0 && array.length === 0) || array.length === 0))
  ) {
    return [];
  }

  if (!array && values && values.length > 0) {
    return [];
  }

  if (!values && array && array.length > 0) {
    return array;
  }

  return values.reduce(
    (acc, cur) => {
      return acc.filter(
        accItem =>
          safeGet(undefined, propName, accItem) !==
          safeGet(undefined, propName, cur),
      );
    },
    [...array],
  );
};

export default withoutBy;
