import React from 'react';
import Input from '../index';

export default function InputDynamic() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 16 }}>
      <Input
        id="my-file-input"
        label="Upload Input"
        onValueChange={v => {
          console.log(v);
          setValue(v);
        }}
        type="file"
        placeholder="Select person"
        value={value}
      />
      <Input
        id="my-other-input"
        label="Other Input"
        type="file"
        value={value}
      />
    </div>
  );
}
