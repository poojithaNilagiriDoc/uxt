import curry from 'lodash/fp/curry';

export default curry((index, getReplacement, array) => [
  ...array.slice(0, index),
  getReplacement(array[index]),
  ...array.slice(index + 1),
]);
