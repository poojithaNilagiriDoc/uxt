import React from 'react';
import PropertySection from '../index';

export default function PropertySectionBasics() {
  return (
    <>
      <PropertySection
        data={{
          'First Name': 'Chuck',
          'Last Name': 'Testa',
          Location: 'Texas',
        }}
        isCollapsible={true}
        name="Personal"
      />
      <PropertySection
        data={{
          Occupation: 'Taxidermist',
          'Skill Level': 'Expert',
        }}
        isCollapsible={false}
        name="Work"
      />
    </>
  );
}
