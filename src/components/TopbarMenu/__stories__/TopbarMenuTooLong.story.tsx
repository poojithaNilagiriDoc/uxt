import React from 'react';
import times from 'lodash/fp/times';
import Topbar from '../../Topbar';
import TopbarMenu from '../index';

export default function TopbarMenuTooLong() {
  return (
    <Topbar>
      <TopbarMenu
        items={times(
          n => ({
            text: `Item ${n + 1}`,
            children: [{ text: 'Do stuff' }],
          }),
          10,
        )}
      />
    </Topbar>
  );
}
