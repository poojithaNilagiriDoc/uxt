import React from 'react';
import home from 'uxt-graphics/icons/home';
import add from 'uxt-graphics/icons/add';
import classification from 'uxt-graphics/icons/classification-structure';
import document from 'uxt-graphics/icons/document-add';
import filter from 'uxt-graphics/icons/filter';
import Shell from '../../Shell';
import Tab from '../../Tab';
import Tabs from '../index';

export default function TabsWithIcon() {
  const [activeTab, setActiveTab] = React.useState<string>('classification');

  return (
    <Shell>
      <Tabs
        isCentered={true}
        activeTabName={activeTab}
        onActiveTabNameChange={(tab: string) => setActiveTab(tab)}
      >
        <Tab name="home" iconSvg={home} isDisabled={true}>
          Home
        </Tab>
        <Tab name="classification" iconSvg={classification}>
          Classification
        </Tab>
        <Tab name="create New Document" iconSvg={document}>
          Create New Document
        </Tab>
        <Tab name="feature" iconSvg={filter}>
          Feature
        </Tab>
        <Tab name="new" iconSvg={add}>
          New
        </Tab>
      </Tabs>
    </Shell>
  );
}
