import React from 'react';
import { action } from '@storybook/addon-actions';
import MenuPage from '../index';

export default function MenuPageBasics() {
  return (
    <div style={{ padding: 16 }}>
      <MenuPage
        actionArguments={['Hey']}
        ancestorStack={[{ text: 'Ancestor' }]}
        items={[
          { text: 'Delete', action: action('DELETED') },
          {
            text: 'Export',
            children: [
              {
                text: 'Excel',
                children: [
                  { text: '.xlsx', action: action('XLSX_EXPORTED') },
                  { text: '.csv', action: action('CSV_EXPORTED') },
                ],
              },
              {
                text: 'Word',
                children: [
                  { text: '.docx', action: action('DOCX_EXPORTED') },
                  { text: '.txt', action: action('TXT_EXPORTED') },
                ],
              },
            ],
          },
        ]}
        onParentMenuOpen={action('onParentMenuOpen')}
        onSubMenuOpen={action('onSubMenuOpen')}
      />
    </div>
  );
}
