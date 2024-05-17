import React from 'react';
import Checkbox from '../index';

export default function CheckboxDynamic() {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <Checkbox
      isActive={isActive}
      onIsActiveChange={() => setIsActive(!isActive)}
      text={`Checked: ${isActive}`}
    />
  );
}
