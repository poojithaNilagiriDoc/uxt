import React from 'react';
import Tab from '../index';

export default function TabBasics() {
  return (
    <>
      <Tab activeTabName="alpha" name="alpha" text="Alpha">
        Alpha Tab
      </Tab>
      <Tab activeTabName="alpha" name="beta" text="Beta">
        Beta Tab
      </Tab>
    </>
  );
}
