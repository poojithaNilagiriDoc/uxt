import React from 'react';
import { action } from '@storybook/addon-actions';
import NestedListChildItem from '../index';

export default function NestedListChildItemBasics() {
  return (
    <NestedListChildItem
      idAccessor="id"
      item={{ id: 'a', text: 'A' }}
      onSelectedIdChange={action('onSelectedIdChange')}
      onSelectedItemChange={action('onSelectedItemChange')}
      selectedId="a"
      textAccessor="text"
    />
  );
}
