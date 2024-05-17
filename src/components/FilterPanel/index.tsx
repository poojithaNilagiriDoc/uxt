import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { FilterServiceBasicFilter } from '../../services/FilterService';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import FilterPanelFilter from '../_internal/FilterPanelFilter';
import type { IconProps } from '../Icon';
import safeGet from '../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        marginLeft: -256,
        overflow: 'hidden',
        transition: 'margin-left 0.25s ease',
        width: 256,
      },
      filters: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowY: 'auto',
      },
      open: {
        marginLeft: 0,
      },
    }),
  { name: 'UxtFilterPanel' },
);

// interface FilterServiceBasicFilter {
//   activePredicates: Array<string>;
//   name: string;
//   predicates: Array<{
//     test: (item: any) => boolean;
//     text: string;
//   }>;
//   type: 'AND' | 'OR';
// }

export interface FilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  expanderIconProps?: Partial<IconProps>;
  expanderIconPropsAccessor?:
    | string
    | ((item: { [key: string]: any }) => string);
  filters?: Array<FilterServiceBasicFilter>;
  isExpandedByDefault?: boolean;
  isOpen?: boolean;
  onFiltersChange?: (filters: Array<FilterServiceBasicFilter>) => void;
}

const FilterPanel = React.forwardRef(function FilterPanel(
  props: FilterPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    expanderIconProps,
    expanderIconPropsAccessor = 'expanderIconProps',
    filters = [],
    isExpandedByDefault = true,
    isOpen,
    onFiltersChange,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [collapsedMap, setCollapsedMap] = React.useState({});

  const getIsFilterOpen = React.useCallback(
    function getIsFilterOpen(filter) {
      return collapsedMap[filter.name] !== undefined
        ? collapsedMap[filter.name]
        : isExpandedByDefault;
    },
    [collapsedMap, isExpandedByDefault],
  );

  const handleFilterIsOpenChange = React.useCallback(
    function handleFilterIsOpenChange(filter) {
      setCollapsedMap({
        ...collapsedMap,
        [filter.name]: !getIsFilterOpen(filter),
      });
    },
    [collapsedMap, getIsFilterOpen],
  );

  const handleFilterPredicateChange = React.useCallback(
    function handleFilterPredicateChange(filter) {
      onFiltersChange(filters.map(f => (f.name === filter.name ? filter : f)));
    },
    [filters, onFiltersChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.open]: isOpen },
        className,
      )}
      {...rest}
    >
      <div className={classes.filters}>
        {filters.map((filter, index) => (
          <FilterPanelFilter
            filter={filter}
            isOpen={getIsFilterOpen(filter)}
            key={index}
            onIsOpenChange={handleFilterIsOpenChange}
            onPredicateChange={handleFilterPredicateChange}
            expanderIconProps={safeGet(
              expanderIconProps,
              expanderIconPropsAccessor,
              filter,
            )}
          />
        ))}
      </div>
    </div>
  );
});

export default React.memo(FilterPanel);
