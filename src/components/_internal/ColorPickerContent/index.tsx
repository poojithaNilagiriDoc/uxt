import classnames from 'classnames';
import round from 'lodash/round';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import ColorField from '../ColorField';
import Input from '../../Input';
import RGBSlider from '../RGBSlider';
import ColorPickerHexCode from './ColorPickerHexCode';
import ColorPickerSavedColors from './ColorPickerSavedColors';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        position: 'relative',
      },
      preview: {
        backgroundColor: '#f5f5f5',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        flex: '0 0 auto',
        height: 40,
        marginRight: theme.spacing(1),
        overflow: 'hidden',
        position: 'relative',
        width: 40,
      },
      previewBackground: {
        ...theme.mixins.absoluteFill,
        backgroundImage:
          'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%)',
        backgroundPosition: '0 0, 4px 4px',
        backgroundSize: '8.1px 8.1px',
      },
      previewForeground: {
        ...theme.mixins.absoluteFill,
      },
      topRow: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
      },
      opacity: {
        flex: '1 1 0',
      },
      opacityUnit: {
        alignItems: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        paddingLeft: theme.spacing(0.5),
      },
      opacityContainer: {
        display: 'flex',
        flex: '1 1 0',
      },
    }),
  { name: 'UxtColorPickerContent' },
);

type DivAttributesWithoutColor = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'color'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export interface RGBAColor {
  a: number;
  b: number | '';
  g: number | '';
  r: number | '';
}

export interface ColorPickerContentProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  hexCodeText?: string;
  showOpacity?: boolean;
  isSavedColorsDeleting?: boolean;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
  onIsSavedColorsDeletingChange?: (isSavedColorsDeleting: boolean) => void;
  onSavedColorsChange?: (savedColors: Array<RGBAColor>) => void;
  onSavedColorsCheckedIndicesChange?: (
    savedColorsCheckedIndices: Array<number>,
  ) => void;
  opacityText?: string;
  permanentColors?: Array<RGBAColor>;
  savedColors?: Array<RGBAColor>;
  savedColorsCheckedIndices?: Array<number>;
  savedColorsHeaderText?: string;
  width?: number;
}

function ColorPickerContent(props: ColorPickerContentProps) {
  const {
    className,
    classes: classesProp,
    color = { a: 0, b: 0, g: 0, r: 0 },
    hexCodeText = 'Hex',
    showOpacity = true,
    isSavedColorsDeleting,
    onColorChange,
    onColorChangeEnd,
    onIsSavedColorsDeletingChange,
    onSavedColorsChange,
    onSavedColorsCheckedIndicesChange,
    opacityText = 'Opacity',
    permanentColors,
    savedColors = [],
    savedColorsCheckedIndices = [],
    savedColorsHeaderText = 'Saved Colors',
    width = 296,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleOpacityChange = React.useCallback(
    function handleOpacityChange(opacity) {
      onColorChange?.({ ...color, a: round(opacity / 100, 2) });
      onColorChangeEnd?.({ ...color, a: round(opacity / 100, 2) });
    },
    [color, onColorChange, onColorChangeEnd],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      style={{ width: width }}
      {...rest}
    >
      <ColorField
        color={color}
        onColorChange={onColorChange}
        onColorChangeEnd={onColorChangeEnd}
        width={width}
      />
      <div className={classes.topRow}>
        <div className={classes.preview}>
          <div className={classes.previewBackground} />
          <div
            className={classes.previewForeground}
            style={{
              backgroundColor: `rgba(
                ${color?.r === '' ? 0 : color?.r},
                ${color?.g === '' ? 0 : color?.g},
                ${color?.b === '' ? 0 : color?.b},
                ${color.a}
              )`,
            }}
          />
        </div>
        <ColorPickerHexCode
          color={color}
          label={hexCodeText}
          onColorChange={onColorChange}
          onColorChangeEnd={onColorChangeEnd}
        />
        {showIf(showOpacity)(
          <div className={classes.opacityContainer}>
            <Input
              autoComplete="off"
              className={classes.opacity}
              label={opacityText}
              max={100}
              min={0}
              onValueChange={handleOpacityChange}
              type="number"
              value={String(round(color.a * 100))}
            />
            <div className={classes.opacityUnit}>%</div>
          </div>,
        )}
      </div>
      <RGBSlider
        color={color}
        controlledComponent="r"
        onColorChange={onColorChange}
        onColorChangeEnd={onColorChangeEnd}
      />
      <RGBSlider
        color={color}
        controlledComponent="g"
        onColorChange={onColorChange}
        onColorChangeEnd={onColorChangeEnd}
      />
      <RGBSlider
        color={color}
        controlledComponent="b"
        onColorChange={onColorChange}
        onColorChangeEnd={onColorChangeEnd}
      />
      {showIf(onSavedColorsChange)(() => (
        <ColorPickerSavedColors
          checkedIndices={savedColorsCheckedIndices}
          color={color}
          headerText={savedColorsHeaderText}
          isDeleting={isSavedColorsDeleting}
          showOpacity={showOpacity}
          onCheckedIndicesChange={onSavedColorsCheckedIndicesChange}
          onColorChange={onColorChange}
          onColorChangeEnd={onColorChangeEnd}
          onIsDeletingChange={onIsSavedColorsDeletingChange}
          onSavedColorsChange={onSavedColorsChange}
          permanentColors={permanentColors}
          savedColors={savedColors}
        />
      ))}
    </div>
  );
}

export default React.memo(ColorPickerContent);
