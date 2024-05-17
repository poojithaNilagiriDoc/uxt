import React from 'react';
import { action } from '@storybook/addon-actions';
import save from 'uxt-graphics/icons/save';
import saveAs from 'uxt-graphics/icons/save-as';
import close from 'uxt-graphics/icons/close';
import SplitButton from '../index';
import NotificationService from '../../../services/NotificationService';

export default function SplitButtonOutlined() {
  return (
    <div style={{ padding: 16 }}>
      <SplitButton
        iconSvg={save}
        text="save"
        appearance="outlined"
        onClick={action('action')}
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
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
      />
    </div>
  );
}
