import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import Menu from '../index';

export default function MenuWithIcon() {
  return (
    <div style={{ padding: 16 }}>
      <Menu
        items={[
          { text: 'Delete', action: action('DELETED') },
          {
            text: 'Export',
            children: [
              {
                text: 'Excel Application',
                iconSvg: star,
                children: [
                  {
                    text: '.xlsx',
                    action: action('XLSX_EXPORTED'),
                    iconSvg: star,
                  },
                  { text: '.csv', action: action('CSV_EXPORTED') },
                ],
              },
              {
                text: 'Word',
                children: [
                  { text: '.docx', action: action('DOCX_EXPORTED') },
                  { text: '.rtf', action: action('RTF_EXPORTED') },
                  {
                    text: '.txt',
                    action: action('TXT_EXPORTED'),
                    iconSvg: star,
                  },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
