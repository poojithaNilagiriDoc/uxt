import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import Master from '../index';

const viewNames = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
];

export default function MasterBasics() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Master
        currentViewName="B"
        isScreenWide={true}
        onCurrentViewNameChange={action('onCurrentViewNameChange')}
        viewNames={viewNames}
      />
    </Shell>
  );
}
