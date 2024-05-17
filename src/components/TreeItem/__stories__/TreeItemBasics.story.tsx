import React from 'react';
import { action } from '@storybook/addon-actions';
import document from 'uxt-graphics/icons/document';
import folder from 'uxt-graphics/icons/folder';
import trash from 'uxt-graphics/icons/trash';
import TreeItem from '../index';

const item = {
  iconSvg: folder,
  children: [{ iconSvg: document, title: 'File' }],
  title: 'Folder',
};

export default function TreeItemBasics() {
  return (
    <>
      <TreeItem
        action={action('trash')}
        actionIconSvg={trash}
        childrenProperty="children"
        depth={0}
        iconSvgAccessor="iconSvg"
        isCollapsed={false}
        item={item}
        onCheckboxClick={action('onCheckboxClick')}
        onContentClick={action('onContentClick')}
        onIsCollapsedToggle={action('onIsCollapsedToggle')}
        isSelected={true}
        // selectionMode="multiple"
        textAccessor="title"
      />
      <TreeItem
        depth={1}
        iconSvgAccessor="iconSvg"
        item={item.children[0]}
        onCheckboxClick={action('onCheckboxClick')}
        onContentClick={action('onContentClick')}
        textAccessor="title"
      />
    </>
  );
}
