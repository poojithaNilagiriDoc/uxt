import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import MasterDetail from '../index';
import views from './views';

export default function MasterDetailBasics() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <MasterDetail
        currentViewName="View B"
        isScreenWide={true}
        onCurrentViewNameChange={action('onCurrentViewNameChange')}
        views={views}
      />
    </Shell>
  );
}
