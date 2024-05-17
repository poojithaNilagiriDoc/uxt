import React from 'react';
import { action } from '@storybook/addon-actions';
import Snackbar from '../index';

const getSnackbar = type => (
  <Snackbar
    actionText="action"
    key={type}
    message="Message"
    onActionClick={action('onActionClick')}
    style={{ marginTop: 16 }}
    type={type}
  />
);

export default function SnackbarBasics() {
  return (
    <div style={{ padding: 16, paddingTop: 0 }}>
      {['error', 'info', 'success', 'warning'].map(getSnackbar)}
    </div>
  );
}
