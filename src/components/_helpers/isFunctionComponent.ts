import React from 'react';

const test = React.createElement;

const isFunctionComponent = component => {
  return (
    typeof component === 'function' &&
    (String(component).includes(`return ${test}`) ||
      String(component).includes('return React.createElement') ||
      String(component).includes('return React.createElementWithValidation'))
  );
};

export default isFunctionComponent;
