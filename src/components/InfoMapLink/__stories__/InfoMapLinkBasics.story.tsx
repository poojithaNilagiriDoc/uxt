import React from 'react';
import InfoMapLink from '../index';
import useTheme from '../../_helpers/useTheme';
import { UxtTheme } from '../../../themes/UxtTheme';

export default function InfoMapLinkBasics() {
  const theme: UxtTheme = useTheme();

  return (
    <div style={{ padding: theme.spacing(4) }}>
      <InfoMapLink
        className="link"
        key={1}
        stroke={theme.palette.background.sidebar}
        item={{ source: 'test', target: 'test21' }}
        data-purpose="link"
        idAccessor="id"
      ></InfoMapLink>
    </div>
  );
}
