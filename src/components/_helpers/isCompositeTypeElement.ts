import isElement from './isElement';

const isCompositeTypeElement = element => {
  return isElement(element) && typeof element.type === 'function';
};

export default isCompositeTypeElement;
