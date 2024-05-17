import React from 'react';
import { action } from '@storybook/addon-actions';
import wrench from 'uxt-graphics/icons/wrench';
import NestedListChildItem from '../../../NestedListChildItem';
import NestedListItem from '../index';

const greg = { text: 'Greg' };
const rootItem = {
  children: [greg, { text: 'Jim' }, { text: 'Susan' }, { text: 'Dajuan' }],
  iconSvg: wrench,
  text: 'People',
};

function Dot(props) {
  return (
    <div
      className="uxt-nested-list-item-child-item-component__indicators__indicator"
      style={{
        backgroundColor: {
          error: 'red',
          warning: '#f2d925',
        }[props.status],
      }}
    />
  );
}

function getStatuses({ item }) {
  if (item.text === 'Susan') {
    return ['warning', 'error'];
  }

  if (item.text === 'Greg') {
    return ['warning'];
  }

  if (item.text === 'Dajuan') {
    return ['error'];
  }

  return [];
}

function ChildItemComponent(props) {
  return (
    <div className="uxt-nested-list-item-child-item-component__child-wrapper">
      <NestedListChildItem
        {...props}
        style={{
          paddingRight: 16 + 16 * getStatuses(props).length,
        }}
      />
      <div className="uxt-nested-list-item-child-item-component__indicators">
        {getStatuses(props).map(status => (
          <Dot key={status} status={status} />
        ))}
      </div>
    </div>
  );
}

export default function NestedListItemChildItemComponent() {
  return (
    <NestedListItem
      childItemComponent={ChildItemComponent}
      childrenAccessor="children"
      iconSvgAccessor="iconSvg"
      isCollapsed={false}
      isCollapsible={true}
      item={rootItem}
      onIsCollapsedChange={action('onIsCollapsedChange')}
      onSelectedItemChange={action('onSelectedItemChange')}
      selectedItem={greg}
    />
  );
}
