import React from 'react';
import ProgressCircle from '../index';

export default function ProgressCircleBasics() {
  return (
    <div style={{ padding: 16 }}>
      <ProgressCircle value={0} />
      <ProgressCircle value={25} />
      <ProgressCircle value={50} />
      <ProgressCircle value={75} />
      <ProgressCircle value={100} />
    </div>
  );
}
