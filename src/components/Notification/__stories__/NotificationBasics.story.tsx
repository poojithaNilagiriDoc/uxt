import React from 'react';
import { action } from '@storybook/addon-actions';
import Notification from '../index';

const notification = {
  action: action('action'),
  actionText: 'Action',
  headerText: 'Header Text',
  id: 0,
  message:
    'Ea elit aute in aliqua elit commodo eu. Pariatur sint irure excepteur ut proident consequat amet est aliqua culpa fugiat esse excepteur fugiat. Minim nostrud eiusmod dolore irure irure tempor mollit nisi.',
  secondaryAction: action('secondary action'),
  secondaryActionText: 'Secondary Action',
};

export default function NotificationBasics() {
  return (
    <>
      <Notification
        notification={{ ...notification, type: 'error' }}
        onDismiss={action('onDismiss')}
        style={{ margin: 16 }}
      />
      <Notification
        notification={{ ...notification, type: 'info' }}
        onDismiss={action('onDismiss')}
        style={{ margin: 16 }}
      />
      <Notification
        notification={{ ...notification, type: 'success' }}
        onDismiss={action('onDismiss')}
        style={{ margin: 16 }}
      />
      <Notification
        notification={{ ...notification, type: 'warning' }}
        onDismiss={action('onDismiss')}
        style={{ margin: 16 }}
      />
    </>
  );
}
