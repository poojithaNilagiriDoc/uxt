import React from 'react';
import Slider from '../../../Slider';
import TabBar from '../index';

export default function TabBarDynamic() {
  const [selectedId, setSelectedId] = React.useState('a');
  const [width, setWidth] = React.useState(300);

  return (
    <div style={{ flexDirection: 'column', position: 'relative' }}>
      <TabBar
        maxChars={16}
        onSelectedIdChange={id => setSelectedId(id)}
        selectedId={selectedId}
        tabs={[
          { id: 'a', text: 'Alpha' },
          { id: 'b', text: 'Beta' },
          { id: 'c', text: 'Charlie' },
          { id: 'd', text: 'Delta' },
          { id: 'e', text: 'Echo' },
          { id: 'f', text: 'Foxtrot' },
        ]}
        width={width}
      />
      <Slider
        maxValue={600}
        minValue={0}
        onValueChange={setWidth}
        value={width}
      />
      <div
        style={{
          backgroundColor: 'blue',
          height: 2,
          left: 0,
          position: 'absolute',
          top: 0,
          width: width + 56,
        }}
      />
      <div
        style={{
          backgroundColor: 'red',
          height: 2,
          left: 0,
          position: 'absolute',
          top: 0,
          width,
        }}
      />
    </div>
  );
}
