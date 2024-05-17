import React from 'react';
import RGBSlider from '../index';

export default function RGBSliderDynamic() {
  const [color, setColor] = React.useState({ a: 1, b: 200, g: 128, r: 50 });
  const { r, g, b, a } = color;
  return (
    <div>
      <div
        style={{
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
          borderRadius: 4,
          height: 40,
          marginLeft: 16,
          marginTop: 16,
          width: 40,
        }}
      />
      <RGBSlider
        color={color}
        controlledComponent="r"
        onColorChange={setColor}
      />
      <RGBSlider
        color={color}
        controlledComponent="g"
        onColorChange={setColor}
      />
      <RGBSlider
        color={color}
        controlledComponent="b"
        onColorChange={setColor}
      />
    </div>
  );
}
