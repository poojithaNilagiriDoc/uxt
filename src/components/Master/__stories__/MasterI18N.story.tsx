import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import Master from '../index';

const viewNames = ['user', 'language', 'system'];

export default function MasterI18N() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Master
        currentViewName="language"
        getMasterItemText={viewName =>
          ({
            user: 'ユーザー',
            language: '言語',
            system: '本体',
          }[viewName])
        }
        isScreenWide={true}
        onCurrentViewNameChange={action('onCurrentViewNameChange')}
        viewNames={viewNames}
      />
    </Shell>
  );
}
