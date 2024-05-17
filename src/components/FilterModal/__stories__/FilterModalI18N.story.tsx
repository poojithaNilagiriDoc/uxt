import React from 'react';
import filter from 'uxt-graphics/icons/filter';
import tags from '../../../../sample-data/tags';
import FilterService from '../../../services/FilterService';
import List from '../../List';
import ToggleIconButton from '../../ToggleIconButton';
import Toolbar from '../../Toolbar';
import FilterModal from '../index';

export default function FilterModalI18N() {
  const [filters, setFilters] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);

  const getOperatorText = React.useCallback(function getOperatorText(operator) {
    return {
      CONTAINS: '含んでいる',
      EQUALS: 'イコール',
      GREATER_THAN: '以上',
      LESS_THAN: '以下',
    }[operator];
  }, []);

  const getPropertyText = React.useCallback(function getPropertyText(property) {
    return {
      category: '種類',
      description: '叙述',
      name: '名前',
    }[property.name];
  }, []);

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
          addFilterTooltipText="フィルターを付ける"
          cancelText="キャンセル"
          clearFiltersTooltipText="フィルターを全部消す"
          emptyStateMessageText="フィルターがありません。フィルターを付けるのボタンを押してください。"
          filters={filters}
          isOpen={isOpen}
          onCancel={handleCancel}
          onFiltersChange={handleFiltersChange}
          onSubmit={handleSubmit}
          getOperatorText={getOperatorText}
          getPropertyText={getPropertyText}
          properties={{
            category: { name: 'category' },
            description: { name: 'description' },
            name: { name: 'name' },
          }}
          submitText="ＯＫ"
          titleText="フィルター"
          valuePlaceholder="バリュー"
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
