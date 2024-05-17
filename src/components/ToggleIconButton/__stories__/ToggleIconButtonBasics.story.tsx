import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import ToggleIconButton from '../index';

export default function ToggleIconButtonBasics() {
  return (
    <div style={{ display: 'flex', padding: 16 }}>
      <ToggleIconButton
        iconSvg={star}
        isActive={true}
        onIsActiveChange={action('onIsActiveChange')}
      />
      <ToggleIconButton
        iconSvg={star}
        isActive={false}
        onIsActiveChange={action('onIsActiveChange')}
      />
    </div>
  );
}
