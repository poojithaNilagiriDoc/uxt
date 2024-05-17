import React from 'react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../index';

export default function CheckboxBasics() {
  return (
    <>
      <Checkbox
        isActive={true}
        onIsActiveChange={action('onIsActiveChange')}
        text="Checked: true"
      />
      <Checkbox
        isActive={false}
        onIsActiveChange={action('onIsActiveChange')}
        text="Checked: false"
      />
      <Checkbox
        isActive={true}
        isIndeterminate={true}
        onIsActiveChange={action('onIsActiveChange')}
        onIsIndeterminateChange={action('onIsIndeterminateChange')}
        text="Checked: true"
      />
    </>
  );
}
