import React from 'react';
import { action } from '@storybook/addon-actions';
import UserMenuItem from '../index';

export default function UserMenuItemBasics() {
  return <UserMenuItem onClick={action('onClick')} text="Text" />;
}
