import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import Property from '../index';

export default function PropertyNameColumnWidth() {
  return (
    <Property
      name={text('Name', 'Name')}
      nameColumnWidth={number('nameColumnWidth', 100)}
      onNameColumnWidthChange={action('onNameColumnWidthChange')}
      value={text('Value', 'Chuck Testa')}
    />
  );
}
