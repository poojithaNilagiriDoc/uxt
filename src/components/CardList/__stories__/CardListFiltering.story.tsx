import add from 'lodash/fp/add';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import padCharsStart from 'lodash/fp/padCharsStart';
import range from 'lodash/fp/range';
import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterService from '../../../services/FilterService';
import CardContentBasic from '../../CardContentBasic';
import CardList from '../index';

const getItem = id => ({
  name: `Plant_Site_${padCharsStart('0', 3)(id)}`,
  description: `An plant with the id ${id}`,
  id,
});
const getItems = compose(map(compose(getItem, add(1))), range(0));

function getContent(item) {
  return (
    <CardContentBasic
      icon1Action={[{ text: 'Do Stuff', action: action('DO_STUFF') }]}
      item={item}
      leftTextLine1TextAccessor="name"
      leftTextLine2TextAccessor="description"
      rightTextLine1TextAccessor={() => 'Smart P&ID'}
      rightTextLine2TextAccessor={() => 'Smart Electrical'}
      rightTextLine3TextAccessor={() => 'Smart Process Engineering'}
    />
  );
}

export default function CardListFiltering() {
  return (
    <div
      className="uxt-app"
      style={{
        flexDirection: 'column',
      }}
    >
      <CardList
        actionButton1Text="Properties"
        filters={[
          FilterService.createFilter(
            'Id',
            [
              {
                test: i => i.id < 5,
                text: 'A',
              },
            ],
            'A',
          ),
        ]}
        getContent={getContent}
        items={getItems(100)}
        onActionButton1Click={action('onActionButton1Click')}
        onCardClick={action('onCardClick')}
      />
    </div>
  );
}
