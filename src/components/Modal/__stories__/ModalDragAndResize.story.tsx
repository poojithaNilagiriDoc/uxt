import React from 'react';
import Button from '../../Button';
import Shell from '../../Shell';
import Modal from '../index';

export default function ModalDragAndResize() {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

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
        showActionButton={true}
        actionText={'click'}
        isDraggable={true}
        isResizable={true}
        onAction={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
        titleText="Title"
      >
        Some text inside a Modal
      </Modal>
    </Shell>
  );
}
