import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import NotificationPanel from '../index';
import { NotificationNotification } from '../../Notification';

function getNotifications(): Array<NotificationNotification> {
  return [
    {
      headerText: 'Just now',
      id: 0,
      message:
        "A Notification that goes on and on and on and on and on and just won't stop but continues and continues.",
      type: 'info',
    },
    {
      action: () => {
        console.log('fix error');
      },
      actionText: 'details',
      headerText: 'About 10 minutes ago',
      id: 1,
      isDismissable: false,
      message: 'Database update operation failed',
      type: 'error',
    },
    {
      headerText: '3 hours ago',
      id: 2,
      message: 'Success',
      type: 'success',
    },
    {
      headerText: 'Yesterday',
      id: 3,
      message: 'This is a warning',
      type: 'warning',
    },
  ];
}

export default function NotificationPanelBasics() {
  return (
    <Shell>
      <NotificationPanel
        isOpen={true}
        notifications={getNotifications()}
        onDismissAll={action('onDismissAll')}
        onNotificationDismiss={action('onNotificationDismiss')}
        onNotificationsChange={action('onNotificationsChange')}
        onTypeFilterChange={action('onTypeFilterChange')}
        typeFilter="all"
      />
    </Shell>
  );
}
