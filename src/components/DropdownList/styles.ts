import { transparentize } from 'polished';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Position from '../constants/position';
import { DropdownListProps } from './index';

export const styles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'block',
        position: 'relative',
        userSelect: 'none',
      },
      wrapper: {},
      inputWrapper: {},
      input: {
        cursor: 'pointer',
        minWidth: 0,
      },
      unEditableInput: {
        overflow: 'hidden',
        paddingTop: 12,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        backgroundColor: 'inherit',
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        color: 'inherit',
        height: theme.height.input,
        paddingLeft: 12,
        paddingRight: 1,
        cursor: 'pointer',
      },
      hasIcon: {
        '& $unEditableInput': {
          paddingRight: theme.height.input,
        },
      },
      placeholder: {
        color: theme.palette.text.secondary,
        pointerEvents: 'none',
        position: 'inherit',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      icon: {
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        paddingLeft: '8px',
        right: 0,
        top: 0,
        whiteSpace: 'nowrap',
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
      inputDisabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        '& $input': {
          pointerEvents: 'none',
        },
        '& $unEditableInput': {
          pointerEvents: 'none',
        },
      },
      labelRaised: {
        '& $label': {
          fontSize: '0.75rem',
          top: 0,
        },
      },
      inputReadOnly: {
        '& $input': {
          backgroundColor: 'transparent',
          color: 'inherit',
        },
      },
      choices: {
        overflowY: 'auto',
      },
      minWidthEnabled: {
        minWidth: 160,
      },
      noMatchesFoundText: {
        display: 'flex',
        alignItems: 'center',
        padding: 8,
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
        '$unEditableInput:invalid + &': {
          color: `${theme.palette.error.main} !important`,
        },
      },
      actionPosition: {
        textAlign: 'center',
        borderTop: (props: DropdownListProps) =>
          props.actionPosition ? 'none' : `2px solid ${theme.palette.divider}`,
        borderBottom: (props: DropdownListProps) =>
          props.actionPosition === Position.Top
            ? `2px solid ${theme.palette.divider}`
            : 'none',
        color: theme.palette.text.link,
        textTransform: 'uppercase',
        fontWeight: theme.typography.h6.fontWeight,
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
        '$unEditableInput:invalid ~ div &': {
          stroke: `${theme.palette.error.main} !important`,
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
      invalid: {
        '& $label': {
          color: `${theme.palette.error.main} !important`,
        },
        '& $outlinePath': {
          stroke: `${theme.palette.error.main} !important`,
        },
        '& $helperText': {
          color: `${theme.palette.error.main} !important`,
        },
      },
      '@keyframes loading': {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      loadingIndicator: {
        width: '90%',
        height: theme.spacing(2),
        borderRadius: theme.spacing(2),
        position: 'relative',
        background: transparentize(0.8, theme.palette.grey[600]),
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundClip: 'border-box',
          borderRadius: theme.spacing(2),
          transform: 'translateX(-100%)',
          background: `linear-gradient(90deg, transparent,${transparentize(
            0.9,
            theme.palette.grey[600],
          )}, transparent)`,
          animation: `$loading 1s infinite`,
        },
        tooltip: {},
      },
    }),
  { name: 'UxtDropdownList' },
);
