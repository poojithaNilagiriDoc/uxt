import React from 'react';
import Shell from '../../Shell';
import NotificationPanel from '../index';

export default function NotificationPanelEmpty() {
  return (
    <Shell>
      <NotificationPanel isOpen={true} />
    </Shell>
  );
}
