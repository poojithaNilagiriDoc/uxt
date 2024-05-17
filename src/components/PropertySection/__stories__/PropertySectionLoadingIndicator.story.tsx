import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import PropertySection from '../index';
import { Item } from '../index';
import makeStyles from '../../_helpers/makeStyles';
import { UxtTheme } from '../../../themes/UxtTheme';
import PushPanel from '../../PushPanel';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        background: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'row-reverse',
      },
      pushPanel: {
        height: '100%',
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
      },
    }),
  {
    name: 'UxtPropertySectionLoadingIndicatorStory',
  },
);

export default function PropertySectionLoadingIndicator() {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <PushPanel
        className={classes.pushPanel}
        isOpen={true}
        isOnRight={true}
        width={400}
      >
        <PropertySection
          data={{
            'First Name': 'Chuck',
            'Last Name': 'Testa',
            Occupation: 'Taxidermist',
          }}
          isCollapsible={true}
          isPropertyLoading={(item: Item) => {
            return item.name === 'Occupation';
          }}
          name="Personal Info"
        />
        <PropertySection
          data={{
            'First Name': 'Ben',
            'Last Name': 'Dover',
            Occupation: 'Dentist',
          }}
          isCollapsible={true}
          isLoading={true}
          name="Personal Info"
        />
      </PushPanel>
    </div>
  );
}
