import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import some from 'lodash/fp/some';
import React from 'react';
import Autocomplete from '../index';

export default function AutocompleteAsync() {
  const timeout: React.MutableRefObject<NodeJS.Timeout> = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const suggestions = React.useMemo(() => {
    if (isLoading) {
      return [];
    }

    return getItems().filter(str => {
      if (isEmpty(value)) return false;
      if (isEmpty(str)) return false;

      return Autocomplete.fuzzyFilter(str, value);
    });
  }, [isLoading, value]);

  const handleAutocompleteValueChange = React.useCallback(
    function handleAutocompleteValueChange(v) {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }

      setIsLoading(!some(isEqual(v), getItems()));

      setValue(v);

      timeout.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [setIsLoading, setValue],
  );

  return (
    <div style={{ padding: 16 }}>
      <Autocomplete
        isLoading={isLoading}
        onValueChange={handleAutocompleteValueChange}
        suggestions={suggestions}
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
