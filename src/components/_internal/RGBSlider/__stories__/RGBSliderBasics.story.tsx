import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, select, text } from '@storybook/addon-knobs';
import RGBSlider from '../index';

export default function RGBSliderBasics() {
  return (
    <RGBSlider
      color={{
        b: number('b', 50),
        g: number('g', 150),
        r: number('r', 255),
        a: number('a', 255),
      }}
      controlledComponent={select('controlledComponent', ['b', 'g', 'r'], 'b')}
      label={text('label', '')}
      onColorChange={action('onColorChange')}
    />
  );
}
