import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../../Button';
import Toolbar from '../../Toolbar';
import OverflowButton from '../index';

function ButtonComponent({ iconSvg, ...rest }) {
  return <Button {...rest} text="Button" />;
}

export default function OverflowButtonText() {
  return (
    <Toolbar position="top">
      <OverflowButton
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        buttonComponent={ButtonComponent}
        items={[
          { text: 'Delete', action: action('DELETED') },
          { text: 'Save', action: action('SAVED') },
        ]}
      />
    </Toolbar>
  );
}
