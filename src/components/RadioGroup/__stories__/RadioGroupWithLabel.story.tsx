import React from 'react';
import { action } from '@storybook/addon-actions';
import RadioButton from '../../RadioButton';
import RadioGroup from '../index';

export default function RadioGroupWithLabel() {
  return (
    <div style={{ padding: 16 }}>
      <RadioGroup
        label="Radio Group Label"
        onValueChange={action('onValueChange')}
        value={2}
      >
        <RadioButton text="One" value={1} />
        <RadioButton text="Two" value={2} />
        <RadioButton text="Three" value={3} />
      </RadioGroup>
    </div>
  );
}
