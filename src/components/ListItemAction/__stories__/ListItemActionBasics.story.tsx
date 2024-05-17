import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import ListItemAction from '../index';

export default function ListItemActionBasics() {
  return (
    <ListItemAction
      action={action('star')}
      iconSvg={star}
      item={{ id: 'a', title: 'A', description: 'Alpha' }}
    />
  );
}
