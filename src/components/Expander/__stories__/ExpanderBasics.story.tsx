import React from 'react';
import { action } from '@storybook/addon-actions';
import Expander from '../index';

export default function ExpanderBasics() {
  return (
    <>
      <Expander
        headerText="Expander: Open"
        isOpen={true}
        onIsOpenChange={action('onIsOpenChange')}
      >
        Expander Content
      </Expander>
      <Expander
        headerText="Expander: Closed"
        isOpen={false}
        onIsOpenChange={action('onIsOpenChange')}
      >
        Expander Content
      </Expander>
    </>
  );
}
