import React from 'react';
import { action } from '@storybook/addon-actions';
import add from 'uxt-graphics/icons/add';
import FormDivider from '../index';

export default function FormDividerBasics() {
  return (
    <FormDivider
      action={action('add')}
      actionIconSvg={add}
      isFirstSection={false}
      text="Section Name"
    />
  );
}
