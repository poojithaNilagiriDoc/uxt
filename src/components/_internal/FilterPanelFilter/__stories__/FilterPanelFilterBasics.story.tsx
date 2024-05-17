import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterService from '../../../../services/FilterService';
import FilterPanelFilter from '../index';

export default function FilterPanelFilterBasics() {
  return (
    <FilterPanelFilter
      filter={FilterService.createFilter('Location', [
        {
          test: i => i.country === 'Japan',
          text: 'Japan',
        },
        {
          test: i => i.country === 'Russia',
          text: 'Russia',
        },
      ])}
      isOpen={true}
      onIsOpenChange={action('onIsOpenChange')}
      onPredicateChange={action('onPredicateChange')}
    />
  );
}
