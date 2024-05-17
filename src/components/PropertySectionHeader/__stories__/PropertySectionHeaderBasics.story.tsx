import React from 'react';
import { action } from '@storybook/addon-actions';
import PropertySectionHeader from '../index';

export default function PropertySectionHeaderBasics() {
  return (
    <PropertySectionHeader
      isCollapsible={true}
      isOpen={true}
      name="Name"
      onClick={action('onClick')}
    />
  );
}
