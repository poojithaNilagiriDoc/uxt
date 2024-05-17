import React from 'react';
import { action } from '@storybook/addon-actions';
import Input from '../../Input';
import Modal from '../index';

export default function ModalBasics() {
  return (
    <Modal
      isOpen={true}
      onCancel={action('onCancel')}
      onSubmit={action('onSubmit')}
      titleText="Title"
    >
      <Input label="Input" value="Value" />
    </Modal>
  );
}
