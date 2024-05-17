import React from 'react';
import { action } from '@storybook/addon-actions';
import ContextMenu from '../index';

export default function ContextMenuWithSeparator() {
  return (
    <ContextMenu
      anchorPoint={{ x: 200, y: 100 }}
      isOpen={true}
      items={[
        { text: 'Bookmarks', isSeparator: true },
        { text: 'Bookmark this tab', action: action('Bookmark this tab') },
        {
          text: 'Bookmark all tabs',
          action: action('Bookmark all tabs'),
        },
      ]}
      onIsOpenChange={action('onIsOpenChange')}
    />
  );
}
