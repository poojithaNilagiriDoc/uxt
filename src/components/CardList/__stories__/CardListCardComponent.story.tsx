import React from 'react';
import Shell from '../../Shell';
import CardList from '../index';

function CustomCard(props) {
  const { item } = props;

  return <div>Custom Card {item.id}</div>;
}

export default function CardListCardComponent() {
  return (
    <Shell>
      <CardList
        actionButton1Text="Properties"
        cardComponent={CustomCard}
        items={[{ id: 1 }, { id: 2 }]}
      />
    </Shell>
  );
}
