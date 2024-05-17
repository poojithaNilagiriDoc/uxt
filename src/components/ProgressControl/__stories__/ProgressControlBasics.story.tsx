import React from 'react';
import { action } from '@storybook/addon-actions';
import ProgressControl from '../index';

export default function ProgressControlBasics() {
  return (
    <ProgressControl
      maxValue={100}
      minValue={0}
      onValueChange={action('onValueChange')}
      stepSize={25}
      value={50}
    />
  );
}
