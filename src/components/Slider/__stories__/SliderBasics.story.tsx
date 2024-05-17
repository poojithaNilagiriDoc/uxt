import React from 'react';
import { action } from '@storybook/addon-actions';
import Slider from '../index';

export default function SliderBasics() {
  return (
    <>
      <Slider onValueChange={action('onValueChange')} value={0} />
      <Slider onValueChange={action('onValueChange')} value={1} />
      <Slider
        maxValue={100}
        minValue={10}
        onValueChange={action('onValueChange')}
        value={25}
      />
      <Slider
        maxValue={212}
        minValue={0}
        onValueChange={action('onValueChange')}
        stepSize={13}
        value={39}
      />
    </>
  );
}
