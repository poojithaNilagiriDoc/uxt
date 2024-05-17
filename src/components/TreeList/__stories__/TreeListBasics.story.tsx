import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import TreeList from '../index';
import makeStyles from '../../_helpers/makeStyles';
import Shell from '../../Shell';
import type { UxtTheme } from '../../../themes/UxtTheme';
import showIf from '../../_helpers/showIf';
import NotificationService from '../../../services/NotificationService';
import data, { DataType } from './data';

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
    }),
  {
    name: 'UxtStorybookTreeListBasics',
  },
);

export default function TreeListBasics() {
  const classes = useStyles({});
  const [selectedItems, setSelectedItems] = React.useState<Array<DataType>>([]);

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
