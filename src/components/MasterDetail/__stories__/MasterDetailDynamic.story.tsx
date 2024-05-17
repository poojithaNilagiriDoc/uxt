import React from 'react';
import Shell from '../../Shell';
import MasterDetail from '../index';
import views from './views';

export default function MasterDetailDynamic() {
  const [currentViewName, setCurrentViewNameChange] =
    React.useState<string>('');

  return (
    <Shell>
      <MasterDetail
        currentViewName={currentViewName}
        isScreenWide={true}
        onCurrentViewNameChange={setCurrentViewNameChange}
        views={views}
      />
    </Shell>
  );
}
