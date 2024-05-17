import React from 'react';
import Shell from '../../Shell';
import Tab from '../../Tab';
import Tabs from '../index';

export default function TabsDisabled() {
  const [activeTab, setActiveTab] = React.useState('classification');

  return (
    <Shell>
      <Tabs
        activeTabName={activeTab}
        onActiveTabNameChange={tab => setActiveTab(tab)}
      >
        <Tab name="home" isDisabled={true}>
          Home
        </Tab>
        <Tab name="classification">Classification</Tab>
        <Tab name="create New Document">Create New Document</Tab>
        <Tab name="feature" isDisabled={true}>
          Feature
        </Tab>
        <Tab name="new">New</Tab>
      </Tabs>
    </Shell>
  );
}
