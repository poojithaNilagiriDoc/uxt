import React from 'react';

const isElement = element => {
  return React.isValidElement(element);
};

export default isElement;
