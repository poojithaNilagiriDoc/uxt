import React from 'react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../index';

export default function CheckboxDisabled() {
  return (
    <>
      <Checkbox
        isActive={true}
        isDisabled={true}
        onIsActiveChange={action('onIsActiveChange')}
        text="Checked: true"
      />
      <Checkbox
        isActive={false}
        isDisabled={true}
        onIsActiveChange={action('onIsActiveChange')}
        text="Checked: false"
      />
      <Checkbox
        isActive={true}
        isDisabled={true}
        isIndeterminate={true}
        onIsActiveChange={action('onIsActiveChange')}
        text="Checked: true"
      />
    </>
  );
}
