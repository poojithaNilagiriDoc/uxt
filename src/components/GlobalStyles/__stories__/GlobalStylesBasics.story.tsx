import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme.d';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) => ({
    root: {
      height: '100vh',
      overflowY: 'auto',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }),
  {},
);

function GlobalStylesBasics(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <h1>This is a Header 1</h1>
      <h2>This is a Header 2</h2>
      <h3>This is a Header 3</h3>
      <h4>This is a Header 4</h4>
      <h5>This is a Header 5</h5>
      <h6>This is a Header 6</h6>
      <p>This is a paragraph</p>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">This is an anchor</a>
      <ul>
        <li>This is an li</li>
        <li>This is another li</li>
      </ul>
    </div>
  );
}

export default GlobalStylesBasics;
