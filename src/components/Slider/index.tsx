import classnames from 'classnames';
import clamp from 'lodash/fp/clamp';
import isNaN from 'lodash/fp/isNaN';
import round from 'lodash/round';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import KeyBinder from '../_internal/KeyBinder';
import useIsMounted from '../../hooks/useIsMounted';

const tooltipDuration = 1000;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        height: theme.height.input,
        '&:hover': {
          '& $thumbCenter': {
            transform: 'translate(-50%, -50%) scale(1.1)',
          },
        },
      },
      slider: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        position: 'relative',
        '&:focus': {
          '& $thumbBackground': {
            backgroundColor: theme.palette.action.hover,
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '& $thumbCenter': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      leftTrack: {
        backgroundColor: theme.palette.primary.main,
        height: 2,
        left: 0,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      },
      rightTrack: {
        backgroundColor: theme.palette.divider,
        height: 2,
        left: 0,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      },
      thumb: {
        cursor: 'pointer',
        height: 40,
        left: 0,
        marginLeft: -20,
        position: 'absolute',
        top: 0,
        width: 40,
      },
      thumbBackground: {
        backgroundColor: 'transparent',
        borderRadius: '50%',
        height: 40,
        left: '50%',
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(0)',
        transition: 'background-color 350ms ease',
        width: 40,
      },
      thumbCenter: {
        backgroundColor: theme.palette.primary.main,
        border: `2 solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        height: 12,
        left: '50%',
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(1)',
        width: 12,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        display: 'flex',
        flex: '0 0 auto',
        justifyContent: 'center',
        minWidth: 40,
        padding: 8,
      },
      input: {
        backgroundColor: 'inherit',
        border: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        color: 'inherit',
        display: 'block',
        flex: '0 0 12%',
        fontSize: '0.875rem',
        height: theme.height.input,
        marginRight: theme.spacing(2),
        minWidth: '0 !important',
        padding: 0,
        paddingBottom: theme.spacing(0.5),
        textAlign: 'center',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&:focus': {
          borderWidth: 2,
        },
      },
      atZero: {
        backgroundColor: 'transparent',
        borderColor: theme.palette.action.hover,
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
        '& $slider': {
          pointerEvents: 'none',
        },
      },
      dragging: {
        '& $thumbCenter, & $slider:focus $thumbCenter': {
          transform: 'translate(-50%, -50%) scale(1.3)',
        },
      },
    }),
  { name: 'UxtSlider' },
);

function SliderTooltip(props) {
  const { classes, value, ...rest } = props;

  return (
    <div className={classes.tooltip} {...rest}>
      {value}
    </div>
  );
}

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  isInputEnabled?: boolean;
  leftTrackStyles?: React.CSSProperties;
  maxValue?: number;
  minValue?: number;
  onValueChange?: (value: number | '') => void;
  onValueChangeEnd?: (value: number | '') => void;
  rightTrackStyles?: React.CSSProperties;
  enableDragTooltip?: boolean;
  stepSize?: number;
  tooltipContentComponent?: React.ElementType;
  value?: number | '';
}

const Slider = React.forwardRef(function Slider(
  props: SliderProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const thumbRef: React.MutableRefObject<HTMLDivElement> = React.useRef();
  const tooltipTimeout: React.MutableRefObject<NodeJS.Timeout> = React.useRef();
  const {
    className,
    classes: classesProp,
    isDisabled = false,
    isInputEnabled,
    leftTrackStyles = {},
    maxValue = 1,
    minValue = 0,
    onValueChange,
    onValueChangeEnd,
    rightTrackStyles = {},
    enableDragTooltip = true,
    stepSize = 1,
    tooltipContentComponent = SliderTooltip,
    value = 0,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
  const [sliderEl, setSliderEl] = React.useState<HTMLDivElement | null>(null);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    return () => {
      if (!isMounted() && tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    };
  }, [isMounted]);

  const sliderWidth = React.useMemo(() => {
    if (!sliderEl) {
      return 0;
    }

    return sliderEl.offsetWidth;
  }, [sliderEl]);

  const thumbPositionX = React.useMemo(() => {
    const percentOffset = getPercentOffset(maxValue, minValue, value);

    return (sliderWidth / 100) * percentOffset;
  }, [maxValue, minValue, sliderWidth, value]);

  const sliderLeftTrackStyle = React.useMemo(() => {
    const percentOffset = getPercentOffset(maxValue, minValue, value);

    return {
      right: `${100 - percentOffset}%`,
      transition: isDragging ? '' : 'right 100ms ease',
      ...leftTrackStyles,
    };
  }, [isDragging, leftTrackStyles, maxValue, minValue, value]);

  const sliderRightTrackStyle = React.useMemo(() => {
    const percentOffset = getPercentOffset(maxValue, minValue, value);

    if (percentOffset === 0) {
      return { left: '6px', ...rightTrackStyles };
    }

    return {
      left: `${percentOffset}%`,
      transition: isDragging ? '' : 'left 100ms ease',
      ...rightTrackStyles,
    };
  }, [isDragging, maxValue, minValue, rightTrackStyles, value]);

  const openTooltip = React.useCallback(
    function openTooltip() {
      setIsTooltipVisible(true);

      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }

      tooltipTimeout.current = setTimeout(() => {
        setIsTooltipVisible(false);
      }, tooltipDuration);
    },
    [tooltipDuration],
  );

  const handleInputChange = React.useCallback(
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const inputValue = e.target.value;
      if (inputValue === '') {
        onValueChange('');
        return;
      }
      const newValue = parseInt(inputValue, 10);

      if (isNaN(newValue)) return;
      if (newValue < minValue) return;
      if (newValue > maxValue) return;

      onValueChange(newValue);
    },
    [maxValue, minValue, onValueChange],
  );

  const handleSliderDrag = React.useCallback(
    function handleSliderDrag(e, data: DraggableData) {
      const nextValue = getValueFromX(
        sliderWidth,
        maxValue,
        minValue,
        stepSize,
        data.x,
      );

      if (nextValue === value) return;

      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }

      onValueChange(nextValue);
    },
    [maxValue, minValue, onValueChange, sliderWidth, stepSize, value],
  );

  const handleSliderDragStart = React.useCallback(
    function handleSliderDragStart(e: DraggableEvent, d: DraggableData) {
      setIsDragging(true);
      setIsTooltipVisible(true);

      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    },
    [],
  );

  const handleSliderDragStop = React.useCallback(
    function handleSliderDragStop(e: DraggableEvent, data: DraggableData) {
      setIsDragging(false);

      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

      tooltipTimeout.current = setTimeout(() => {
        setIsTooltipVisible(false);
      }, tooltipDuration);

      const nextValue = getValueFromX(
        sliderWidth,
        maxValue,
        minValue,
        stepSize,
        data.x,
      );

      onValueChangeEnd?.(nextValue);
    },
    [minValue, maxValue, onValueChangeEnd, sliderWidth, stepSize, value],
  );

  const handleSliderKeyDownLeftArrow = React.useCallback(
    function handleSliderKeyDownLeftArrow() {
      const closestStep = getClosestStep(
        (value !== '' ? value : 0) - stepSize,
        stepSize,
      );
      const nextValue = clamp(minValue, maxValue, closestStep);

      if (nextValue === value) return;

      onValueChange(nextValue);

      if (enableDragTooltip) openTooltip();
    },
    [
      maxValue,
      minValue,
      onValueChange,
      openTooltip,
      stepSize,
      value,
      enableDragTooltip,
    ],
  );

  const handleSliderKeyDownRightArrow = React.useCallback(
    function handleSliderKeyDownRightArrow() {
      const closestStep = getClosestStep(
        (value !== '' ? value : 0) + stepSize,
        stepSize,
      );
      const nextValue = clamp(minValue, maxValue, closestStep);

      if (nextValue === value) return;

      onValueChange(nextValue);

      if (enableDragTooltip) openTooltip();
    },
    [
      maxValue,
      minValue,
      onValueChange,
      openTooltip,
      stepSize,
      value,
      enableDragTooltip,
    ],
  );

  const handleSliderMouseDown = React.useCallback(
    function handleSliderMouseDown(
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
      if (isDisabled) return;

      e.persist();

      const x = e.clientX;
      const nextValue = getValueFromX(
        sliderWidth,
        maxValue,
        minValue,
        stepSize,
        x - sliderEl.getBoundingClientRect().left,
      );

      if (nextValue !== value) {
        onValueChange?.(nextValue);
        onValueChangeEnd?.(nextValue);
      }

      if (enableDragTooltip) openTooltip();
    },
    [
      isDisabled,
      maxValue,
      minValue,
      onValueChange,
      onValueChangeEnd,
      openTooltip,
      sliderEl,
      sliderWidth,
      stepSize,
      value,
      enableDragTooltip,
    ],
  );

  const handleSliderRefChange = React.useCallback(
    function handleSliderRefChange(sliderRef) {
      setSliderEl(sliderRef);
    },
    [],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (value === '') {
        onValueChange?.(0);
      }
    },
    [value, onValueChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.atZero]: value === 0,
          [classes.disabled]: isDisabled,
          [classes.dragging]: isDragging,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <KeyBinder
        isDisabled={isDisabled}
        onLeftArrowKeyDown={handleSliderKeyDownLeftArrow}
        onRightArrowKeyDown={handleSliderKeyDownRightArrow}
      >
        <div
          className={classes.slider}
          onMouseDown={handleSliderMouseDown}
          ref={handleSliderRefChange}
          tabIndex={0}
        >
          <div className={classes.leftTrack} style={sliderLeftTrackStyle} />
          <div className={classes.rightTrack} style={sliderRightTrackStyle} />
          <Draggable
            axis="x"
            bounds={{
              bottom: 0,
              left: 0,
              right: sliderWidth,
              top: 0,
            }}
            disabled={isDisabled}
            grid={[1, 1]}
            onDrag={handleSliderDrag}
            onStart={handleSliderDragStart}
            onStop={handleSliderDragStop}
            position={{ x: thumbPositionX, y: 0 }}
          >
            <div
              className={classes.thumb}
              ref={thumbRef}
              style={{
                transition: isDragging ? '' : 'left 100ms ease',
              }}
            >
              <div className={classes.thumbBackground} />
              <div className={classes.thumbCenter} />
            </div>
          </Draggable>
          <Popper
            anchorEl={thumbRef.current}
            modifiers={{
              flip: { enabled: true },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window',
              },
            }}
            open={enableDragTooltip ? isTooltipVisible : false}
            placement="top"
            style={{ zIndex: 1500 }}
            transition={true}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                {React.createElement(tooltipContentComponent, {
                  classes: classes,
                  value: value,
                })}
              </Fade>
            )}
          </Popper>
        </div>
      </KeyBinder>
      {showIf(isInputEnabled)(
        <input
          className={classes.input}
          disabled={isDisabled}
          onChange={handleInputChange}
          type="number"
          value={value}
          onBlur={handleBlur}
        />,
      )}
    </div>
  );
});

export default React.memo(Slider);

function getClosestStep(value, stepSize) {
  const roundedValue = round(value);

  if (roundedValue % stepSize === 0) return roundedValue;

  for (let i = 1; i < stepSize - 1; i += 1) {
    if ((roundedValue + i) % stepSize === 0) {
      return roundedValue + i;
    }

    if ((roundedValue - i) % stepSize === 0) {
      return roundedValue - i;
    }
  }

  return -1;
}

function getPercentOffset(maxValue, minValue, value) {
  const valueRange = maxValue - minValue;
  const valueOffset = value - minValue;
  const rawScale = (100 / valueRange) * (valueOffset / 100);
  const scalingFactor = clamp(0, 1, round(rawScale, 10));

  return scalingFactor * 100;
}

function getValueFromX(sliderWidth, maxValue, minValue, stepSize, x) {
  const rawScale = (100 / sliderWidth) * (x / 100);
  const scalingFactor = clamp(0, 1, round(rawScale, 2));
  const valueRange = maxValue - minValue;
  const rawValue = valueRange * scalingFactor + minValue;

  if (scalingFactor === 0 || scalingFactor === 1 || stepSize === 0) {
    return rawValue;
  }

  const closestStep = getClosestStep(rawValue, stepSize);

  return clamp(minValue, maxValue, closestStep);
}
