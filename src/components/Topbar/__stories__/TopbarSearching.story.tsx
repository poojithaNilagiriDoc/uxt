import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import Topbar from '../index';

export default function TopbarSearching() {
  const [isSearching, setIsSearching] = React.useState(true);

  return (
    <Shell>
      <Topbar
        isSearching={isSearching}
        onMenuPress={action('onMenuPress')}
        onSearch={action('onSearch')}
        onSearchPress={() => setIsSearching(!isSearching)}
        onSearchQueryValueChange={action('onSearchQueryValueChange')}
        pageTitle="Page Title"
        searchQueryValue="Search Query Value"
        showMenuButton={true}
        showSearchButton={true}
      />
    </Shell>
  );
}
