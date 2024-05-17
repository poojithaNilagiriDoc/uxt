import React from 'react';
import { action } from '@storybook/addon-actions';
import MenuItem from '../index';

export default function MenuItemBasics() {
  return (
    <MenuItem
      item={{
        text: 'Delete',
        children: [{}],
      }}
      onSelect={action('onSelect')}
    />
  );
}
