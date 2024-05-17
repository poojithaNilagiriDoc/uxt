import React from 'react';
import star from 'uxt-graphics/icons/star';
import ListItem from '../../ListItem';
import Shell from '../../Shell';
import EmptyState from '../../EmptyState';
import ShellContent from '../../ShellContent';
import IconPanel from '../index';

export default function IconPanelBasics() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <IconPanel isOpen={isOpen}>
        <ListItem
          iconSvgAccessor={() => star}
          primaryTextAccessor={() => 'Favorites'}
        />
      </IconPanel>
      <ShellContent>
        <EmptyState
          onClick={() => setIsOpen(!isOpen)}
          headline={`Icon Panel ${isOpen ? 'Open' : 'Closed'}`}
        />
      </ShellContent>
    </Shell>
  );
}
