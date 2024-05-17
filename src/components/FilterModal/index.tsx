import classnames from 'classnames';
import constant from 'lodash/fp/constant';
import first from 'lodash/fp/first';
import isEmpty from 'lodash/fp/isEmpty';
import values from 'lodash/fp/values';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import add from 'uxt-graphics/icons/add';
import clearFilters from 'uxt-graphics/icons/clear-filters';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import FilterService, {
  FilterServicePropertyFilter,
  FilterServiceProperty,
} from '../../services/FilterService';
import { UxtTheme } from '../../themes/UxtTheme';
import replaceAtIndex from '../_helpers/replaceAtIndex';
import makeStyles from '../_helpers/makeStyles';
import PropertyFilter from '../_internal/PropertyFilter';
import IconButton from '../IconButton';
import Modal, { ModalProps } from '../Modal';
import Toolbar from '../Toolbar';
import type { IconButtonProps } from '../IconButton';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      modalContent: {
        // still needed?
        overflow: 'hidden',
      },
      content: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        [theme.breakpoints.only('xs')]: {
          flexDirection: 'column',
        },
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'column-reverse',
        },
      },
      emptyState: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        minHeight: 120,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
          marginTop: '33%',
        },
        [theme.breakpoints.up('sm')]: {
          justifyContent: 'center',
        },
      },
      emptyStateMessage: {
        textAlign: 'center',
      },
      filters: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowY: 'auto',
        '& div:last-child': {
          borderBottom: 0,
        },
      },
      toolbar: {
        [theme.breakpoints.only('xs')]: {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        [theme.breakpoints.up('sm')]: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      toolbarItems: {
        [theme.breakpoints.only('xs')]: {
          flexDirection: 'row-reverse',
        },
      },
      addButton: {},
      clearButton: {},
    }),
  { name: 'UxtFilterModal' },
);

type ModalPropsWithoutClasses = {
  [K in Exclude<keyof ModalProps, 'classes'>]?: ModalProps[K];
};

export interface FilterModalProps extends ModalPropsWithoutClasses {
  addFilterTooltipText?: string;
  addIconButtonProps?: Partial<IconButtonProps>;
  clearFiltersIconButtonProps?: Partial<IconButtonProps>;
  clearFiltersTooltipText?: string;
  className?: string;
  classes?: object;
  emptyStateMessageText?: string;
  filters?: Array<FilterServicePropertyFilter>;
  getOperatorText?: (operator: string) => string;
  getPropertyText?: (property: string) => string;
  onCancel?: () => void;
  onFiltersChange?: (filters: Array<FilterServicePropertyFilter>) => void;
  onSubmit?: () => void;
  properties?: { [key: string]: FilterServiceProperty };
  style?: React.CSSProperties;
  titleText?: string;
  valuePlaceholder?: string;
}

function FilterModal(props: FilterModalProps) {
  const {
    addFilterTooltipText = 'Add filter',
    addIconButtonProps,
    clearFiltersIconButtonProps,
    clearFiltersTooltipText = 'Clear filters',
    className,
    classes: classesProp,
    emptyStateMessageText = 'No filters. Press the "+" icon to add one.',
    filters: filtersProp = [],
    getOperatorText,
    getPropertyText,
    onCancel,
    onFiltersChange,
    onSubmit,
    properties = {},
    style,
    titleText = 'Filters',
    valuePlaceholder,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [filters, setFilters] = React.useState<
    Array<FilterServicePropertyFilter>
  >(() => filtersProp);
  const [previousFilters, setPreviousFilters] = React.useState<
    Array<FilterServicePropertyFilter>
  >(() => filtersProp);

  const handleAddFilterClick = React.useCallback(
    function handleAddFilterClick() {
      setFilters([
        ...filters,
        FilterService.createPropertyFilter(first(values(properties))),
      ]);
    },
    [filters, properties],
  );

  const handleCancel = React.useCallback(
    function handleCancel() {
      if (onCancel) {
        onCancel();
      }

      setFilters(previousFilters);
    },
    [onCancel, previousFilters],
  );

  const handleClearFiltersClick = React.useCallback(
    function handleClearFiltersClick() {
      setFilters([]);
    },
    [],
  );

  const handleFilterFilterChange = React.useCallback(
    function handleFilterFilterChange(filter, index) {
      setFilters(replaceAtIndex(index, constant(filter), filters));
    },
    [filters],
  );

  const handleFilterRemove = React.useCallback(
    function handleFilterRemove(index) {
      setFilters([...filters.slice(0, index), ...filters.slice(index + 1)]);
    },
    [filters],
  );

  const handleSubmit = React.useCallback(
    function handleSubmit() {
      onFiltersChange(filters);

      if (onSubmit) {
        onSubmit();
      }

      setPreviousFilters(filters);
    },
    [filters, onFiltersChange, onSubmit],
  );

  return (
    <Modal
      className={classnames(classes.root, className)}
      isContentPadded={false}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      style={style}
      titleText={titleText}
      {...rest}
    >
      <div className={classes.content}>
        {showIf(isEmpty(filters))(
          <div className={classes.emptyState}>
            <div className={classes.emptyStateMessage}>
              {emptyStateMessageText}
            </div>
          </div>,
        )}
        <div className={classes.filters}>
          {filters.map((filter, index) => (
            <PropertyFilter
              filter={filter}
              getOperatorText={getOperatorText}
              getPropertyText={getPropertyText}
              index={index}
              key={index}
              onFilterChange={handleFilterFilterChange}
              onRemove={handleFilterRemove}
              properties={properties}
              valuePlaceholder={valuePlaceholder}
            />
          ))}
        </div>
        <Toolbar
          className={classes.toolbar}
          classes={{ items: classes.toolbarItems }}
        >
          <IconButton
            className={classes.addButton}
            iconSvg={add}
            onClick={handleAddFilterClick}
            title={addFilterTooltipText}
            {...addIconButtonProps}
          />
          {hideIf(isEmpty(filters))(
            <IconButton
              className={classes.clearButton}
              iconSvg={clearFilters}
              onClick={handleClearFiltersClick}
              title={clearFiltersTooltipText}
              {...clearFiltersIconButtonProps}
            />,
          )}
        </Toolbar>
      </div>
    </Modal>
  );
}

export default React.memo(FilterModal);
