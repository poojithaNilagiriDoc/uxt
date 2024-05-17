import React from 'react';
import Input from '../index';

export default function InputEqualWidths() {
  return (
    <div style={{ display: 'flex', padding: 16, width: 350 }}>
      <Input
        label="Label"
        style={{
          flex: '1 1 auto',
        }}
        value="Value That's cool"
      />
      <Input
        label="Label"
        style={{
          flex: '1 1 auto',
        }}
        value="Value"
      />
      <Input
        label="Label"
        style={{
          flex: '1 1 auto',
        }}
        value="Value"
      />
      <Input
        label="Label"
        style={{
          flex: '1 1 auto',
        }}
        value="Value"
      />
    </div>
  );
}
