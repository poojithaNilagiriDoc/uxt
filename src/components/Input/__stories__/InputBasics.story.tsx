import React from 'react';
import { action } from '@storybook/addon-actions';
import Input from '../index';

export default function InputBasics() {
  return (
    <div style={{ padding: 16 }}>
      <Input
        label="Label With Value"
        onValueChange={action('onValueChange')}
        value="Value"
      />
    </div>
  );
}
