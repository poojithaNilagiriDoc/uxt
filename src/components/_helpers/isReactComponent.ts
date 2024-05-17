import isClassComponent from './isClassComponent';
import isFunctionComponent from './isFunctionComponent';

const isReactComponent = component => {
  return isClassComponent(component) || isFunctionComponent(component);
};

export default isReactComponent;
