import React from 'react';
import { action } from '@storybook/addon-actions';
import AutocompleteItem from '../index';

export default function AutocompleteItemBasics() {
  return (
    <>
      <AutocompleteItem
        focusedIndex={0}
        index={0}
        onMouseDown={action('onMouseDown')}
        onMouseEnter={action('onMouseEnter')}
        suggestion="Hello, World!"
        value="Hello"
      />
      <AutocompleteItem
        focusedIndex={0}
        index={1}
        onMouseDown={action('onMouseDown')}
        onMouseEnter={action('onMouseEnter')}
        suggestion="Goodbye, Cruel World~!"
        value="Hello"
      />
    </>
  );
}
