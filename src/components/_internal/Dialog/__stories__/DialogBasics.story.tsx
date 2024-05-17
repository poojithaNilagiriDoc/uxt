import React from 'react';
import { action } from '@storybook/addon-actions';
import Dialog from '../index';

export default function DialogBasics() {
  return (
    <Dialog
      cancelText="cancel"
      errorText="Error"
      message="A long message to fill up the dialog."
      onCancel={action('onCancel')}
      onSubmit={action('onSubmit')}
      submitText="ok"
      successText="Success"
      titleText="Title"
      type="error"
      warningText="Warning"
    />
  );
}
