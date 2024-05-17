import React from 'react';
import packageSvg from 'uxt-graphics/graphics/package';
import Shell from '../../Shell';
import EmptyState from '../index';

export default function EmptyStateBasics() {
  return (
    <Shell>
      <EmptyState
        graphicSvg={packageSvg}
        headline="No Packages"
        subheader="Please click the Add Packages button below to add one"
      />
    </Shell>
  );
}
