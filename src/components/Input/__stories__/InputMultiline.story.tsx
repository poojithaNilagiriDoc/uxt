import React from 'react';
import { action } from '@storybook/addon-actions';
import Input from '../index';

export default function InputMultiline() {
  return (
    <div style={{ padding: 16 }}>
      <Input
        isMultiline={true}
        label="Multiline Input"
        onValueChange={action('onValueChange')}
        value="Sunt consectetur anim nostrud ea ea commodo ad quis. Nulla ipsum velit elit quis do amet amet ipsum irure."
      />
    </div>
  );
}
