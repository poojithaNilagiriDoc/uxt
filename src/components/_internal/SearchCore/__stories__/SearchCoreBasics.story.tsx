import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchCore from '../index';

export default function SearchCoreBasics() {
  return (
    <SearchCore
      onSearch={action('onSearch')}
      onValueChange={action('onValueChange')}
      placeholder="Search"
      value="Piping"
    />
  );
}
