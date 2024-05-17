import React from 'react';
import { action } from '@storybook/addon-actions';
import ContextMenu from '../index';

export default function ContextMenuBasics() {
  return (
    <ContextMenu
      anchorPoint={{ x: 200, y: 100 }}
      isOpen={true}
      items={[
        { text: 'Delete', action: action('Delete') },
        { text: 'Save', action: action('Save') },
      ]}
      onIsOpenChange={action('onIsOpenChange')}
    />
  );
}
