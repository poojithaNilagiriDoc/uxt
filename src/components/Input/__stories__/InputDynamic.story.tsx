import React from 'react';
import Input from '../index';

export default function InputDynamic() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 16 }}>
      <Input
        label="Favorite food"
        onValueChange={v => setValue(v)}
        value={value}
      />
    </div>
  );
}
