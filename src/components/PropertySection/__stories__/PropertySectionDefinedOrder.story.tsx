import React from 'react';
import PropertySection from '../index';

function setMapData(mapData: Map<any, any>) {
  mapData.set('First Name', 'Chuck');
  mapData.set('Last Name', 'Testa');
  mapData.set('1', 'Position');
}

function setArrayData(arrayData: Array<{}>) {
  arrayData.push({ name: 'First Name', value: 'Chuck' });
  arrayData.push({ name: 'Last Name', value: 'Testa' });
  arrayData.push({ name: 'Last Name', value: 'Testa' });
  arrayData.push({ name: '01458', value: '2 Kg' });
}

export default function PropertySectionDefinedOrder() {
  const mapData = new Map<any, any>();
  setMapData(mapData);

  const arrayData = [];
  setArrayData(arrayData);

  return (
    <>
      <PropertySection data={mapData} isCollapsible={true} name="Map" />
      <PropertySection
        data={{
          Occupation: 'Taxidermist',
          'Skill Level': 'Expert',
        }}
        isCollapsible={true}
        name="Object"
      />
      <PropertySection data={arrayData} isCollapsible={true} name="Array" />
    </>
  );
}
