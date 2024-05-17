import React from 'react';
import { action } from '@storybook/addon-actions';
import save from 'uxt-graphics/icons/save';
import saveAs from 'uxt-graphics/icons/save-as';
import close from 'uxt-graphics/icons/close';
import SplitButton from '../index';
import NotificationService from '../../../services/NotificationService';

export default function SplitButtonIsOpenProp() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpenChange = React.useCallback(value => {
    setIsOpen(value);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <SplitButton
        iconSvg={save}
        text="save"
        onClick={action('action')}
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        isOpen={isOpen}
        items={[
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
        onIsOpenChange={handleIsOpenChange}
      />
    </div>
  );
}
