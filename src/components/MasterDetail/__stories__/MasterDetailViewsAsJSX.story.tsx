import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Shell from '../../Shell';
import MasterDetail, { MasterDetailProps } from '../index';
import useTheme from '../../_helpers/useTheme';
import type { UxtTheme } from '../../../themes/UxtTheme';
import customViews from './views';

interface ViewAProps extends MasterDetailProps {
  selectedItem?: string | undefined;
}

const ViewSelected = function (props: ViewAProps) {
  const {
    selectedItem,
    currentViewName,
    onCurrentViewNameChange,
    isScreenWide,
    views,
    ...rest
  } = props;
  return <div {...rest}>Sample View AA {selectedItem}</div>;
};

export default function MasterDetailViewsAsJSX() {
  const [currentViewName, setCurrentViewNameChange] =
    React.useState<string>('');

  const theme = useTheme() as UxtTheme;

  const isScreenWide = useMediaQuery({
    minWidth: theme.breakpoints.values['md'],
  });

  const views = React.useMemo(
    () => ({
      'View AA': <ViewSelected selectedItem={currentViewName}></ViewSelected>,
      'View BB': <div>View BB Sample</div>,
      'View CC': 'Hello World',
      ...customViews,
    }),
    [currentViewName, customViews],
  );

  return (
    <Shell>
      <MasterDetail
        currentViewName={currentViewName}
        isScreenWide={isScreenWide}
        onCurrentViewNameChange={setCurrentViewNameChange}
        views={views}
      />
    </Shell>
  );
}
