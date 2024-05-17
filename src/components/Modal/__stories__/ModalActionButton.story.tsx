import React from 'react';
import saveAs from 'uxt-graphics/icons/save-as';
import close from 'uxt-graphics/icons/close';
import Button from '../../Button';
import Shell from '../../Shell';
import Modal from '../index';
import NotificationService from '../../../services/NotificationService';

export default function ModalActionButton() {
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
        showActionButton={true}
        actionText={'click'}
        onAction={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
        titleText="Title"
        subtitleText="Secondary Text"
        submitButtonType="SplitButton"
        submitButtonItems={[
          {
            iconSvg: saveAs,
            text: 'Save As',
            action: () => {
              NotificationService.info('Save To Computer');
            },
          },
          {
            iconSvg: close,
            text: 'Save and Close',
            action: () => {
              NotificationService.info('Save and Close');
            },
          },
        ]}
      >
        Some text inside a Modal
      </Modal>
    </Shell>
  );
}
