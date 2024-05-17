import React from 'react';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import toNumber from 'lodash/fp/toNumber';
import uniqueId from 'lodash/fp/uniqueId';
import classnames from 'classnames';
import { AutoSizer } from 'react-virtualized';
import createStyles from '@material-ui/core/styles/createStyles';
import hide from 'uxt-graphics/icons/hide';
import upload from 'uxt-graphics/icons/upload';
import view from 'uxt-graphics/icons/view';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import getPath from '../_helpers/getPath';
import getTextWidth from '../_helpers/getTextWidth';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';
import Spinner from '../Spinner';
import type { UxtTheme } from '../../themes/UxtTheme';
import type { IconProps } from '../Icon';
import type { ProgressBarProps } from '../ProgressBar';
import type { SpinnerProps } from '../Spinner';

const getPaddingRight = (props: InputProps, theme: UxtTheme): number => {
  let paddingRight = 1;

  if (props.iconSvg || props.enableShowPassword) {
    paddingRight = theme.spacing(5);

    if (
      props.isProgressBarVisible &&
      props.progressIndicatorType === 'spinner'
    ) {
      paddingRight = theme.spacing(8);
    }
  } else {
    if (
      props.isProgressBarVisible &&
      props.progressIndicatorType !== 'linear'
    ) {
      paddingRight = theme.spacing(5);
    }
  }

  return paddingRight;
};

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 0,
        '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
          {
            WebkitAppearance: 'none',
            margin: 0,
          },
      },
      innerContainer: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        position: 'relative',
      },
      input: {
        backgroundColor: 'inherit',
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        color: 'inherit',
        height: theme.height.input,
        paddingLeft: 12,
        paddingRight: (props: InputProps) => getPaddingRight(props, theme),
        width: '100%',
        '&[type="number"]:hover, &[type="number"]:focus': {
          '& ~ $stepper': {
            display: 'block',
          },
        },
        '&[type="password"]::-ms-reveal, &[type="password"]::-ms-clear': {
          display: 'none !important',
        },
      },
      children: {
        flex: '1 1 auto',
      },
      label: {
        color: theme.palette.text.secondary,
        left: 12,
        pointerEvents: 'none',
        position: 'absolute',
        top: 18,
        transform: 'translateY(-8px)',
        transition: 'top 0.2s ease, font-size 0.2s ease',
        whiteSpace: 'nowrap',
        '$input:invalid + &': {
          color: `${theme.palette.error.main} !important`,
        },
      },
      placeholder: {
        color: theme.palette.text.secondary,
      },
      fileLabel: {
        cursor: 'pointer',
        display: 'block',
        height: theme.height.input,
        lineHeight: `${theme.height.input}px`,
        overflow: 'hidden',
        paddingLeft: 12,
        paddingRight: 40,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
      },
      outline: {
        ...theme.mixins.absoluteFill,
        borderRadius: theme.shape.borderRadius,
        height: theme.height.input,
        pointerEvents: 'none',
      },
      outlinePath: {
        fill: 'transparent',
        stroke: theme.palette.divider,
        strokeWidth: 1,
        '$input:invalid ~ div &': {
          stroke: `${theme.palette.error.main} !important`,
        },
      },
      progressBar: {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        bottom: 1,
        height: 3,
        left: 1,
        position: 'absolute',
        right: 1,
        width: 'inherit',
      },
      icon: {
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      stepper: {
        display: 'none',
        height: '94%',
        position: 'absolute',
        right: 2,
        top: 1,
        '&:hover': {
          display: 'block',
        },
      },
      increment: {
        alignItems: 'center',
        backgroundColor: 'inherit',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderColor: `${theme.palette.divider} !important`,
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        borderRight: 0,
        borderTop: 0,
        cursor: (props: InputProps) =>
          props.isDisabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        height: 20,
        justifyContent: 'center',
        maxWidth: 20,
        minHeight: 20,
        minWidth: 21,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 1,
        paddingTop: 0,
        position: 'relative',
        transition: 'none',
        width: 21,
        '&:hover::after, &:hover::before, &:active::after, &:active::before': {
          opacity: 1,
        },
        '&:active': {
          backgroundColor: theme.palette.action.hover,
        },
        '&::before': {
          backgroundColor: theme.palette.text.primary,
          content: '""',
          height: 6,
          position: 'relative',
          top: 2,
          transform: 'rotate(45deg) translate3d(-2px, 0, 0)',
          width: 1,
        },
        '&::after': {
          backgroundColor: theme.palette.text.primary,
          content: '""',
          height: 6,
          opacity: 1,
          position: 'relative',
          top: 2,
          transform: 'rotate(-45deg) translate3d(2px, 0, 0)',
          transition: 'none',
          width: 1,
        },
      },
      decrement: {
        alignItems: 'center',
        backgroundColor: 'inherit',
        borderColor: `${theme.palette.divider} !important`,
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        borderRight: 0,
        borderTop: 0,
        display: 'flex',
        height: 18,
        justifyContent: 'center',
        maxWidth: 20,
        minHeight: 18,
        minWidth: 20,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 1,
        paddingTop: 0,
        position: 'relative',
        transition: 'none',
        width: 20,
        cursor: (props: InputProps) =>
          props.isDisabled ? 'not-allowed' : 'pointer',
        '&:hover::after, &:hover::before': {
          opacity: 1,
        },
        '&:active': {
          backgroundColor: theme.palette.action.hover,
        },
        '&::before': {
          backgroundColor: theme.palette.text.primary,
          content: '""',
          height: 6,
          left: 1,
          position: 'relative',
          top: -2,
          transform: 'rotate(-45deg) translate3d(-2px, 0, 0)',
          width: 1,
        },
        '&::after': {
          backgroundColor: theme.palette.text.primary,
          content: '""',
          height: 6,
          left: 1,
          opacity: 1,
          position: 'relative',
          top: -2,
          transform: 'rotate(45deg) translate3d(2px, 0, 0)',
          transition: 'none',
          width: 1,
        },
      },
      helperText: {
        bottom: -2,
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        overflow: 'hidden',
        paddingLeft: 12,
        paddingRight: 12,
        position: 'relative',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      disabled: {
        opacity: 0.5,
      },
      fileType: {
        '& $input': {
          height: 0.1,
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          width: 0.1,
          zIndex: -1,
        },
      },
      focused: {
        '& $label': {
          color: theme.palette.text.link,
        },
        '& $outlinePath': {
          stroke: theme.palette.primary.main,
          strokeWidth: 2,
        },
      },
      hasIcon: {
        '& $input': {
          paddingRight: (props: InputProps) => getPaddingRight(props, theme),
        },
      },
      invalid: {
        '& $label': {
          color: `${theme.palette.error.main} !important`,
        },
        '& $outlinePath': {
          stroke: `${theme.palette.error.main} !important`,
        },
        '& $helperText': {
          color: theme.palette.error.main,
        },
      },
      labelRaised: {
        '& $label': {
          fontSize: '0.75rem',
          top: 0,
        },
      },
      multiline: {
        '& $innerContainer::before': {
          backgroundColor: 'inherit',
          content: '""',
          height: 16,
          position: 'absolute',
          width: 'calc(100% - 17px)',
        },
        '& $input': {
          border: 'none',
          minHeight: theme.height.input * 2,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 17,
          paddingTop: 16,
          resize: 'none',
        },
      },
      numberType: {},
      readOnly: {
        '& $input': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          color: theme.palette.text.secondary,
        },
      },
      spinner: {
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: (props: InputProps) =>
          props.iconSvg ? theme.spacing(5.5) : theme.spacing(2.5),
        top: theme.spacing(1.5),
        transformOrigin: '50% 50%',
      },
    }),
  { name: 'UxtInput' },
);

export type HtmlInputElementProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'children' | 'placeholder' | 'ref'
>;

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    HtmlInputElementProps {
  autoComplete?: string;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  enableShowPassword?: boolean;
  helperText?: string;
  iconProps?: Partial<IconProps>;
  iconSvg?: string;
  id?: string;
  inputRef?: (inputRef: HTMLInputElement) => void;
  invalidText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  keepLabelRaised?: boolean;
  isMultiline?: boolean;
  isProgressBarVisible?: boolean;
  label?: string;
  max?: number;
  min?: number;
  onValueChange?: (value?: string, e?: any) => void;
  placeholder?: string;
  progressBarValue?: number;
  progressIndicatorType?: 'linear' | 'spinner';
  progressBarProps?: Partial<ProgressBarProps>;
  spinnerProps?: Partial<SpinnerProps>;
  readOnly?: boolean;
  rows?: number;
  step?: number | string;
  style?: React.CSSProperties;
  type?: string;
  value?: string;
}

export interface InputMethods {
  focus?: () => void;
}

const Input = React.forwardRef(function Input(
  props: InputProps,
  ref: React.Ref<InputMethods>,
) {
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef();
  const {
    autoComplete,
    children,
    className,
    classes: classesProp,
    enableShowPassword = false,
    helperText,
    iconProps = {},
    iconSvg,
    id: idProp,
    inputRef: inputRefProp,
    invalidText,
    isDisabled,
    isInvalid,
    keepLabelRaised = false,
    isMultiline,
    isProgressBarVisible,
    label = '',
    max = Infinity,
    min = -Infinity,
    onBlur,
    onFocus,
    onValueChange,
    type,
    placeholder: placeholderProp = type === 'file'
      ? 'Select a file'
      : undefined,
    progressBarValue,
    progressIndicatorType = props.type === 'file'
      ? ('linear' as const)
      : ('spinner' as const),
    progressBarProps = {},
    spinnerProps = {},
    readOnly,
    rows,
    step = 1,
    style,
    value = '',
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isInputElementInvalid, setIsInputElementInvalid] =
    React.useState(false);
  const [outlineEl, setOutlineEl] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const id = React.useMemo(() => idProp || `Input-${uniqueId()}`, [idProp]);

  const isLabelRaised = React.useMemo((): boolean => {
    return keepLabelRaised
      ? true
      : label
      ? !!value ||
        isFocused ||
        !isNil(children) ||
        type === 'file' ||
        isInputElementInvalid
      : true;
  }, [
    children,
    isFocused,
    isInputElementInvalid,
    keepLabelRaised,
    type,
    value,
    label,
  ]);

  const placeholder = React.useMemo(
    () => (isLabelRaised ? placeholderProp : undefined),
    [isLabelRaised, placeholderProp],
  );

  const patternProps = React.useMemo(
    () => (type === 'number' ? { pattern: '[0-9]*' } : {}),
    [type],
  );

  const safeValue = React.useMemo(
    () => (type === 'file' ? undefined : value),
    [type, value],
  );

  const getOutlinePathData = React.useCallback(
    function getOutlinePathData({ height, width }) {
      const notchWidth = isLabelRaised ? getTextWidth('12px Roboto', label) : 0;

      return getPath(notchWidth, outlineEl, height, width);
    },
    [isLabelRaised, label, outlineEl],
  );

  const handleDecrement = React.useCallback(
    function handleDecrement() {
      setIsInputElementInvalid(false);

      if (type !== 'number') return;

      const actualStep = toNumber(step === 'any' ? 1 : step);
      const numberValue = coerceNumberToStep(
        toNumber(value),
        actualStep,
        false,
      );
      const decimalPlaces =
        step === 'any'
          ? countDecimalPlaces(numberValue)
          : countDecimalPlaces(actualStep);
      const result = numberValue - actualStep;

      if (result >= min) {
        onValueChange(String(result.toFixed(decimalPlaces)));
      } else {
        onValueChange(String(min.toFixed(decimalPlaces)));
      }
    },
    [min, onValueChange, step, type, value],
  );

  const handleIncrement = React.useCallback(
    function handleIncrement() {
      setIsInputElementInvalid(false);

      if (type !== 'number') return;

      const actualStep = toNumber(step === 'any' ? 1 : step);
      const numberValue = coerceNumberToStep(toNumber(value), actualStep, true);
      const decimalPlaces =
        step === 'any'
          ? countDecimalPlaces(numberValue)
          : countDecimalPlaces(actualStep);

      const result = value === '' ? min : numberValue + actualStep;

      if (result <= max) {
        onValueChange(String(result.toFixed(decimalPlaces)));
      } else {
        onValueChange(String(max.toFixed(decimalPlaces)));
      }
    },
    [max, min, onValueChange, step, type, value],
  );

  const handleInputBlur = React.useCallback(
    function handleInputBlur(e) {
      setIsFocused(false);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  const handleInputFocus = React.useCallback(
    function handleInputFocus(e) {
      setIsFocused(true);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const handlePasswordShowOrHide = React.useCallback(
    function handlePasswordShowOrHide(e) {
      if (!inputRef.current) return;

      inputRef.current.focus();

      e.preventDefault();

      setShowPassword(!showPassword);
    },
    [showPassword],
  );

  const handleInputValueChange = React.useCallback(
    function handleInputValueChange(e) {
      e.persist();

      // Invalid values return undefined thus lowering the label.
      // Assume if invalid, there's probably an input value, so don't lower the label.
      const isInputElementValid = getOr(true, 'target.validity.valid', e);

      setIsInputElementInvalid(!isInputElementValid);

      onValueChange(e.target.value, e);
    },
    [onValueChange],
  );

  const handleInputRefChange = React.useCallback(
    function handleInputRefChange(ref) {
      inputRef.current = ref;

      if (inputRefProp) {
        inputRefProp(ref);
      }
    },
    [inputRefProp],
  );

  const handleOutlineRefChange = React.useCallback(
    function handleOutlineRefChange(ref) {
      setOutlineEl(ref);
    },
    [],
  );

  React.useEffect(() => {
    if (type === 'password' && inputRef.current)
      inputRef.current.setSelectionRange(value.length, value.length);
  }, [showPassword]);

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        if (!inputRef.current) return;

        inputRef.current.focus();
      },
    }),
    [],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.disabled]: isDisabled,
          [classes.fileType]: type === 'file',
          [classes.focused]: isFocused,
          [classes.hasIcon]: !!iconSvg && !isMultiline,
          [classes.multiline]: isMultiline,
          [classes.invalid]: isInvalid || isInputElementInvalid,
          [classes.labelRaised]: isLabelRaised,
          [classes.readOnly]: readOnly,
        },
        className,
      )}
      style={style}
    >
      <div className={classes.innerContainer}>
        {hideIf(!isNil(children))(
          <>
            {React.createElement(isMultiline ? 'textarea' : 'input', {
              className: classes.input,
              disabled: isDisabled,
              onBlur: handleInputBlur,
              onChange: handleInputValueChange,
              onFocus: handleInputFocus,
              ref: handleInputRefChange,
              rows: isMultiline ? rows : undefined,
              value: safeValue,
              ...patternProps,
              autoComplete,
              id,
              max,
              min,
              placeholder,
              readOnly,
              step,
              type:
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type,
              ...rest,
            })}
            {showIf(type === 'file')(() => (
              <label className={classes.fileLabel} htmlFor={id}>
                {showIf(!value)(() => (
                  <div className={classes.placeholder}>{placeholder}</div>
                ))}
                {value.replace('C:\\fakepath\\', '')}
              </label>
            ))}
            {showIf(type === 'file' || (!isMultiline && iconSvg))(() => (
              <Icon
                className={classes.icon}
                size="small"
                svg={type === 'file' ? upload : iconSvg}
                {...iconProps}
              />
            ))}
            {showIf(
              type === 'password' &&
                isLabelRaised &&
                value &&
                enableShowPassword,
            )(() => (
              <Icon
                className={classes.icon}
                svg={showPassword ? hide : view}
                size="small"
                onClick={handlePasswordShowOrHide}
                {...iconProps}
              />
            ))}
            {showIf(
              isProgressBarVisible && progressIndicatorType === 'spinner',
            )(
              <Spinner
                appearance="line"
                className={classes.spinner}
                size={16}
                {...spinnerProps}
              />,
            )}
            {showIf(isProgressBarVisible && progressIndicatorType === 'linear')(
              () => (
                <ProgressBar
                  className={classes.progressBar}
                  isIndeterminate={isNil(progressBarValue)}
                  value={progressBarValue}
                  {...progressBarProps}
                />
              ),
            )}
          </>,
        )}
        {showIf(!isNil(children))(
          <div
            className={classes.children}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            ref={handleInputRefChange}
            tabIndex={0}
          >
            {children}
          </div>,
        )}
        {showIf(label)(() => (
          <div className={classes.label}>{label}</div>
        ))}
        {showIf(type === 'number')(
          <div className={classes.stepper}>
            <button
              className={classes.increment}
              onClick={handleIncrement}
              onMouseDown={e => {
                if (!inputRef.current) return;

                e.preventDefault();

                inputRef.current.focus();
              }}
              type="button"
            />
            <button
              className={classes.decrement}
              onClick={handleDecrement}
              onMouseDown={e => {
                if (!inputRef.current) return;

                e.preventDefault();

                inputRef.current.focus();
              }}
              type="button"
            />
          </div>,
        )}
        <AutoSizer>
          {({ height, width }) => (
            <div className={classes.outline} ref={handleOutlineRefChange}>
              <svg height={height} width={width}>
                <path
                  className={classes.outlinePath}
                  d={getOutlinePathData({ height, width })}
                />
              </svg>
            </div>
          )}
        </AutoSizer>
      </div>
      <div className={classes.helperText}>
        {hideIf(isInvalid && invalidText)(helperText)}
        {showIf(isInvalid && invalidText)(invalidText)}
      </div>
    </div>
  );
});

export default React.memo(Input);

function coerceNumberToStep(number, step, isIncrement) {
  const remainder = step < 1 ? 0 : number % step;
  return remainder === 0
    ? number
    : isIncrement === true
    ? number - remainder
    : number + (step - remainder);
}

// Prevent overflow
function countDecimalPlaces(number) {
  return Math.floor(number) === number
    ? 0
    : number.toString().split('.')[1].length;
}
