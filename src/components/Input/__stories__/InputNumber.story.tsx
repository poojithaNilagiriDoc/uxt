import React from 'react';
import Input from '../index';

export default function InputNumber() {
  const [value, setValue] = React.useState(0);

  return (
    <div style={{ padding: 16 }}>
      <Input
        label="Favorite number"
        max={10}
        min={-10}
        onValueChange={v => setValue(parseFloat(v))}
        step="0.01"
        type="number"
        value={String(value)}
      />
    </div>
  );
}
