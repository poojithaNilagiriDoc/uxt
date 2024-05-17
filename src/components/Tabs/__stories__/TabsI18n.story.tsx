import getOr from 'lodash/fp/getOr';
import React from 'react';
import RadioButton from '../../RadioButton';
import RadioGroup from '../../RadioGroup';
import Tab from '../../Tab';
import Tabs from '../index';

const strings = {
  'en-US': {
    MY_TABS_CLASSIFICATION: 'Classification',
    MY_TABS_DOCUMENTS: 'Documents',
  },
  jp: { MY_TABS_CLASSIFICATION: '分類', MY_TABS_DOCUMENTS: '資料' },
};

export default function TabsI18N() {
  const [activeTabName, setActiveTabName] = React.useState();
  const [locale, setLocale] = React.useState('en-US');

  const getTabText = React.useCallback(
    function getTabText(name) {
      return getOr(name, `${locale}.${name}`, strings);
    },
    [locale],
  );

  return (
    <Tabs
      activeTabName={activeTabName}
      onActiveTabNameChange={name => setActiveTabName(name)}
    >
      {['MY_TABS_CLASSIFICATION', 'MY_TABS_DOCUMENTS'].map(name => (
        <Tab key={name} name={name} text={getTabText(name)}>
          <div style={{ padding: 16 }}>
            {getTabText(name)}
            <RadioGroup onValueChange={setLocale} value={locale}>
              <RadioButton text="en-US" value="en-US" />
              <RadioButton text="jp" value="jp" />
            </RadioGroup>
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}
