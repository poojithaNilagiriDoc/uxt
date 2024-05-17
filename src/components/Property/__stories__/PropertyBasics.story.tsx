import React from 'react';
import { text } from '@storybook/addon-knobs';
import Property from '../index';

export default function PropertyNameColumnWidth() {
  return (
    <Property
      name={text('Name', 'Name')}
      value={text('Value', 'Chuck Testa')}
    />
  );
}
