import React from 'react';
import { action } from '@storybook/addon-actions';
import Card from '../index';

export default function CardWithActions() {
  return (
    <Card
      actionButton1Text="Action 1"
      actionButton2Text="Action 2"
      onActionButton1Click={action('action1')}
      onActionButton2Click={action('action2')}
      style={{ margin: 16 }}
    >
      <div style={{ padding: 16 }}>Some Content</div>
    </Card>
  );
}
