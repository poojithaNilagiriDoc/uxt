import React from 'react';
import components from 'uxt-graphics/graphics/components';
import Graphic from '../index';

export default function GraphicBasics() {
  return (
    <>
      <Graphic size="small" svg={components} />
      <Graphic size="regular" svg={components} />
      <Graphic size="large" svg={components} />
      <Graphic style={{ fill: 'blue' }} svg={components} />
      <Graphic size={100} svg={components} />
    </>
  );
}
