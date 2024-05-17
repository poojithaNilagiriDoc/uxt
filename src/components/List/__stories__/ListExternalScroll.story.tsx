import React from 'react';
import Shell from '../../Shell';
import List from '../index';

function getItems() {
  return [
    { id: 'a', title: 'A', description: 'Alpha' },
    { id: 'b', title: 'B', description: 'Beta' },
    { id: 'c', title: 'C', description: 'Charlie' },
    { id: 'd', title: 'D', description: 'Delta' },
    { id: 'e', title: 'E', description: 'Echo' },
    { id: 'f', title: 'F', description: 'Foxtrot' },
    { id: 'g', title: 'G', description: 'Golf' },
    { id: 'h', title: 'H', description: 'Hotel' },
    { id: 'i', title: 'I', description: 'India' },
    { id: 'j', title: 'J', description: 'Juliett' },
    { id: 'k', title: 'K', description: 'Kilo' },
    { id: 'l', title: 'L', description: 'Lima' },
    { id: 'm', title: 'M', description: 'Mike' },
    { id: 'n', title: 'N', description: 'November' },
    { id: 'o', title: 'O', description: 'Oscar' },
    { id: 'p', title: 'P', description: 'Papa' },
    { id: 'q', title: 'Q', description: 'Quebec' },
    { id: 'r', title: 'R', description: 'Romeo' },
    { id: 's', title: 'S', description: 'Sierra' },
    { id: 't', title: 'T', description: 'Tango' },
    { id: 'u', title: 'U', description: 'Uniform' },
    { id: 'v', title: 'V', description: 'Victor' },
    { id: 'w', title: 'W', description: 'Whiskey' },
    { id: 'x', title: 'X', description: 'X-Ray' },
    { id: 'y', title: 'Y', description: 'Yankee' },
    { id: 'z', title: 'Z', description: 'Zulu' },
  ];
}

export default function ListExternalScroll() {
  return (
    <Shell style={{ overflowY: 'auto' }}>
      <List
        isInternalScrollEnabled={false}
        items={getItems()}
        primaryTextAccessor="title"
      />
    </Shell>
  );
}
