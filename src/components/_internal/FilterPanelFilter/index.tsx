import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import includes from 'lodash/fp/includes';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import { FilterServiceBasicFilter } from '../../../services/FilterService';
import { UxtTheme } from '../../../themes/UxtTheme';
import toggleInArray from '../../_helpers/toggleInArray';
import makeStyles from '../../_helpers/makeStyles';
import Checkbox from '../../Checkbox';
import Icon from '../../Icon';
import type { IconProps } from '../../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
      },
      header: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: ' 0 0 auto',
        fontWeight: 500,
        height: theme.height.item,
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(2),
        userSelect: 'none',
      },
      chevron: {},
      checkboxes: {
        overflow: 'hidden',
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      checkbox: {},
    }),
  { name: 'UxtFilterPanelFilter' },
);

export interface FilterPanelFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  expanderIconProps?: Partial<IconProps>;
  filter: FilterServiceBasicFilter;
  isOpen?: boolean;
  onIsOpenChange?: (filter: FilterServiceBasicFilter) => void;
  onPredicateChange?: (filter: FilterServiceBasicFilter) => void;
}

const FilterPanelFilter = React.forwardRef(function FilterPanelFilter(
  props: FilterPanelFilterProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    expanderIconProps,
    filter,
    isOpen,
    onIsOpenChange,
    onPredicateChange,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleHeaderClick = React.useCallback(
    function handleHeaderClick() {
      onIsOpenChange(filter);
    },
    [filter, onIsOpenChange],
  );

  const handlePredicateIsActiveChange = React.useCallback(
    function handlePredicateIsActiveChange(predicate) {
      onPredicateChange({
        ...filter,
        activePredicates: toggleInArray(
          predicate.text,
          filter.activePredicates,
        ),
      });
    },
    [filter, onPredicateChange],
  );

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.header} onClick={handleHeaderClick}>
        {filter.name}
        <Icon
          className={classes.chevron}
          svg={isOpen ? chevronUp : chevronDown}
          size="small"
          {...expanderIconProps}
        />
      </div>
      <div
        className={classes.checkboxes}
        style={{ height: isOpen ? 'auto' : '0' }}
      >
        {filter.predicates.map((predicate, index) => (
          <Checkbox
            className={classes.checkbox}
            isActive={includes(predicate.text, filter.activePredicates)}
            key={uuid()}
            onIsActiveChange={() => handlePredicateIsActiveChange(predicate)}
            text={predicate.text}
          />
        ))}
      </div>
    </div>
  );
});

export default React.memo(FilterPanelFilter);
