import React from 'react';
import FilterService from '../../../services/FilterService';
import Shell from '../../Shell';
import FilterPanel from '../index';

export default function FilterPanelBasics() {
  const [filters, setFilters] = React.useState([
    FilterService.createFilter('Location', [
      {
        test: i => i.country === 'Japan',
        text: 'Japan',
      },
      {
        test: i => i.country === 'Russia',
        text: 'Russia',
      },
    ]),
    FilterService.createFilter('Name', [
      {
        test: i => i.name === 'Jim',
        text: 'Jim',
      },
      {
        test: i => i.name === 'Craig',
        text: 'Craig',
      },
    ]),
  ]);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <FilterPanel
        filters={filters}
        isOpen={true}
        onFiltersChange={setFilters}
      />
    </Shell>
  );
}
