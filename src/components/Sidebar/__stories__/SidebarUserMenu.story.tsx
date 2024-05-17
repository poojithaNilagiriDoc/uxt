import React from 'react';
import UserMenu from '../../UserMenu';
import UserMenuItem from '../../UserMenuItem';
import Shell from '../../Shell';
import Sidebar from '../index';

export default function SidebarUserMenu() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Sidebar isOpen={true}>
        <UserMenu text="Text">
          <UserMenuItem text="Item 1" />
          <UserMenuItem text="Item 2" />
        </UserMenu>
      </Sidebar>
    </Shell>
  );
}
