import React from 'react';
import Autocomplete from '../index';

export default function AutocompleteBasics() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 16 }}>
      <Autocomplete items={getItems()} onValueChange={setValue} value={value} />
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
