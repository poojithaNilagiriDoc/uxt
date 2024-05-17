import React from 'react';
import Button from '../../Button';
import Shell from '../../Shell';
import Modal from '../index';

export default function ModalDynamic() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Shell>
      <Button
        appearance="contained"
        onClick={() => setIsOpen(true)}
        style={{ margin: 'auto' }}
        text="Open Modal"
      />
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
        titleText="Title"
      >
        Some text inside a Modal
      </Modal>
    </Shell>
  );
}
