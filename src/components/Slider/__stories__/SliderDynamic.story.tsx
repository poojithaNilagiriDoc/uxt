import React from 'react';
import Slider from '../index';
import Checkbox from '../../Checkbox';

export default function SliderDynamic() {
  const [value, setValue] = React.useState(150);
  const [isDragTooltipEnabled, setIsDragTooltipEnabled] =
    React.useState<boolean>(true);
  return (
    <div>
      <Checkbox
        text="Enable Drag Tooltip"
        isActive={isDragTooltipEnabled}
        onIsActiveChange={() => {
          setIsDragTooltipEnabled(!isDragTooltipEnabled);
        }}
      />
      <Slider
        maxValue={355}
        minValue={12}
        onValueChange={setValue}
        stepSize={15}
        value={value}
        enableDragTooltip={isDragTooltipEnabled}
      />
      <div>{value}</div>
    </div>
  );
}
