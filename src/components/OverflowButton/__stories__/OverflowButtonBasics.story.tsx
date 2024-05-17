import React from 'react';
import { action } from '@storybook/addon-actions';
import Toolbar from '../../Toolbar';
import OverflowButton from '../index';

export default function OverflowButtonBasics() {
  return (
    <Toolbar position="top">
      <OverflowButton
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        items={[
          { text: 'Delete', action: action('DELETED') },
          { text: 'Save', action: action('SAVED') },
        ]}
      />
    </Toolbar>
  );
}
