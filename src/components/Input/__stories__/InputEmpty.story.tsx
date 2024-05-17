import React from 'react';
import Input from '../index';

export default function InputEmpty() {
  return (
    <div style={{ padding: 16 }}>
      <Input helperText="Helper Text" label="Label Without Value" />
    </div>
  );
}
