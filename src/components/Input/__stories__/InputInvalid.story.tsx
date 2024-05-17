import React from 'react';
import Input from '../index';

export default function InputBasics() {
  return (
    <div style={{ padding: 16 }}>
      <Input
        helperText="Helper Text"
        isInvalid={true}
        label="Using isInvalid prop"
        value="Value"
      />
      <Input
        helperText="Helper Text"
        label="Using native validation"
        required={true}
      />
    </div>
  );
}
