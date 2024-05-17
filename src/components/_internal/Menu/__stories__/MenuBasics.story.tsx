import React from 'react';
import { action } from '@storybook/addon-actions';
import Menu from '../index';

export default function MenuBasics() {
  return (
    <div style={{ padding: 16 }}>
      <Menu
        items={[
          { text: 'Delete', action: action('DELETED') },
          { text: 'Export Formats', isSeparator: true },
          {
            text: 'Export',
            children: [
              {
                text: 'Excel Application',
                children: [
                  { text: '.xlsx', action: action('XLSX_EXPORTED') },
                  { text: '.csv', action: action('CSV_EXPORTED') },
                ],
              },
              {
                text: 'Word',
                children: [
                  { text: '.docx', action: action('DOCX_EXPORTED') },
                  { text: '.rtf', action: action('RTF_EXPORTED') },
                  { text: '.txt', action: action('TXT_EXPORTED') },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
