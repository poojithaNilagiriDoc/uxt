import isElement from './isElement';

const isDOMTypeElement = element => {
  return isElement(element) && typeof element.type === 'string';
};

export default isDOMTypeElement;
