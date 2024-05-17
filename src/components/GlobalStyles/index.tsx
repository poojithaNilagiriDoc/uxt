import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useUnscopedStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      '@global': {
        '*, *::after, *::before': {
          boxSizing: 'border-box',
          margin: 0,
          outline: 'none',
          padding: 0,
        },
        'html, body': {
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
          top: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased', // Antialiasing.
          MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          fill: theme.palette.action.active,
          ...theme.typography.body1,
          lineHeight: 'normal',
        },
        'a, button, div': {
          '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        },
        'input, select, textarea, button': {
          fontFamily: 'inherit',
          fontSize: 'inherit',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: 400,
        },
        a: {
          cursor: 'pointer',
          '&:link': {
            textDecoration: 'none',
            color: theme.palette.primary.main,
          },
          '&:visited': {
            color: theme.palette.primary.dark,
          },
          '&:hover': {
            textDecoration: 'underline',
            color: theme.palette.primary.light,
          },
          '&:focus': {
            outline: `1px solid ${theme.palette.primary.main}`,
          },
          '&:active': {
            color: theme.palette.primary.dark,
          },
        },
        li: {
          listStyle: 'none',
        },
        '*::-webkit-scrollbar': {
          backgroundColor: theme.palette.action.hover,
          height: theme.spacing(2),
          width: theme.spacing(2),
        },
        '*::-webkit-scrollbar-track': {
          backgroundClip: 'padding-box',
          border: '3px solid transparent',
          borderRadius: 8,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundClip: 'padding-box',
          backgroundColor: theme.palette.action.disabled,
          border: '3px solid transparent',
          borderRadius: 12,
          minHeight: theme.spacing(3),
          '&:hover': {
            backgroundColor: theme.palette.text.secondary,
          },
        },
        '*::-webkit-scrollbar-button': {
          display: 'none',
        },
        '@global': {
          '#UxtNotificationService-SnackbarStack': {
            bottom: 0,
            display: 'block',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            position: 'fixed',
            right: 0,
            width: '100%',
            zIndex: theme.zIndex.notificationPanel,
            [theme.breakpoints.up('sm')]: {
              width: 480,
            },
          },
        },
      },
    }),
  { name: 'UxtGlobalStyles' },
);

function UnscopedStyles(props) {
  useUnscopedStyles(props);

  return null;
}

const useScopedStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fill: theme.palette.action.active,
        ...theme.typography.body1,
        lineHeight: 'normal',
        '& *, & *::after, & *::before': {
          boxSizing: 'border-box',
          margin: 0,
          MozOsxFontSmoothing: 'grayscale', // Antialiasing.
          outline: 'none',
          padding: 0,
          WebkitFontSmoothing: 'antialiased', // Antialiasing.
        },
        '& a, & button, & div': {
          '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        },
        '& input, & select, & textarea, & button': {
          fontFamily: 'inherit',
          fontSize: 'inherit',
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontWeight: 400,
        },
        '& a': {
          color: theme.palette.text.link,
          cursor: 'pointer',
          textDecoration: 'none',
        },
        '& li': {
          listStyle: 'none',
        },
        '*::-webkit-scrollbar': {
          backgroundColor: theme.palette.action.hover,
          height: theme.spacing(2),
          width: theme.spacing(2),
        },
        '*::-webkit-scrollbar-track': {
          backgroundClip: 'padding-box',
          border: '3px solid transparent',
          borderRadius: 8,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundClip: 'padding-box',
          backgroundColor: theme.palette.action.disabled,
          border: '3px solid transparent',
          borderRadius: 12,
          minHeight: theme.spacing(3),
          '&:hover': {
            backgroundColor: theme.palette.text.secondary,
          },
        },
        '*::-webkit-scrollbar-button': {
          display: 'none',
        },
      },
      '@global': {
        '#UxtNotificationService-SnackbarStack': {
          bottom: 0,
          display: 'block',
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          position: 'fixed',
          right: 0,
          width: '100%',
          zIndex: theme.zIndex.notificationPanel,
          [theme.breakpoints.up('sm')]: {
            width: 480,
          },
        },
        '*::-webkit-scrollbar': {
          width: theme.spacing(1),
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.action.hover,
          borderRadius: theme.shape.borderRadius * 2,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.text.secondary,
          borderRadius: theme.shape.borderRadius * 2,
        },
      },
    }),
  {
    name: 'UxtGlobalStyles',
  },
);

export interface ScopedStylesProps {
  children: React.ReactNode;
  classes?: object;
}

const ScopedStyles = function ScopedStyles(props: ScopedStylesProps) {
  const { children } = props;
  const classes = useScopedStyles(props);

  return <div className={classes.root}>{children}</div>;
};

export default function GlobalStyles(props) {
  const { children } = props;

  if (!children) {
    return <UnscopedStyles />;
  }

  return <ScopedStyles>{children}</ScopedStyles>;
}
