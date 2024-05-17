import React from 'react';
import Shell from '../../Shell';
import Tab from '../../Tab';
import Tabs from '../index';

export default function TabsBasics() {
  const [activeTab, setActiveTab] = React.useState('classification');

  return (
    <Shell>
      <Tabs
        activeTabName={activeTab}
        // isCentered={false}
        onActiveTabNameChange={tab => setActiveTab(tab)}
      >
        <Tab name="home">Home</Tab>
        <Tab name="classification">Classification</Tab>
        <Tab name="create New Document">Create New Document</Tab>
        <Tab name="feature">Feature</Tab>
        <Tab name="new">New</Tab>
      </Tabs>
    </Shell>
  );
}
