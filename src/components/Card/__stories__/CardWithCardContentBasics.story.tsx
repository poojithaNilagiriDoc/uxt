import React from 'react';
import { action } from '@storybook/addon-actions';
import CardContentBasic from '../../CardContentBasic';
import Card from '../index';

const item = { name: 'Plant 1', category: 'Industrial Complexes' };

export default function CardWithCardContentBasics() {
  return (
    <Card
      actionButton1Text="Properties"
      actionButton2Text="Export"
      item={item}
      onActionButton1Click={action('onActionButton1Click')}
      onActionButton2Click={action('onActionButton2Click')}
      onClick={action('onClick')}
      style={{ margin: 16 }}
    >
      <CardContentBasic
        item={item}
        leftTextLine1TextAccessor="name"
        leftTextLine2TextAccessor="category"
        rightTextLine1TextAccessor={() => 'pending'}
      />
    </Card>
  );
}
