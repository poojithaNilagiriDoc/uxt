import React from 'react';
import Checkbox from '../../Checkbox';
import PropertySection from '../index';

export default function PropertySectionHeaderComponent() {
  return (
    <PropertySection
      data={{
        Occupation: 'Taxidermist',
        'Skill Level': 'Expert',
      }}
      headerComponent={props => (
        <Checkbox
          isActive={props.isOpen}
          onClick={props.onClick}
          text={props.name}
        />
      )}
      isCollapsible={false}
      name="Work"
    />
  );
}
