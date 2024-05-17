import React from 'react';
import PropertySection from '../index';

export default function PropertySectionDynamic() {
  const [nameColumnWidth, setNameColumnWidth] = React.useState(120);

  return (
    <PropertySection
      data={{
        'First Name': 'Chuck',
        'Last Name': 'Testa',
        Occupation: 'Taxidermist',
      }}
      isCollapsible={true}
      name="Personal Info"
      nameColumnWidth={nameColumnWidth}
      onNameColumnWidthChange={setNameColumnWidth}
    />
  );
}
