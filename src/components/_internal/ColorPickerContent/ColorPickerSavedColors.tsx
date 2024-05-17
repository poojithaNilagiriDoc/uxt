import classnames from 'classnames';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import pullAt from 'lodash/fp/pullAt';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import add from 'uxt-graphics/icons/add';
import cancel from 'uxt-graphics/icons/cancel';
import check from 'uxt-graphics/icons/check';
import trash from 'uxt-graphics/icons/trash';
import hideIf from '../../_helpers/hideIf';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import toggleInArray from '../../_helpers/toggleInArray';
import IconButton from '../../IconButton';
import Toolbar from '../../Toolbar';
import ColorPickerSwatch from './ColorPickerSwatch';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      header: {},
      headerText: {
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        marginLeft: theme.spacing(1),
      },
      swatches: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -theme.spacing(1),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      deleteToolbar: {
        height: 48,
      },
    }),
  { name: 'UxtColorPickerSavedColors' },
);

type DivAttributesWithoutColor = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'color'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

interface RGBAColor {
  a: number;
  b: number | '';
  g: number | '';
  r: number | '';
}

export interface ColorPickerSavedColorsProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  checkedIndices?: Array<number>;
  color?: RGBAColor;
  headerText?: string;
  isDeleting?: boolean;
  showOpacity?: boolean;
  onCheckedIndicesChange?: (checkedIndices: Array<number>) => void;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
  onIsDeletingChange?: (isDeleting: boolean) => void;
  onSavedColorsChange?: (savedColors: Array<RGBAColor>) => void;
  permanentColors?: Array<RGBAColor>;
  savedColors?: Array<RGBAColor>;
}

function ColorPickerSavedColors(props: ColorPickerSavedColorsProps) {
  const {
    className,
    classes: classesProp,
    checkedIndices = [],
    color = { a: 0, b: 0, g: 0, r: 0 },
    headerText = 'Saved Colors',
    isDeleting,
    showOpacity = true,
    onCheckedIndicesChange,
    onColorChange,
    onColorChangeEnd,
    onIsDeletingChange,
    onSavedColorsChange,
    permanentColors = [],
    savedColors = [],
    ...rest
  } = props;
  const classes = useStyles(props);

  const isDuplicateColor = React.useCallback(function isDuplicateColor(
    colorsSet: Array<RGBAColor>,
    color: RGBAColor,
  ): boolean {
    return colorsSet.some(c => isEqual(c, color));
  },
  []);

  const handleCancelDeleteClick = React.useCallback(
    function handleCancelDeleteClick() {
      onIsDeletingChange(false);
      onCheckedIndicesChange([]);
    },
    [onCheckedIndicesChange, onIsDeletingChange],
  );

  const handleStartDeleting = React.useCallback(
    function handleStartDeleting() {
      onIsDeletingChange(true);
    },
    [onIsDeletingChange],
  );

  const handleSaveCurrentColor = React.useCallback(
    function handleSaveCurrentColor() {
      if (
        !isDuplicateColor(savedColors, color) &&
        !isDuplicateColor(permanentColors, color)
      ) {
        onSavedColorsChange([...savedColors, color]);
      }
    },
    [
      isDuplicateColor,
      savedColors,
      color,
      permanentColors,
      onSavedColorsChange,
    ],
  );

  const handleSwatchCheckToggle = React.useCallback(
    function handleSwatchCheckToggle(index) {
      onCheckedIndicesChange(toggleInArray(index, checkedIndices));
    },
    [checkedIndices, onCheckedIndicesChange],
  );

  const handleConfirmDeleteClick = React.useCallback(
    function handleConfirmDeleteClick() {
      onSavedColorsChange(pullAt(checkedIndices, savedColors));
      onIsDeletingChange(false);
      onCheckedIndicesChange([]);
    },
    [
      checkedIndices,
      onCheckedIndicesChange,
      onIsDeletingChange,
      onSavedColorsChange,
      savedColors,
    ],
  );

  const handleApply = React.useCallback(
    (color: RGBAColor) => {
      onColorChange?.(color);
      onColorChangeEnd?.(color);
    },
    [onColorChange, onColorChangeEnd],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      {hideIf(isDeleting)(
        <Toolbar className={classes.header}>
          <div className={classes.headerText}>{headerText}</div>
          <IconButton
            iconSvg={trash}
            onClick={handleStartDeleting}
            style={{ marginLeft: 'auto' }}
          />
        </Toolbar>,
      )}
      {showIf(isDeleting)(
        <Toolbar className={classes.deleteToolbar}>
          <IconButton
            iconSvg={cancel}
            onClick={handleCancelDeleteClick}
            style={{ marginLeft: 'auto' }}
          />
          <IconButton
            iconSvg={check}
            isDisabled={isEmpty(checkedIndices)}
            onClick={handleConfirmDeleteClick}
          />
        </Toolbar>,
      )}
      <div className={classes.swatches}>
        {hideIf(isDeleting)(
          permanentColors.map((color, index) =>
            showOpacity || color.a === 1 ? (
              <ColorPickerSwatch
                color={color}
                isCheckable={false}
                key={`PERMANENT_COLOR_${index}`}
                onApply={handleApply}
              />
            ) : null,
          ),
        )}
        {savedColors.map((color, index) =>
          showOpacity || color.a === 1 ? (
            <ColorPickerSwatch
              color={color}
              index={index}
              isCheckable={isDeleting}
              isChecked={includes(index, checkedIndices)}
              key={`SAVED_COLOR_${index}`}
              onApply={handleApply}
              onCheckToggle={handleSwatchCheckToggle}
            />
          ) : null,
        )}
        {showIf(!isDeleting)(
          <IconButton iconSvg={add} onClick={handleSaveCurrentColor} />,
        )}
      </div>
    </div>
  );
}

export default React.memo(ColorPickerSavedColors);
