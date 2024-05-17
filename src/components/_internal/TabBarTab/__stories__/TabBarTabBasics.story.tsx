import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import TabBarTab from '../index';

export default function TabBarTabBasics() {
  return (
    <div style={{ display: 'flex' }}>
      <TabBarTab
        isSelected={boolean('isSelected', false)}
        tab={{ text: text('text', '画面の設定するのペ…') }}
      />
    </div>
  );
}
