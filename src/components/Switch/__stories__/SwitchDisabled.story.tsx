import React from 'react';
import { action } from '@storybook/addon-actions';
import Switch from '../index';

export default function SwitchDisabled() {
  return (
    <>
      <Switch
        isDisabled={true}
        isOn={true}
        onIsOnChange={action('onIsOnChange')}
        text="On: true"
      />
      <Switch
        isDisabled={true}
        isOn={false}
        onIsOnChange={action('onIsOnChange')}
        text="On: false"
      />
    </>
  );
}
