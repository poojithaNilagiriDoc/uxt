import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import FilterService, {
  FilterServiceBasicFilter,
} from '../../services/FilterService';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import useTheme from '../_helpers/useTheme';
import Card from '../Card';
import safeGet from '../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      cards: {
        ...theme.mixins.readableWidth,
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
      },
      card: {
        '& + &': {
          marginTop: theme.spacing(1),
        },
      },
      wide: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '& $card + $card': {
          marginTop: theme.spacing(2),
        },
      },
    }),
  { name: 'UxtCardList' },
);

export interface CardListProps extends React.HTMLAttributes<HTMLDivElement> {
  actionButton1Text?: string;
  actionButton2Text?: string;
  cardComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  className?: string;
  classes?: object;
  filters?: Array<FilterServiceBasicFilter>;
  getContent?: (item: { [key: string]: any }) => React.ReactNode;
  idAccessor?: string | ((item: { [key: string]: any }) => string);
  items?: Array<{ [key: string]: any }>;
  onActionButton1Click?: (item: { [key: string]: any }) => void;
  onActionButton2Click?: (item: { [key: string]: any }) => void;
  onCardClick?: (item: { [key: string]: any }) => void;
}

function CardList(props: CardListProps) {
  const {
    actionButton1Text,
    actionButton2Text,
    cardComponent: CardComponent = Card,
    className,
    classes: classesProp,
    filters,
    getContent = () => null,
    items = [],
    onActionButton1Click,
    onActionButton2Click,
    onCardClick,
    style,
    idAccessor = 'id',
    ...rest
  } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  const filteredItems = React.useMemo(
    () => FilterService.filterList(items, filters),
    [filters, items],
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div
          className={classnames(
            classes.root,
            { [classes.wide]: width >= theme.breakpoints.values.sm },
            className,
          )}
          {...rest}
          style={{ height, width, ...style }}
        >
          <div className={classes.cards}>
            {filteredItems.map(item => (
              <CardComponent
                actionButton1Text={actionButton1Text}
                actionButton2Text={actionButton2Text}
                className={classes.card}
                item={item}
                key={safeGet(uuid(), idAccessor, item)}
                onActionButton1Click={onActionButton1Click}
                onActionButton2Click={onActionButton2Click}
                onClick={onCardClick}
              >
                {getContent(item)}
              </CardComponent>
            ))}
          </div>
        </div>
      )}
    </AutoSizer>
  );
}

export default React.memo(CardList);
