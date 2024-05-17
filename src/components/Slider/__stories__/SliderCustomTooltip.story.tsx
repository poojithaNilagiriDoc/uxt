import React from 'react';
import Slider from '../index';

function TooltipContentComponent(props) {
  return (
    <div
      style={{
        backgroundColor: `hsl(${props.value}, 75%, 50%)`,
        height: 64,
        width: 64,
      }}
      value={props.value}
    />
  );
}

export default function SliderCustomTooltip() {
  const [value, setValue] = React.useState(180);

  return (
    <div style={{ flexDirection: 'column' }}>
      <Slider
        maxValue={360}
        minValue={0}
        onValueChange={setValue}
        stepSize={10}
        tooltipContentComponent={TooltipContentComponent}
        value={value}
      />
    </div>
  );
}
