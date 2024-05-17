import curry from 'lodash/fp/curry';
import includes from 'lodash/fp/includes';
import without from 'lodash/fp/without';

export default curry((x, xs) =>
  includes(x, xs) ? without([x], xs) : [...xs, x],
);
