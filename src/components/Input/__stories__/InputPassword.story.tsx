import React from 'react';
import Input from '../index';

export default function InputPassword() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 16, width: 250 }}>
      <Input
        label="Password"
        onValueChange={v => setValue(v)}
        type="password"
        value={value}
        enableShowPassword={true}
      />
    </div>
  );
}
