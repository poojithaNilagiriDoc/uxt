import React from 'react';
import { action } from '@storybook/addon-actions';
import UserMenuItem from '../../UserMenuItem';
import UserMenu from '../index';

export default function UserMenuBasics() {
  return (
    <UserMenu text="Menu Text">
      <UserMenuItem onClick={action('SETTINGS_PRESSED')} text="Settings" />
      <UserMenuItem onClick={action('LOG_OUT_PRESSED')} text="Log Out" />
    </UserMenu>
  );
}
