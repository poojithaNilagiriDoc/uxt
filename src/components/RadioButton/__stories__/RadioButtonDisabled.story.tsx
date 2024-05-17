import React from 'react';
import { action } from '@storybook/addon-actions';
import RadioButton from '../index';

export default function RadioButtonBasics() {
  return (
    <>
      <RadioButton
        isDisabled={true}
        onSelect={action('onSelect')}
        selectedValue={1}
        text="One"
        value={1}
      />
      <RadioButton
        isDisabled={true}
        onSelect={action('onSelect')}
        selectedValue={1}
        text="Two"
        value={2}
      />
    </>
  );
}
