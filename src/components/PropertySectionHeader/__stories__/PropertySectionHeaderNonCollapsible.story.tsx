import React from 'react';
import { action } from '@storybook/addon-actions';
import PropertySectionHeader from '../index';

export default function PropertySectionHeaderNonCollapsible() {
  return (
    <PropertySectionHeader
      isCollapsible={false}
      isOpen={true}
      name="Name"
      onClick={action('onClick')}
    />
  );
}
