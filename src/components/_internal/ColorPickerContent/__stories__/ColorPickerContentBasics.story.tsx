import React from 'react';
import { action } from '@storybook/addon-actions';
import ColorPickerContent from '../index';

export default function ColorPickerContentBasics() {
  return (
    <ColorPickerContent
      color={{
        a: 1,
        b: 150,
        g: 100,
        r: 50,
      }}
      onColorChange={action('onColorChange')}
      opacityText="不透明性"
    />
  );
}
