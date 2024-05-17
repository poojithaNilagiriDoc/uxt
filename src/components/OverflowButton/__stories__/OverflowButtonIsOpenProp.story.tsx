import React from 'react';
import { action } from '@storybook/addon-actions';
import Toolbar from '../../Toolbar';
import OverflowButton from '../index';

export default function OverflowButtonIsOpenProp() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpenChange = React.useCallback(value => {
    console.log('Setting "isOpen":', value);

    setIsOpen(value);
  }, []);

  return (
    <Toolbar position="top">
      <OverflowButton
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        isOpen={isOpen}
        items={[
          { text: 'Delete', action: action('DELETED') },
          { text: 'Save', action: action('SAVED') },
        ]}
        onIsOpenChange={handleIsOpenChange}
      />
    </Toolbar>
  );
}
