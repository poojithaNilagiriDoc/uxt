import React from 'react';
import Chip from '../index';

export default function ChipDynamic() {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <Chip
      isActive={isActive}
      onIsActiveChange={x => setIsActive(x)}
      text="Potato"
    />
  );
}
