import React from 'react';
import Shell from '../../../Shell';
import Resizer from '../index';

export default function ResizerDynamic() {
  const [height, setHeight] = React.useState(240);
  const [width, setWidth] = React.useState(320);
  return (
    <Shell style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          backgroundColor: 'pink',
          position: 'relative',
          height,
          width,
        }}
      >
        <Resizer
          enabledDragHandles={['b', 'bl', 'br', 'l', 'r', 't', 'tl', 'tr']}
          height={height}
          maxHeight={320}
          maxWidth={480}
          minHeight={120}
          minWidth={240}
          onHeightChange={setHeight}
          onWidthChange={setWidth}
          width={width}
        />
      </div>
    </Shell>
  );
}
