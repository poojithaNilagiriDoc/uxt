const isClassComponent = component => {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  );
};

export default isClassComponent;
