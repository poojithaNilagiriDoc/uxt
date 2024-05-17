import React from 'react';
import { action } from '@storybook/addon-actions';
import user from 'uxt-graphics/icons/user';
import Topbar from '../../Topbar';
import TopbarMenu from '../index';

const items = [
  {
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

export default function TopbarMenuBasics() {
  return (
    <Topbar>
      <TopbarMenu
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        items={items}
      />
    </Topbar>
  );
}
