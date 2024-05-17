import React from 'react';
import InfoMapNode from '../index';
import useTheme from '../../_helpers/useTheme';
import { UxtTheme } from '../../../themes/UxtTheme';

export default function InfoMapNodeBasics() {
  const theme: UxtTheme = useTheme();

  return (
    <div style={{ padding: theme.spacing(4) }}>
      <InfoMapNode
        id="sample"
        radius={50}
        color={theme.palette.primary.main}
        onClick={() => {
          console.log('onClick');
        }}
        isCurrent={true}
        labelContent={<p>InfoMap Node</p>}
        renderLabel={true}
        overflowItems={[
          {
            text: 'Delete',
            action: () => console.log('DELETED'),
          },
          {
            text: 'Save',
            action: () => console.log('SAVED'),
          },
        ]}
      />
    </div>
  );
}
