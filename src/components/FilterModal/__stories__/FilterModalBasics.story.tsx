import React from 'react';
import filter from 'uxt-graphics/icons/filter';
import tags from '../../../../sample-data/tags';
import FilterService from '../../../services/FilterService';
import List from '../../List';
import ToggleIconButton from '../../ToggleIconButton';
import Toolbar from '../../Toolbar';
import FilterModal from '../index';

export default function FilterModalBasics() {
  const [filters, setFilters] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);

  const handleCancel = React.useCallback(function handleCancel() {
    setIsOpen(false);
  }, []);

  const handleFiltersChange = React.useCallback(function handleFiltersChange(
    f,
  ) {
    setFilters(f);
  },
  []);

  const handleOpenButtonClick = React.useCallback(
    function handleOpenButtonClick() {
      setIsOpen(true);
    },
    [],
  );

  const handleSubmit = React.useCallback(function handleSubmit() {
    setIsOpen(false);
  }, []);

  return (
    <div
      style={{
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <Toolbar position="top">
        <ToggleIconButton
          iconSvg={filter}
          isActive={filters.length > 0}
          onClick={handleOpenButtonClick}
        />
        <FilterModal
          filters={filters}
          isOpen={isOpen}
          onCancel={handleCancel}
          onFiltersChange={handleFiltersChange}
          onSubmit={handleSubmit}
          properties={{
            category: { name: 'category' },
            description: { name: 'description' },
            name: { name: 'name' },
          }}
          titleText="Filter Some Results"
        />
      </Toolbar>
      <List
        items={FilterService.filterList(tags, filters)}
        primaryTextAccessor="name"
        secondaryTextAccessor="description"
        tertiaryTextAccessor="category"
      />
    </div>
  );
}
