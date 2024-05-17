import range from 'lodash/range';
import React from 'react';
import CenteredContent from '../../CenteredContent';
import List from '../../List';
import Shell from '../../Shell';
import DataPager from '../index';

const items = range(25).map(n => ({
  id: n,
  text: n + 1,
}));

export default function DataPagerDynamic() {
  const [activePage, setActivePage] = React.useState(2);
  const [itemsPerPage, setItemsPerPage] = React.useState<number | 'All'>(10);

  const pagedItems = React.useMemo(
    () =>
      itemsPerPage === 'All'
        ? items
        : items.slice(
            (activePage - 1) * itemsPerPage,
            activePage * itemsPerPage,
          ),
    [activePage, itemsPerPage],
  );

  const handleActivePageChange = React.useCallback(page => {
    setActivePage(page);
  }, []);

  const handleItemsPerPageChange = React.useCallback(count => {
    setItemsPerPage(count);
  }, []);

  return (
    <Shell>
      <CenteredContent>
        <List items={pagedItems} primaryTextAccessor="text" />
        <DataPager
          activePage={activePage}
          itemCount={items.length}
          itemsPerPage={itemsPerPage}
          itemsPerPageChoices={[5, 10, 25]}
          onActivePageChange={handleActivePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </CenteredContent>
    </Shell>
  );
}
