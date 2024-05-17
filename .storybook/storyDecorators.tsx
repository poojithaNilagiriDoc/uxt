import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import GlobalStyles from '../src/components/GlobalStyles';
import theme from '../src/themes/light';

export default Story => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Story />
  </ThemeProvider>
);
