import curry from 'lodash/fp/curry';
import getOr from 'lodash/fp/getOr';
import isFunction from 'lodash/fp/isFunction';

export default curry((defaultValue, accessor, obj) => {
  if (isFunction(accessor)) {
    return accessor(obj) || defaultValue;
  }

  return getOr(defaultValue, accessor, obj);
});
