import React from 'react';
import { action } from '@storybook/addon-actions';
import add from 'uxt-graphics/icons/add';
import closeSvg from 'uxt-graphics/icons/close';
import Input from '../../Input';
import ListItem from '../../ListItem';
import PushPanel from '../../PushPanel';
import Shell from '../../Shell';
import Toolbar from '../../Toolbar';
import FormDivider from '../index';

export default function FormDividerContext() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <PushPanel
        isOpen={true}
        style={{ borderRight: '1px solid #ccc' }}
        width={420}
      >
        <Toolbar position="top">
          <h1>My Project</h1>
        </Toolbar>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 24,
          }}
        >
          <Input label="Project Name" value="My Project" />
        </div>
        <FormDivider
          action={action('add')}
          actionIconSvg={add}
          text="Documents"
        />
        <ListItem
          action={action('')}
          actionIconSvg={closeSvg}
          primaryTextAccessor={() => 'Financial Report.pptx'}
        />
        <ListItem
          action={action('')}
          actionIconSvg={closeSvg}
          primaryTextAccessor={() => 'Employee Records.xlsx'}
        />
        <ListItem
          action={action('')}
          actionIconSvg={closeSvg}
          primaryTextAccessor={() => 'Design Plan.docx'}
        />
      </PushPanel>
    </Shell>
  );
}
