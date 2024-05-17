import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import ColorPickerContent from '../_internal/ColorPickerContent';
import ColorPickerDropdown from '../ColorPickerDropdown';
import type { IconProps } from '../Icon';
import { default as NamedColorValues } from '../constants/namedColors';
import getRGBAFromNamedColor from '../_helpers/getRGBAFromNamedColor';

const useStyles = makeStyles(
  createStyles({
    root: {},
    anchor: {},
  }),
  { name: 'UxtColorPicker' },
);

type DivAttributesWithoutColor = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'color'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export type NamedColors = keyof typeof NamedColorValues;

export interface RGBAColor {
  a: number;
  b: number | '';
  g: number | '';
  r: number | '';
}

function isEmptyString(value: unknown) {
  return value === '';
}

export interface ColorPickerProps extends DivAttributesWithoutColor {
  buttonComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  className?: string;
  classes?: object;
  color?: RGBAColor | NamedColors;
  expanderIconProps?: Partial<IconProps>;
  hexCodeText?: string;
  showOpacity?: boolean;
  isOpen?: boolean;
  isSavedColorsDeleting?: boolean;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
  onIsOpenChange?: (isOpen: boolean) => void;
  onIsSavedColorsDeletingChange?: (isSavedColorsDeleting: boolean) => void;
  onSavedColorsChange?: (savedColors: Array<RGBAColor>) => void;
  onSavedColorsCheckedIndicesChange?: (
    savedColorsCheckedIndices: Array<number>,
  ) => void;
  opacityText?: string;
  permanentColors?: Array<RGBAColor>;
  popupHorizontal?: 'left' | 'right';
  popupVertical?: 'bottom' | 'top';
  savedColors?: Array<RGBAColor>;
  savedColorsCheckedIndices?: Array<number>;
  savedColorsHeaderText?: string;
  targetHorizontal?: 'left' | 'right';
  targetVertical?: 'bottom' | 'top';
}

function ColorPicker(props: ColorPickerProps) {
  const anchorRef = React.useRef();
  const {
    buttonComponent: ButtonComponent = ColorPickerDropdown,
    className,
    classes: classesProp,
    color: colorProp,
    expanderIconProps,
    hexCodeText = 'Hex',
    showOpacity = true,
    isOpen = false,
    isSavedColorsDeleting,
    onColorChange,
    onColorChangeEnd,
    onIsOpenChange,
    onIsSavedColorsDeletingChange = () => {},
    onSavedColorsChange,
    onSavedColorsCheckedIndicesChange = () => {},
    opacityText = 'Opacity',
    permanentColors = [],
    popupHorizontal = 'right' as const,
    popupVertical = 'top' as const,
    savedColors = [],
    savedColorsCheckedIndices = [],
    savedColorsHeaderText = 'Saved Colors',
    targetHorizontal = 'right' as const,
    targetVertical = 'bottom' as const,
    ...rest
  } = props;
  const classes = useStyles(props);

  const [color, setColor] = React.useState<RGBAColor>(
    getRGBAFromNamedColor(colorProp, showOpacity),
  );

  React.useEffect(() => {
    if (colorProp) {
      setColor(getRGBAFromNamedColor(colorProp, showOpacity));
    }
  }, [colorProp, showOpacity]);

  const handleButtonClick = React.useCallback(
    function handleButtonClick(): void {
      props.onIsOpenChange(true);

      if (props.isSavedColorsDeleting) {
        props.onIsSavedColorsDeletingChange(false);
        props.onSavedColorsCheckedIndicesChange([]);
      }
    },
    [props],
  );

  const handleColorChange = React.useCallback(
    (color: RGBAColor) => {
      const safeColor = {
        r: isEmptyString(color.r) ? '' : color.r,
        g: isEmptyString(color.g) ? '' : color.g,
        b: isEmptyString(color.b) ? '' : color.b,
        a: color.a,
      };
      // window.requestAnimationFrame(() => {
      if (!onColorChange) setColor(safeColor);
      onColorChange?.(safeColor);
      // });
    },
    [onColorChange],
  );

  const handlePopupClose = React.useCallback(() => {
    const safeColor = {
      r: color?.r === '' ? 0 : color?.r,
      g: color?.g === '' ? 0 : color?.g,
      b: color?.b === '' ? 0 : color?.b,
      a: color?.a,
    };
    if (color !== safeColor) setColor(safeColor);
    onIsOpenChange?.(false);
  }, [color, onIsOpenChange]);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.anchor} ref={anchorRef}>
        <ButtonComponent
          color={getRGBAFromNamedColor(color, showOpacity)}
          onClick={handleButtonClick}
          expanderIconProps={expanderIconProps}
        />
      </div>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: targetHorizontal,
          vertical: targetVertical,
        }}
        onClose={handlePopupClose}
        open={isOpen}
        transformOrigin={{
          horizontal: popupHorizontal,
          vertical: popupVertical,
        }}
      >
        <ColorPickerContent
          color={getRGBAFromNamedColor(color, showOpacity)}
          hexCodeText={hexCodeText}
          showOpacity={showOpacity}
          isSavedColorsDeleting={isSavedColorsDeleting}
          onColorChange={handleColorChange}
          onColorChangeEnd={onColorChangeEnd}
          onIsSavedColorsDeletingChange={onIsSavedColorsDeletingChange}
          onSavedColorsChange={onSavedColorsChange}
          onSavedColorsCheckedIndicesChange={onSavedColorsCheckedIndicesChange}
          opacityText={opacityText}
          permanentColors={permanentColors}
          savedColors={savedColors}
          savedColorsCheckedIndices={savedColorsCheckedIndices}
          savedColorsHeaderText={savedColorsHeaderText}
        />
      </Popover>
    </div>
  );
}

export default React.memo(ColorPicker);
