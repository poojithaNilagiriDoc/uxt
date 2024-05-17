import React from 'react';
import { action } from '@storybook/addon-actions';
import ListItemAction from '../index';

export default function ListItemActionOverflow() {
  return (
    <ListItemAction
      action={[{ text: 'Delete', action: action('delete') }]}
      item={{ id: 'a', title: 'A', description: 'Alpha' }}
    />
  );
}
