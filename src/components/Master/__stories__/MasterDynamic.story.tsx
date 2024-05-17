import React from 'react';
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

export default function MasterDynamic() {
  const [currentViewName, setCurrentViewName] = React.useState('A');

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Master
        currentViewName={currentViewName}
        isScreenWide={true}
        onCurrentViewNameChange={setCurrentViewName}
        viewNames={viewNames}
      />
    </Shell>
  );
}
