import React from 'react';
import Chip from '../index';

export default function ChipSingleSelect() {
  const [selectedId, setSelectedId] = React.useState('Small');

  return (
    <>
      <Chip
        isActive={selectedId === 'Small'}
        onIsActiveChange={() => setSelectedId('Small')}
        text="Small"
      />
      <Chip
        isActive={selectedId === 'Medium'}
        onIsActiveChange={() => setSelectedId('Medium')}
        text="Medium"
      />
      <Chip
        isActive={selectedId === 'Large'}
        onIsActiveChange={() => setSelectedId('Large')}
        text="Large"
      />
    </>
  );
}
