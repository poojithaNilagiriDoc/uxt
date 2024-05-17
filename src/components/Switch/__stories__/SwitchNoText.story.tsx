import React from 'react';
import { action } from '@storybook/addon-actions';
import Switch from '../index';

export default function SwitchNoText() {
  return (
    <>
      <Switch isOn={true} onIsOnChange={action('onIsOnChange')} />
      <Switch isOn={false} onIsOnChange={action('onIsOnChange')} />
    </>
  );
}
