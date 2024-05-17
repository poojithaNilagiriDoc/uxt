import includes from 'lodash/fp/includes';
import React from 'react';
import toggleInArray from '../../_helpers/toggleInArray';
import Chip from '../index';

export default function ChipMultiSelect() {
  const [selectedIds, setSelectedIds] = React.useState(['Lemon']);

  const toggleValue = React.useCallback(
    function toggleValue(id) {
      setSelectedIds(toggleInArray(id, selectedIds));
    },
    [selectedIds],
  );

  return (
    <>
      <div>Select Fruits</div>
      <Chip
        isActive={includes('Lemon', selectedIds)}
        onIsActiveChange={() => toggleValue('Lemon')}
        text="Lemon"
      />
      <Chip
        isActive={includes('Watermelon', selectedIds)}
        onIsActiveChange={() => toggleValue('Watermelon')}
        text="Watermelon"
      />
      <Chip
        isActive={includes('Banana', selectedIds)}
        onIsActiveChange={() => toggleValue('Banana')}
        text="Banana"
      />
      <Chip
        isActive={includes('Kiwi', selectedIds)}
        onIsActiveChange={() => toggleValue('Kiwi')}
        text="Kiwi"
      />

      <Chip
        isActive={includes('Mango', selectedIds)}
        onIsActiveChange={() => toggleValue('Mango')}
        text="Mango"
      />
    </>
  );
}
