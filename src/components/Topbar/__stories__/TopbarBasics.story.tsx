import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import Topbar from '../index';

export default function TopbarBasics() {
  return (
    <Shell>
      <Topbar
        onMenuPress={action('onMenuPress')}
        onSearchPress={action('onSearchPress')}
        pageTitle="Page Title"
        showMenuButton={true}
        showSearchButton={true}
      />
    </Shell>
  );
}
