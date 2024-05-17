import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import MasterDetail from '../index';

const views = {
  user: () => <div>User</div>,
  language: () => <div>Language</div>,
  system: () => <div>System</div>,
};

export default function MasterDetailI18N() {
  const getMasterItemText = React.useCallback(function getMasterItemText(
    viewName,
  ) {
    return {
      user: 'ユーザー',
      language: '言語',
      system: '本体',
    }[viewName];
  },
  []);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <MasterDetail
        currentViewName="language"
        getMasterItemText={getMasterItemText}
        isScreenWide={true}
        onCurrentViewNameChange={action('onCurrentViewNameChange')}
        views={views}
      />
    </Shell>
  );
}
