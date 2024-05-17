import React from 'react';
import Chip from '../index';

export default function ChipDelete() {
  return (
    <>
      <Chip
        isActive={true}
        text="Active"
        onDelete={() => console.log('deleted chip')}
      />
      <Chip
        isActive={false}
        text="Inactive"
        onDelete={() => console.log('deleted chip')}
      />
    </>
  );
}
