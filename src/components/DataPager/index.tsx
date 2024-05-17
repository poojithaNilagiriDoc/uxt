import classnames from 'classnames';
import clamp from 'lodash/fp/clamp';
import isFunction from 'lodash/fp/isFunction';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronLeft from 'uxt-graphics/icons/chevron-left';
import chevronRight from 'uxt-graphics/icons/chevron-right';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import DropdownList from '../DropdownList';
import IconButton from '../IconButton';
import Toolbar from '../Toolbar';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      toolbarItems: {
        justifyContent: 'flex-end',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      perPageText: {
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        display: 'none',
        marginRight: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      dropdown: {
        marginRight: theme.spacing(4),
        width: theme.spacing(12),
      },
      ofTotalText: {
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(3),
      },
      previousButton: {},
      nextButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(-1.25),
      },
    }),
  { name: 'UxtDataPager' },
);

export interface DataPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  activePage?: number;
  className?: string;
  classes?: object;
  isAllChoiceDisabled?: boolean;
  itemCount?: number;
  itemsPerPage?: number | 'All';
  itemsPerPageChoices?: Array<number | 'All'>;
  ofTotalTextFormatter?: (
    firstItemNumber: number,
    lastItemNumber: number,
    itemCount: number,
  ) => string;
  onActivePageChange?: (activePage: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number | 'All') => void;
  perPageText?: string;
}

function DataPager(props: DataPagerProps) {
  const {
    activePage = 1,
    className,
    classes: classesProp,
    isAllChoiceDisabled,
    itemCount,
    itemsPerPage = 'All' as const,
    itemsPerPageChoices = [25, 50, 100, 'All' as const],
    ofTotalTextFormatter = (firstItemNumber, lastItemNumber, total) =>
      `${firstItemNumber}-${lastItemNumber} of ${total}`,
    onActivePageChange,
    onItemsPerPageChange,
    perPageText = 'Items per page:',
    ...rest
  } = props;
  const classes = useStyles(props);

  const pageCount = React.useMemo(() => {
    if (itemCount === 0 || itemsPerPage === 'All') {
      return 1;
    }

    return Math.ceil(itemCount / itemsPerPage);
  }, [itemCount, itemsPerPage]);

  const safeActivePage = React.useMemo(() => {
    return clamp(1, pageCount, activePage);
  }, [activePage, pageCount]);

  const dropdownChoices = React.useMemo(
    () => itemsPerPageChoices.concat(isAllChoiceDisabled ? [] : ['All']),
    [isAllChoiceDisabled, itemsPerPageChoices],
  );

  const firstItemNumber = React.useMemo(() => {
    if (itemCount === 0) {
      return 0;
    }

    if (itemsPerPage === 'All') {
      return 1;
    }

    return (safeActivePage - 1) * itemsPerPage + 1;
  }, [itemCount, itemsPerPage, safeActivePage]);

  const lastItemNumber = React.useMemo(() => {
    if (itemsPerPage === 'All') {
      return itemCount;
    }

    return Math.min(safeActivePage * itemsPerPage, itemCount);
  }, [itemCount, itemsPerPage, safeActivePage]);

  const ofTotalText = React.useMemo(() => {
    if (!isFunction(ofTotalTextFormatter)) {
      return '';
    }

    return ofTotalTextFormatter(firstItemNumber, lastItemNumber, itemCount);
  }, [firstItemNumber, itemCount, lastItemNumber, ofTotalTextFormatter]);

  const handleNextButtonClick = React.useCallback(
    function handleNextButtonClick() {
      if (safeActivePage === pageCount) return;

      onActivePageChange(safeActivePage + 1);
    },
    [onActivePageChange, pageCount, safeActivePage],
  );

  const handlePreviousButtonClick = React.useCallback(
    function handlePreviousButtonClick() {
      if (safeActivePage === 1) return;

      onActivePageChange(safeActivePage - 1);
    },
    [onActivePageChange, safeActivePage],
  );

  React.useEffect(() => {
    onActivePageChange(1);
  }, [itemCount, itemsPerPage, onActivePageChange]);

  return (
    <Toolbar
      className={classnames(classes.root, className)}
      classes={{ items: classes.toolbarItems }}
      position="bottom"
      {...rest}
    >
      <div className={classes.perPageText}>{perPageText}</div>
      <DropdownList
        className={classes.dropdown}
        items={dropdownChoices}
        onValueChange={onItemsPerPageChange}
        textAccessor={t => t}
        value={itemsPerPage}
        valueAccessor={v => v}
      />
      <div className={classes.ofTotalText}>{ofTotalText}</div>
      <IconButton
        className={classes.previousButton}
        iconSvg={chevronLeft}
        isDisabled={safeActivePage === 1}
        onClick={handlePreviousButtonClick}
      />
      <IconButton
        className={classes.nextButton}
        iconSvg={chevronRight}
        isDisabled={safeActivePage === pageCount}
        onClick={handleNextButtonClick}
      />
    </Toolbar>
  );
}

export default React.memo(DataPager);
