import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import Spinner from '../../Spinner';
import DropdownList from '../';
import { UxtTheme } from '../../../themes/UxtTheme';
import { DropdownChoiceProps } from '../../DropdownChoice';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 auto',
        backgroundColor: theme.palette.background.paper,
        gap: theme.spacing(4),
      },
      labelValuePair: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
      },
      loadingIndicator: {
        position: 'absolute',
        top: '25%',
        left: '50%',
      },
      tooltipTitle: {
        ...theme.typography.h6,
      },
      tooltipDescription: {
        ...theme.typography.body2,
      },
    }),
  {
    name: 'UxtStorybookDropdownListInfiniteLoading',
  },
);
type Item = { text: string; value: string; isItemDisabled?: boolean };
type Items = Record<number, Array<Item>>;
const pagedItems: Items = {
  0: [
    { text: 'Apple', value: 'Plant 1' },
    { text: 'Orange', value: 'Hai 1' },
    { text: 'Mango', value: 'Hey 1' },
    { text: 'Guava', value: 'Bye 1' },
    { text: 'Pineapple', value: 'Hola 1' },
  ],
  1: [
    { text: 'Watermelon', value: 'Hello 2' },
    { text: 'Pumpkin', value: 'Hai 2' },
    { text: 'Pear', value: 'Hey 2' },
    { text: 'Plum', value: 'Bye 2', isItemDisabled: true },
    { text: 'Custard Apple', value: 'Hola 2' },
  ],
  2: [
    { text: 'Lemon', value: 'Hello 3' },
    { text: 'Grapes', value: 'Hai 3' },
    { text: 'Banana', value: 'Hey 3' },
    { text: 'Pomegranate', value: 'Bye 3' },
    { text: 'Papaya', value: 'Yo 3' },
    { text: 'Raspberries', value: 'Hola 3' },
  ],
  3: [
    { text: 'Strawberry', value: 'Hello 4' },
    { text: 'Blueberry', value: 'Hai 4' },
    { text: 'Kiwi', value: 'Hey 4' },
    { text: 'Gooseberry', value: 'Bye 4' },
    { text: 'Dragon Fruit', value: 'Hola 4' },
  ],
};

export interface DropdownListInfiniteLoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Record<string, unknown>;
}

export default function DropdownListInfiniteLoading(
  props: DropdownListInfiniteLoadingProps = {},
) {
  const classes = useStyles(props);

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [value, setValue] = React.useState<string>();
  const [items, setItems] = React.useState<Array<Item>>(
    pagedItems[currentPage],
  );
  const [areItemsLoading, setAreItemsLoading] = React.useState<boolean>(false);

  const hasMoreItems = React.useMemo(() => {
    return currentPage < 4;
  }, [currentPage]);

  let timer: ReturnType<typeof setTimeout>;

  const handleLoadMoreItems = React.useCallback(
    (startIndex, stopIndex) => {
      if (hasMoreItems) {
        return new Promise<void>(() => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            const newCurrentPage = currentPage + 1;
            const nextItems = pagedItems[newCurrentPage];
            let result = [...items];
            if (nextItems) result = [...result, ...nextItems];
            setCurrentPage(newCurrentPage);
            setItems(result);
            setAreItemsLoading(false);
          }, 3000);
        });
      }
    },
    [items, hasMoreItems, currentPage],
  );

  const tooltipComponent = (props: DropdownChoiceProps) => {
    const { item, ...rest } = props;
    if (!item) return null;
    return (
      <div>
        <div className={classes.tooltipTitle}>{item?.text}</div>
        <div className={classes.tooltipDescription}>
          Description of {item?.text}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.labelValuePair}>
        <span>Default Loading Indicator</span>
        <DropdownList
          value={value}
          onValueChange={(v: string | undefined) => setValue(v)}
          enableInfiniteLoading={true}
          items={items}
          textAccessor="text"
          valueAccessor="value"
          hasMoreItems={hasMoreItems}
          areItemsLoading={areItemsLoading}
          loadMoreItems={handleLoadMoreItems}
          tooltipComponent={tooltipComponent}
          minimumBatchSize={6}
          itemDisabledAccessor={'isItemDisabled'}
        />
      </div>
      <div className={classes.labelValuePair}>
        <span>Custom Loading Indicator</span>
        <DropdownList
          value={value}
          onValueChange={(v: string | undefined) => setValue(v)}
          enableInfiniteLoading={true}
          items={items}
          textAccessor="text"
          valueAccessor="value"
          hasMoreItems={hasMoreItems}
          areItemsLoading={areItemsLoading}
          loadMoreItems={handleLoadMoreItems}
          loadingIndicatorComponent={
            <Spinner
              appearance="line"
              size="small"
              className={classes.loadingIndicator}
            />
          }
          tooltipComponent={'Hello'}
          minimumBatchSize={6}
        />
      </div>
    </div>
  );
}
