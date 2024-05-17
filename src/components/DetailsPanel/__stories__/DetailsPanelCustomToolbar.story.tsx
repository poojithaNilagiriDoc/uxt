import React from 'react';
import { action } from '@storybook/addon-actions';
import closeSvg from 'uxt-graphics/icons/close';
import IconButton from '../../IconButton';
import Shell from '../../Shell';
import Toolbar from '../../Toolbar';
import DetailsPanel from '../index';

export default function DetailsPanelCustomToolbar(props) {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <div style={{ flex: '1 1 0' }} />
      <DetailsPanel
        isInternalScrollEnabled={false}
        isOpen={true}
        showToolbar={false}
      >
        <Toolbar position="top">
          <h1>Information</h1>
          <IconButton
            iconSvg={closeSvg}
            onClick={action('onClick')}
            style={{ marginLeft: 'auto' }}
          />
        </Toolbar>
        Some Content
      </DetailsPanel>
    </Shell>
  );
}
