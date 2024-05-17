import React from 'react';
import ColorPickerDropdown from '../index';

export default function ColorPickerDropdownBasics() {
  return (
    <ColorPickerDropdown
      color={{
        a: 0.5,
        b: 150,
        g: 100,
        r: 50,
      }}
    />
  );
}
