import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import DetailsPanel from '../index';

export default function DetailsPanelBasics(props) {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <div style={{ flex: '1 1 0' }} />
      <DetailsPanel isOpen={true} onIsOpenChange={action('onIsOpenChange')}>
        Some Content
      </DetailsPanel>
    </Shell>
  );
}
