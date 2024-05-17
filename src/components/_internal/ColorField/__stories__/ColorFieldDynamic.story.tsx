import React from 'react';
import ColorField from '../index';

export default function ColorFieldDynamic() {
  const [color, setColor] = React.useState({ a: 1, b: 150, g: 90, r: 20 });
  const { r, g, b, a } = color;
  return (
    <>
      <ColorField color={color} onColorChange={c => setColor(c)} width={400} />
      <div
        style={{
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
          height: 40,
          width: 40,
        }}
      />
    </>
  );
}
