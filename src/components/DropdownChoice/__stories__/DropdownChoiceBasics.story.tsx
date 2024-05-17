import React from 'react';
import { action } from '@storybook/addon-actions';
import DropdownChoice from '../index';

export default function DropdownChoiceBasics() {
  return (
    <>
      <DropdownChoice
        onSelect={action('onSelect')}
        selectedValue={4}
        text="Four"
        value={4}
      />
      <DropdownChoice
        onSelect={action('onSelect')}
        selectedValue={4}
        text="Five"
        value={5}
      />
    </>
  );
}
