import React from 'react';
import Autocomplete from '../index';

function getCustomItemComponent(item, isHighlighted) {
  return (
    <div style={{ padding: 16 }}>
      {item}
      {isHighlighted ? ' (highlighted)' : ''}
    </div>
  );
}

export default function AutocompleteCustom() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 16 }}>
      <Autocomplete
        getItemComponent={getCustomItemComponent}
        items={getItems()}
        onValueChange={setValue}
        value={value}
      />
    </div>
  );
}

function getItems() {
  return [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliet',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'X-ray',
    'Yankee',
    'Zulu',
  ];
}
