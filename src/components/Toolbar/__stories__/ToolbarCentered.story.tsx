import React from 'react';
import star from 'uxt-graphics/icons/star';
import user from 'uxt-graphics/icons/user';
import CenteredContent from '../../CenteredContent';
import IconButton from '../../IconButton';
import ListItem from '../../ListItem';
import Shell from '../../Shell';
import Toolbar from '../index';

export default function ToolbarCentered() {
  return (
    <Shell>
      <Toolbar isCentered={true} position="top">
        <IconButton iconSvg={star} />
        <IconButton iconSvg={user} style={{ marginLeft: 'auto' }} />
      </Toolbar>
      <CenteredContent>
        <ListItem
          iconSvgAccessor={() => star}
          primaryTextAccessor={() => 'List Item Text'}
        />
      </CenteredContent>
    </Shell>
  );
}
