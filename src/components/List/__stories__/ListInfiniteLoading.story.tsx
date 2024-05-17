import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import List from '../';
import { UxtTheme } from '../../../themes/UxtTheme';
import Shell from '../../Shell';
import Spinner from '../../Spinner';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: '1 1 auto',
        backgroundColor: theme.palette.background.paper,
      },
      loadingIndicator: {
        position: 'absolute',
        top: '25%',
        left: '50%',
      },
      list: {
        height: 480,
      },
      listContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        '& + &': {
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      },
      listTitle: {
        ...theme.typography.subtitle1,
        height: theme.height.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    }),
  {
    name: 'UxtStorybookListInfiniteLoading',
  },
);

type Pokemon = { name: string; url: string };

export interface ListInfiniteLoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Record<string, unknown>;
}
export default function ListInfiniteLoading(
  props: ListInfiniteLoadingProps = {},
) {
  const [minimumBatchSize, setMinimumBatchSize] = React.useState<number>(20);

  const [hasNextItems, setHasNextItems] = React.useState<boolean>(false);

  const [items, setItems] = React.useState<Array<Pokemon>>([]);

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${minimumBatchSize}&offset=0`,
    )
      .then(res => res.json())
      .then(json => {
        setItems([...items, ...(json.results as Array<Pokemon>)]);
        setHasNextItems(json.next);
      });
  }, []);

  let timer: ReturnType<typeof setTimeout>;

  const [areItemsLoading, setAreItemsLoading] = React.useState<boolean>(false);

  const classes = useStyles(props);

  const handleLoadMoreItems = React.useCallback(
    (startIndex, stopIndex) => {
      if (hasNextItems && !areItemsLoading) {
        return new Promise<void>(() => {
          setAreItemsLoading(true);

          if (timer) clearTimeout(timer);

          timer = setTimeout(() => {
            fetch(
              `https://pokeapi.co/api/v2/pokemon?limit=${minimumBatchSize}&offset=${stopIndex}`,
            )
              .then(res => res.json())
              .then(json => {
                setItems([...items, ...(json.results as Array<Pokemon>)]);
                setHasNextItems(json.next);
              });
            setAreItemsLoading(false);
          }, 3000);
        });
      }
    },
    [items, hasNextItems, areItemsLoading],
  );

  return (
    <Shell>
      {items?.length ? (
        <div className={classes.root}>
          <div className={classes.listContainer}>
            <div className={classes.listTitle}>Default Loading Indicator</div>
            <List
              enableInfiniteLoading={true}
              items={items}
              hasMoreItems={hasNextItems}
              areItemsLoading={areItemsLoading}
              loadMoreItems={handleLoadMoreItems}
              minimumBatchSize={minimumBatchSize}
              primaryTextAccessor={'name'}
              className={classes.list}
            />
          </div>

          <div className={classes.listContainer}>
            <div className={classes.listTitle}>Custom Loading Indicator</div>
            <List
              enableInfiniteLoading={true}
              items={items}
              hasMoreItems={hasNextItems}
              areItemsLoading={areItemsLoading}
              loadMoreItems={handleLoadMoreItems}
              minimumBatchSize={minimumBatchSize}
              primaryTextAccessor={'name'}
              threshold={15} // Threshold at which to pre-fetch data; defaults to 0. A threshold of 15 means that data will start loading when a user scrolls within 15 rows.
              loadingIndicatorComponent={
                <Spinner
                  appearance="line"
                  size="small"
                  className={classes.loadingIndicator}
                />
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <Spinner
            appearance="line"
            size="small"
            className={classes.loadingIndicator}
          />
        </div>
      )}
    </Shell>
  );
}
