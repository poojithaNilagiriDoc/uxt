import React from 'react';
import { action } from '@storybook/addon-actions';
import Switch from '../index';

export default function SwitchBasics() {
  return (
    <>
      <Switch
        isOn={true}
        onIsOnChange={action('onIsOnChange')}
        text="On: true"
      />
      <Switch
        isOn={false}
        onIsOnChange={action('onIsOnChange')}
        text="On: false"
      />
    </>
  );
}
