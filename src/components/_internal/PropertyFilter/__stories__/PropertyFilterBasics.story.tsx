import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterService from '../../../../services/FilterService';
import PropertyFilter from '../index';

export default function PropertyFilterBasics() {
  return (
    <PropertyFilter
      filter={FilterService.createPropertyFilter(
        {
          name: 'uptime',
          type: FilterService.propertyTypes.NUMBER,
        },
        FilterService.operators.GREATER_THAN,
        'P101',
      )}
      index={2}
      onFilterChange={action('onFilterChange')}
      properties={{
        category: { name: 'category' },
        description: { name: 'description' },
        name: { name: 'name' },
        uptime: {
          name: 'uptime',
          type: FilterService.propertyTypes.NUMBER,
        },
      }}
    />
  );
}
