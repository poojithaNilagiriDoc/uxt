import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import ToggleIconButton from '../index';

export default function ToggleIconButtonDisabled() {
  return (
    <div style={{ display: 'flex', padding: 16 }}>
      <ToggleIconButton
        iconSvg={star}
        isActive={true}
        isDisabled={true}
        onIsActiveChange={action('onIsActiveChange')}
        title="Star"
      />
      <ToggleIconButton
        iconSvg={star}
        isActive={false}
        isDisabled={true}
        onIsActiveChange={action('onIsActiveChange')}
        title="Star"
      />
    </div>
  );
}
