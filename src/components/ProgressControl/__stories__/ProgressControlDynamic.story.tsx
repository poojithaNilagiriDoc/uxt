import React from 'react';
import ProgressControl from '../index';

export default function ProgressControlDynamic() {
  const [value, setValue] = React.useState(25);

  return (
    <ProgressControl
      maxValue={100}
      minValue={0}
      onValueChange={setValue}
      stepSize={25}
      value={value}
    />
  );
}
