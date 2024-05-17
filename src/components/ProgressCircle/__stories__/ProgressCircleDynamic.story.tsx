import React from 'react';
import Button from '../../Button';
import Slider from '../../Slider';
import ProgressCircle from '../index';

export default function ProgressCircleDynamic() {
  const [size, setSize] = React.useState(56);
  const [value, setValue] = React.useState(25);

  return (
    <div
      style={{
        alignItems: 'flex-start',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        padding: 16,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <div style={{ height: 128 }}>
        <ProgressCircle
          size={size}
          style={{ marginBottom: 16 }}
          value={value}
        />
      </div>
      <Slider
        isInputEnabled={true}
        maxValue={128}
        minValue={32}
        onValueChange={setSize}
        stepSize={8}
        style={{ alignSelf: 'stretch', marginLeft: -16, marginRight: -16 }}
        value={size}
      />
      <Slider
        isInputEnabled={true}
        maxValue={100}
        minValue={0}
        onValueChange={setValue}
        style={{ alignSelf: 'stretch', marginLeft: -16, marginRight: -16 }}
        value={value}
      />
      {[0, 25, 50, 75, 100].map(value => (
        <Button
          key={value}
          onClick={() => setValue(value)}
          style={{ marginBottom: 8 }}
          text={String(value)}
        />
      ))}
    </div>
  );
}
