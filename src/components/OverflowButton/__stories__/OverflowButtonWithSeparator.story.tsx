import React from 'react';
import { action } from '@storybook/addon-actions';
import Toolbar from '../../Toolbar';
import OverflowButton from '../index';

export default function OverflowButtonWithSeparator() {
  return (
    <Toolbar position="top">
      <OverflowButton
        actionArguments={[{ id: 'my-object' }, { id: 'my-other-object' }]}
        items={[
          { text: 'Bookmarks', isSeparator: true },
          { text: 'Bookmark this tab', action: action('Bookmark this tab') },
          {
            text: 'Bookmark all tabs',
            action: action('Bookmark all tabs'),
          },
        ]}
      />
    </Toolbar>
  );
}
