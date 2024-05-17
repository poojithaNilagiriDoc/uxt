import React from 'react';
import Property from '../index';

export default function PropertyDynamic() {
  const [nameColumnWidth, setNameColumnWidth] = React.useState(120);

  return (
    <Property
      name="Name"
      nameColumnWidth={nameColumnWidth}
      onNameColumnWidthChange={setNameColumnWidth}
      value="Chuck Testa"
    />
  );
}
