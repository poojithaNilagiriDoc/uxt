import classnames from 'classnames';
import capitalize from 'lodash/fp/capitalize';
import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import lowerCase from 'lodash/fp/lowerCase';
import values from 'lodash/fp/values';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import trash from 'uxt-graphics/icons/trash';
import FilterService, {
  FilterServicePropertyFilter,
  FilterServiceProperty,
} from '../../../services/FilterService';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import DropdownChoice from '../../DropdownChoice';
import DropdownList from '../../DropdownList';
import IconButton from '../../IconButton';
import Input from '../../Input';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        height: 120,
      },
      fields: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
        paddingRight: 0,
        paddingTop: theme.spacing(2),
      },
      fieldRow: {
        display: 'flex',
      },
      property: {
        flex: '1 1 auto',
        marginBottom: theme.spacing(1),
      },
      operator: {
        flex: '0 0 auto',
        marginRight: theme.spacing(1),
      },
      value: {
        flex: '1 1 auto',
      },
      removeButton: {
        alignSelf: 'center',
      },
    }),
  { name: 'UxtPropertyFilter' },
);

export interface PropertyFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  filter?: FilterServicePropertyFilter;
  getOperatorText?: (operator: string) => string;
  getPropertyText?: (property: any) => string;
  index?: number;
  onFilterChange?: (filter: FilterServicePropertyFilter, index: number) => void;
  onRemove?: (index: number) => void;
  properties?: { [key: string]: FilterServiceProperty };
  valuePlaceholder?: string;
}

function PropertyFilter(props: PropertyFilterProps) {
  const {
    className,
    classes: classesProp,
    filter,
    getOperatorText = compose(capitalize, lowerCase) as (
      operator: string,
    ) => string,
    getPropertyText = property => property.name || '',
    index,
    onFilterChange,
    onRemove,
    properties = {},
    valuePlaceholder = 'value',
    ...rest
  } = props;
  const classes = useStyles(props);

  const operators = React.useMemo(() => {
    const operators = FilterService.getOperatorsByPropertyType(
      filter.property.type,
    );

    return operators.map(operator => ({
      text: getOperatorText(operator),
      value: operator,
    }));
  }, [filter.property.type, getOperatorText]);

  const handleOperatorChange = React.useCallback(
    function handleOperatorChange(operator) {
      onFilterChange({ ...filter, operator }, index);
    },
    [filter, index, onFilterChange],
  );

  const handlePropertyChange = React.useCallback(
    function handlePropertyChange(propertyKey) {
      const nextProperty = properties[propertyKey];
      const nextOperator =
        filter.property.type === nextProperty.type
          ? filter.operator
          : first(FilterService.getOperatorsByPropertyType(nextProperty.type));

      if (filter.property.name === nextProperty.name) return;

      onFilterChange(
        { ...filter, operator: nextOperator, property: nextProperty },
        index,
      );
    },
    [filter, index, onFilterChange, properties],
  );

  const handleRemoveButtonClick = React.useCallback(
    function handleRemoveButtonClick() {
      onRemove(index);
    },
    [index, onRemove],
  );

  const handleValueChange = React.useCallback(
    function handleValueChange(value) {
      onFilterChange({ ...filter, value }, index);
    },
    [filter, index, onFilterChange],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.fields}>
        <div className={classes.fieldRow}>
          <DropdownList
            className={classes.property}
            onValueChange={handlePropertyChange}
            text={getPropertyText(filter.property)}
            value={filter.property.name}
          >
            {values(properties).map(property => (
              <DropdownChoice
                key={property.name}
                text={getPropertyText(property)}
                value={property.name}
              />
            ))}
          </DropdownList>
        </div>
        <div className={classes.fieldRow}>
          <DropdownList
            className={classes.operator}
            isMinWidthEnabled={false}
            isPopupFittedToInput={true}
            onValueChange={handleOperatorChange}
            text={getOperatorText(filter.operator)}
            value={filter.operator}
          >
            {operators.map(operator => (
              <DropdownChoice
                key={operator.value}
                text={operator.text}
                value={operator.value}
              />
            ))}
          </DropdownList>
          <Input
            className={classes.value}
            onValueChange={handleValueChange}
            placeholder={valuePlaceholder}
            value={filter.value}
          />
        </div>
      </div>
      <IconButton
        className={classes.removeButton}
        iconSvg={trash}
        onClick={handleRemoveButtonClick}
      />
    </div>
  );
}

export default React.memo(PropertyFilter);
