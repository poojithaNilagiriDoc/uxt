import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterService from '../../../../services/FilterService';
import PropertyFilter from '../index';

function getOperatorText(operator) {
  switch (operator) {
    case FilterService.operators.CONTAINS:
      return '~';
    case FilterService.operators.EQUALS:
      return '=';
    case FilterService.operators.GREATER_THAN:
      return '>';
    case FilterService.operators.LESS_THAN:
      return '<';
    default:
      return operator;
  }
}

export default function PropertyFilterOperatorLocalization() {
  return (
    <PropertyFilter
      filter={FilterService.createPropertyFilter(
        { name: 'name' },
        FilterService.operators.GREATER_THAN,
        'P101',
      )}
      getOperatorText={getOperatorText}
      index={2}
      onFilterChange={action('FILTER_CHANGED')}
      properties={{
        category: { name: 'category' },
        description: { name: 'description' },
        name: { name: 'name' },
      }}
    />
  );
}
