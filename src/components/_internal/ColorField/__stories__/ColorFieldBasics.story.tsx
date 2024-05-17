import React from 'react';
import { action } from '@storybook/addon-actions';
import ColorField from '../index';

export default function ColorFieldBasics() {
  const color = {
    a: 1,
    b: 150,
    g: 100,
    r: 50,
  };

  return (
    <ColorField
      color={color}
      onColorChange={action('onColorChange')}
      width={400}
    />
  );
}
