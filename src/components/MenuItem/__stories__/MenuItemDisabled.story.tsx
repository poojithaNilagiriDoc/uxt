import React from 'react';
import { action } from '@storybook/addon-actions';
import MenuItem from '../index';

export default function MenuItemDisabled() {
  return (
    <MenuItem
      item={{
        text: 'Delete',
        children: [{}],
        disabled: true,
      }}
      onSelect={action('onSelect')}
    />
  );
}
