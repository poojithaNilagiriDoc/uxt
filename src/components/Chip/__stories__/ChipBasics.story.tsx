import React from 'react';
import { action } from '@storybook/addon-actions';
import Chip from '../index';

export default function ChipBasics() {
  return (
    <>
      <Chip
        isActive={true}
        onIsActiveChange={action('onIsActive')}
        text="Active"
      />
      <Chip
        isActive={false}
        onIsActiveChange={action('onIsActive')}
        text="Inactive"
      />
    </>
  );
}
