import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import close from 'uxt-graphics/icons/close';
import filter from 'uxt-graphics/icons/filter';
import TreeList from '../index';
import makeStyles from '../../_helpers/makeStyles';
import Shell from '../../Shell';
import type { UxtTheme } from '../../../themes/UxtTheme';
import showIf from '../../_helpers/showIf';
import NotificationService from '../../../services/NotificationService';
import IconButton from '../../IconButton';
import ToggleIconButton from '../../ToggleIconButton';
import { TreeItemProps } from '../../TreeItem';
import data, { DataType } from './data';

interface Item {
  [key: string]: any;
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      treeList: {
        width: 400,
      },
      textAccessorComponentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(1)}px`,
      },
      actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    }),
  {
    name: 'UxtStorybookTreeListBasics',
  },
);

export default function TreeListActionContainer() {
  const classes = useStyles({});
  const [selectedItems, setSelectedItems] = React.useState<Array<DataType>>([]);
  const [toggledItems, setToggledItems] = React.useState<React.ReactText[]>([]);

  const textAccessorComponent = React.useCallback(
    (item: DataType): React.ReactNode => {
      return (
        <div className={classes.textAccessorComponentContainer}>
          {showIf(item.displayName.indexOf('Types') !== -1)(
            <div>{item.id}</div>,
          )}
          <div>{item.displayName}</div>
        </div>
      );
    },
    [],
  );

  const handleOnClick = React.useCallback(
    (props: TreeItemProps): void => {
      setToggledItems(
        toggledItems.includes(props.id)
          ? toggledItems.filter((id: React.ReactText) => id !== props.id)
          : [...toggledItems, props.id],
      );
    },
    [toggledItems],
  );

  const getActions = React.useCallback(
    (props: TreeItemProps): JSX.Element => {
      if ((props['children'] as Array<Item>).length > 0)
        return <IconButton iconSvg={close} />;
      return (
        <div className={classes.actionsContainer}>
          <IconButton iconSvg={close} />
          <ToggleIconButton
            isActive={Boolean(toggledItems?.includes(props.id))}
            iconSvg={filter}
            onClick={() => handleOnClick(props)}
          />
        </div>
      );
    },
    [toggledItems, handleOnClick],
  );

  return (
    <Shell>
      <TreeList
        className={classes.treeList}
        action={[
          {
            text: 'Action Item 1',
            action: () => NotificationService.info('Clicked Action Item 1'),
          },
          {
            text: 'Action Item 2',
            action: () => NotificationService.info('Clicked Action Item 2'),
          },
        ]}
        actionsContainer={getActions}
        expandOnSelect={false}
        idAccessor="id"
        isSelectDeep={false}
        items={data}
        selectedItems={selectedItems}
        onSelectedItemsChange={(items: Array<DataType>) =>
          setSelectedItems(items)
        }
        selectionMode="multiple"
        textAccessor={textAccessorComponent}
        rowHeight={56}
      />
    </Shell>
  );
}
