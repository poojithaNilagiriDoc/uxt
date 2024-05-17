import first from 'lodash/fp/first';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import isUndefined from 'lodash/fp/isUndefined';
import toLower from 'lodash/fp/toLower';

export interface FilterServicePredicate {
  test: (item: any) => boolean;
  text: string;
}

export interface FilterServiceBasicFilter {
  activePredicates: Array<string>;
  name: string;
  predicates: Array<FilterServicePredicate>;
  type: 'AND' | 'OR';
}

export type FilterServiceOperator =
  | 'CONTAINS'
  | 'EQUALS'
  | 'GREATER_THAN'
  | 'LESS_THAN';

export type FilterServicePropertyType =
  | 'BOOLEAN'
  | 'DATE'
  | 'NUMBER'
  | 'STRING';

export type FilterServiceFilterType = 'AND' | 'OR' | 'PROPERTY';

export interface FilterServiceProperty {
  name: string;
  type?: FilterServicePropertyType;
}

export interface FilterServicePropertyFilter {
  operator: string;
  property: FilterServiceProperty;
  type: 'PROPERTY';
  value: string;
}

export interface FilterService {
  createFilter: (
    name: string,
    predicates?: Array<FilterServicePredicate>,
    activePredicates?: Array<string>,
  ) => FilterServiceBasicFilter;
  createPropertyFilter: (
    property: FilterServiceProperty,
    operator?: string,
    value?: string,
  ) => FilterServicePropertyFilter;
  filterList: {
    <T>(
      list: Array<T>,
      filters: Array<FilterServiceBasicFilter | FilterServicePropertyFilter>,
    ): Array<T>;
  };
  getOperatorsByPropertyType: (
    type: FilterServicePropertyType,
  ) => Array<FilterServiceOperator>;
  operators: { [key in FilterServiceOperator]: FilterServiceOperator };
  propertyTypes: {
    [key in FilterServicePropertyType]: FilterServicePropertyType;
  };
  types: {
    [key in FilterServiceFilterType]: FilterServiceFilterType;
  };
}

export default {
  createFilter(name, predicates = [], activePredicates = []) {
    return {
      type: this.types.OR,
      activePredicates,
      name,
      predicates,
    };
  },

  createPropertyFilter(property, operator, value = '') {
    const safeProperty = {
      ...property,
      type: property.type || this.propertyTypes.STRING,
    };
    const safeOperator =
      operator || first(this.getOperatorsByPropertyType(safeProperty.type));

    return {
      operator: safeOperator,
      property: safeProperty,
      type: this.types.PROPERTY,
      value,
    };
  },

  filterList(list, filters) {
    if (isEmpty(filters)) return list;

    return list.filter(item =>
      filters.every(filter => {
        if (filter.type === this.types.AND) {
          const isActive = p =>
            includes(
              p.text,
              (filter as FilterServiceBasicFilter).activePredicates,
            );
          const activePredicates = (
            filter as FilterServiceBasicFilter
          ).predicates.filter(isActive);

          if (isEmpty(activePredicates)) return true;

          return activePredicates.every(p => p.test(item));
        }

        if (filter.type === this.types.OR) {
          const isActive = p =>
            includes(
              p.text,
              (filter as FilterServiceBasicFilter).activePredicates,
            );
          const activePredicates = (
            filter as FilterServiceBasicFilter
          ).predicates.filter(isActive);

          if (isEmpty(activePredicates)) return true;

          return activePredicates.some(p => p.test(item));
        }

        if (filter.type === this.types.PROPERTY) {
          const operator = getOr(this.operators.CONTAINS, 'operator', filter);
          const propertyName = getOr('', 'property.name', filter);
          const propertyValue = getOr('', propertyName, item);
          const value = getOr('', 'value', filter);

          switch (operator) {
            case this.operators.CONTAINS:
              return contains(propertyValue, value);
            case this.operators.EQUALS:
              return equals(propertyValue, value);
            case this.operators.GREATER_THAN:
              return greaterThan(propertyValue, value);
            case this.operators.LESS_THAN:
              return lessThan(propertyValue, value);
            default:
              return true;
          }
        }

        return true;
      }),
    );
  },

  getOperatorsByPropertyType(type) {
    if (type === this.propertyTypes.BOOLEAN) {
      return [this.operators.EQUALS];
    }

    if (type === this.propertyTypes.DATE) {
      return [
        this.operators.EQUALS,
        this.operators.GREATER_THAN,
        this.operators.LESS_THAN,
      ];
    }

    if (type === this.propertyTypes.NUMBER) {
      return [
        this.operators.EQUALS,
        this.operators.GREATER_THAN,
        this.operators.LESS_THAN,
      ];
    }

    return [
      this.operators.CONTAINS,
      this.operators.EQUALS,
      this.operators.GREATER_THAN,
      this.operators.LESS_THAN,
    ];
  },

  operators: {
    CONTAINS: 'CONTAINS' as const,
    EQUALS: 'EQUALS' as const,
    GREATER_THAN: 'GREATER_THAN' as const,
    LESS_THAN: 'LESS_THAN' as const,
  },

  propertyTypes: {
    BOOLEAN: 'BOOLEAN' as const,
    DATE: 'DATE' as const,
    NUMBER: 'NUMBER' as const,
    STRING: 'STRING' as const,
  },

  types: {
    AND: 'AND' as const,
    OR: 'OR' as const,
    PROPERTY: 'PROPERTY' as const,
  },
} as FilterService;

function contains(source, query) {
  if (isEmpty(query)) return true;
  return includes(toLower(query), toLower(source));
}

function equals(source, query) {
  if (isEmpty(query)) return true;
  return isEqual(toLower(query), toLower(source));
}

function greaterThan(source, query) {
  if (isUndefined(query)) return true;
  return source > query;
}

function lessThan(source, query) {
  if (isUndefined(query)) return true;
  return source < query;
}
