import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import Sidebar from '../index';

export default function SidebarBasics() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Sidebar isOpen={true} onIsOpenChange={action('onIsOpenChange')}>
        Some Sidebar Content
      </Sidebar>
    </Shell>
  );
}
