import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import showIf from '../../../_helpers/showIf';
import TabBar from '../index';

export default function TabBarBasics() {
  const showWidthGuides = boolean('showWidthGuides', false);
  const width = number('width', 300);

  return (
    <>
      <TabBar
        maxChars={number('maxChars', 5)}
        onSelectedIdChange={action('onSelectedIdChange')}
        selectedId={text('selectedId', 'b')}
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
      {showIf(showWidthGuides)(
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 2,
            backgroundColor: 'blue',
            width,
          }}
        />,
      )}
      {showIf(showWidthGuides)(
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 2,
            backgroundColor: 'red',
            width: width - 56,
          }}
        />,
      )}
    </>
  );
}
