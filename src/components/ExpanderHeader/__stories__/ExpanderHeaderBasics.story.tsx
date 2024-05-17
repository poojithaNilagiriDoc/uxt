import React from 'react';
import { action } from '@storybook/addon-actions';
import ExpanderHeader from '../index';

export default function ExpanderHeaderBasics(props) {
  return (
    <>
      <ExpanderHeader
        isOpen={true}
        onIsOpenChange={action('onIsOpenChange')}
        text="Open Section"
      />
      <ExpanderHeader
        isOpen={false}
        onIsOpenChange={action('onIsOpenChange')}
        text="Closed Section"
      />
    </>
  );
}
