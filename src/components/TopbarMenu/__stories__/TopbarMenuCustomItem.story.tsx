import React from 'react';
import { action } from '@storybook/addon-actions';
import user from 'uxt-graphics/icons/user';
import Topbar from '../../Topbar';
import MenuItem from '../../MenuItem';
import TopbarMenu from '../index';

function CustomItem(props) {
  if (props.item.id !== 'user-label') {
    return <MenuItem {...props} />;
  }

  return (
    <div
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        alignItems: 'center',
        backgroundColor: '#eee',
        display: 'flex',
        height: 48,
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <span>Username:</span>
      <span>{props.item.text}</span>
    </div>
  );
}

const items = [
  {
    id: 'user-label',
    iconSvg: user,
    text: 'Nick Johnson',
    children: [{ text: 'yo' }, { text: 'hey' }],
  },
  {
    text: 'Export',
    children: [
      {
        text: 'Excel',
        children: [
          {
            text: '.xlsx',
            action: action('XLSX_EXPORTED'),
          },
          {
            text: '.csv',
            action: action('CSV_EXPORTED'),
          },
        ],
      },
      {
        text: 'Word',
        children: [
          {
            text: '.docx',
            action: action('DOCX_EXPORTED'),
          },
          {
            text: '.rtf',
            action: action('RTF_EXPORTED'),
          },
          {
            text: '.txt',
            action: action('TXT_EXPORTED'),
          },
        ],
      },
    ],
  },
];

export default function TopbarMenuCustomItem() {
  return (
    <Topbar>
      <TopbarMenu
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        itemComponent={CustomItem}
        items={items}
      />
    </Topbar>
  );
}
