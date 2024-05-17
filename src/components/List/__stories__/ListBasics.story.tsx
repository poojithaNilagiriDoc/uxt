import add from 'lodash/fp/add';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';
import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import Shell from '../../Shell';
import List from '../index';

const getItem = id => ({
  description: `An item with the id ${id}`,
  icon: star,
  title: `Item ${id}`,
  id,
});
const getItems = compose(map(compose(getItem, add(1))), range(0));
const items = getItems(100);

export default function ListBasics() {
  return (
    <Shell style={{ flexDirection: 'column' }}>
      <List
        action={[
          { text: 'Delete', action: action('Delete') },
          { text: 'Notify', action: action('Notify') },
        ]}
        iconSvgAccessor="icon"
        items={items}
        onSelectedIdChange={action('onSelectedIdChange')}
        onSelectedIdsChange={action('onSelectedIdsChange')}
        onSelectedItemChange={action('onSelectedItemChange')}
        onSelectedItemsChange={action('onSelectedItemsChange')}
        primaryTextAccessor="title"
        secondaryTextAccessor="description"
      />
    </Shell>
  );
}
