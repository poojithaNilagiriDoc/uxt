import React from 'react';
import { action } from '@storybook/addon-actions';
import DataPager from '../index';

export default function DataPagerBasics() {
  return (
    <DataPager
      activePage={2}
      itemCount={25}
      itemsPerPage={10}
      itemsPerPageChoices={[5, 10, 25]}
      onActivePageChange={action('onActivePageChange')}
      onItemsPerPageChange={action('onItemsPerPageChange')}
    />
  );
}
