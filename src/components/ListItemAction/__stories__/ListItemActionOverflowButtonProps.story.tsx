import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import ListItemAction from '../index';

export default function ListItemActionOverflowButtonProps() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpenChange = React.useCallback(value => {
    console.log('Setting "isOpen":', value);
    setIsOpen(value);
  }, []);

  return (
    <>
      <ListItemAction
        action={[{ text: 'Delete', action: action('delete') }]}
        item={{ id: 'a', title: 'A', description: 'Alpha' }}
        overflowButtonProps={{ isOpen, onIsOpenChange: handleIsOpenChange }}
      />
      <ListItemAction
        action={action('star')}
        iconSvg={star}
        item={{ id: 'a', title: 'A', description: 'Alpha' }}
        overflowButtonProps={{ isOpen, onIsOpenChange: handleIsOpenChange }}
      />
    </>
  );
}
