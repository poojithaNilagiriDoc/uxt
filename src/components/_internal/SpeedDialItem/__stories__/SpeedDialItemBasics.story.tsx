import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import SpeedDialItem from '../index';

export default function SpeedDialItemBasics() {
  return (
    <SpeedDialItem
      action={action('action')}
      iconSvg={star}
      onActionInvoke={action('onActionInvoke')}
      text="Text"
    />
  );
}
