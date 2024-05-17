import React from 'react';
import Input from '../index';

export default function InputReadOnly() {
  return (
    <div style={{ padding: 16 }}>
      <Input label="Read-only Value" readOnly={true} value="Can't touch me" />
    </div>
  );
}
