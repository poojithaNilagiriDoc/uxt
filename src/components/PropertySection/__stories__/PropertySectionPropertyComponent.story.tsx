import React from 'react';
import Toolbar from '../../Toolbar';
import PropertySection from '../index';

function PropertyComponent(props) {
  return (
    <Toolbar position="top">
      {props.name}: {props.value}
    </Toolbar>
  );
}

export default function PropertySectionPropertyComponent() {
  return (
    <PropertySection
      data={{
        'First Name': 'Chuck',
        'Last Name': 'Testa',
        Occupation: 'Taxidermist',
      }}
      isCollapsible={true}
      name="Personal Info"
      propertyComponent={PropertyComponent}
    />
  );
}
