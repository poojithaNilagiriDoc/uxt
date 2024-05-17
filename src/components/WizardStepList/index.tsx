import classnames from 'classnames';
import findIndex from 'lodash/fp/findIndex';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import check from 'uxt-graphics/icons/active-work-item';
import error from 'uxt-graphics/icons/error';
import flag from 'uxt-graphics/icons/flag';
import makeStyles from '../_helpers/makeStyles';
import ListItem from '../ListItem';
import type { UxtTheme } from '../../themes/UxtTheme';
import ScrollableContainer from '../ScrollableContainer';
import Orientation from '../constants/orientation';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      item: {},
      icon: {
        marginRight: theme.spacing(1),
      },
      completed: {
        backgroundColor: theme.palette.action.selected,
        outline: `1px inset ${theme.palette.common.white}`,
        marginRight: theme.spacing(0.25),
      },
      invalid: {},
      arrowVariant: {
        display: 'flex',
        flexDirection: 'row',
        flex: '0 0 auto',
        alignItems: 'flex-start',
        justifyContent: 'stretch',
      },
      arrow: {
        display: 'flex',
        flexDirection: (props: WizardStepListProps) =>
          props.stepIconPlacement === 'right' ? 'row-reverse' : 'row',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        flexWrap: 'nowrap',
        minWidth: (props: WizardStepListProps) =>
          `calc(100% / ${props.steps.length} + 20px)`,
        minHeight: theme.spacing(8),
        [`&[data-step-type="first"]`]: {
          paddingLeft: theme.spacing(2),
          clipPath:
            'polygon(0% 0%,calc(100% - 2rem) 0%, 100% 50%, calc(100% - 2rem) 100%, 0% 100%)',
        },
        [`&[data-step-type="middle"]`]: {
          paddingLeft: theme.spacing(6),
          marginLeft: theme.spacing(-4),
          clipPath:
            'polygon(0% 0%, calc(100% - 2rem) 0%, 100% 50%, calc(100% - 2rem) 100%, 0% 100%, calc(2rem) 50%, 0% 0%)',
        },
        [`&[data-step-type="last"]`]: {
          paddingLeft: theme.spacing(6),
          marginLeft: theme.spacing(-4),
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, calc(2rem) 50%, 0% 0%);',
        },
      },
      textComponent: {
        paddingLeft: (props: WizardStepListProps) =>
          props.variant !== 'arrow' ? theme.spacing(0) : theme.spacing(2),
        paddingRight: (props: WizardStepListProps) =>
          props.variant !== 'arrow' ? theme.spacing(0) : theme.spacing(2),
      },
      stepContent: {
        display: 'flex',
        flex: '1 1 auto',
        width: '100%',
        height: '100%',
        flexDirection: (props: WizardStepListProps) =>
          (props.variant !== 'arrow' ? 'column' : 'row') || 'column',
      },
      scrollableContainer: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        flex: `1 1 auto`,
      },
      secondary: {},
      selected: {
        backgroundColor: 'inherit',
      },
    }),
  { name: 'UxtWizardStepList' },
);

export type WizardStepVariant = 'arrow' | 'default';

export interface WizardStepListStep {
  stepId?: string;
  getIsNextEnabled?: () => boolean;
  text?: string;
  secondaryText?: string | undefined;
}

export interface WizardStepListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeStepId?: string;
  className?: string;
  classes?: object;
  completedStepIds: Array<string>;
  invalidStepIds: Array<string>;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  onStepChange: (stepId: string) => void;
  steps?: Array<WizardStepListStep>;
  variant?: WizardStepVariant;
  stepIconPlacement?: 'left' | 'right';
  stepLineType?: 'single' | 'double';
}

function WizardStepList(props: WizardStepListProps) {
  const {
    activeStepId,
    classes: classesProp,
    className,
    completedStepIds = [],
    invalidStepIds = [],
    itemComponent: ItemComponent = ListItem,
    onStepChange,
    steps = [],
    variant = 'default' as const,
    stepIconPlacement = 'left' as const,
    stepLineType = 'single' as const,
    ...rest
  } = props;
  const classes = useStyles(props);

  const refMap = React.useRef<Map<any, HTMLElement>>(
    new Map<any, HTMLElement>(),
  );

  const getItemIconSvgAccessor = React.useCallback(
    function getItemIconSvgAccessor(step) {
      if (includes(step.stepId, invalidStepIds)) {
        return () => error;
      }

      if (includes(step.stepId, completedStepIds)) {
        return () => check;
      }

      if (activeStepId === steps[steps.length - 1].stepId) {
        return () => flag;
      }

      return undefined;
    },
    [completedStepIds, invalidStepIds, steps, activeStepId],
  );

  const getItemIsDisabled = React.useCallback(
    function getItemIsDisabled(step) {
      const stepIndex = findIndex(s => s.stepId === step.stepId, steps);

      if (stepIndex < 1) {
        return false;
      }

      const getIsNextEnabled = getOr(
        () => true,
        `[${stepIndex - 1}].getIsNextEnabled`,
        steps,
      );

      return !getIsNextEnabled();
    },
    [steps],
  );

  const handleItemClick = React.useCallback(
    function handleItemClick(step) {
      if (activeStepId !== '' && activeStepId === step.stepId) return;

      onStepChange(step.stepId);
      refMap.current.get(step.stepId).scrollIntoView();
    },
    [activeStepId, onStepChange],
  );

  const stepContent = React.useMemo(() => {
    return (
      <div className={classes.stepContent}>
        {steps.map((step, index) => {
          return (
            <ItemComponent
              ref={ele => {
                refMap.current.set(step.stepId, ele);
              }}
              classes={{
                icon: classes.icon,
                textComponent: classes.textComponent,
                selected: classes.selected,
              }}
              data-step-type={
                index === 0
                  ? 'first'
                  : index === steps.length - 1
                  ? 'last'
                  : 'middle'
              }
              textComponentClasses={{ secondary: classes.secondary }}
              className={classnames(classes.item, {
                [classes.arrow]: variant === 'arrow',
                [classes.completed]:
                  variant === 'arrow' &&
                  completedStepIds.includes(step.stepId) &&
                  activeStepId !== step.stepId,
                [classes.invalid]:
                  variant === 'arrow' && invalidStepIds.includes(step.stepId),
              })}
              iconSvgAccessor={getItemIconSvgAccessor(step)}
              isDisabled={
                getItemIsDisabled(step) &&
                !completedStepIds.includes(step.stepId)
              }
              isSelected={activeStepId === step.stepId}
              key={index}
              onClick={() => handleItemClick(step)}
              primaryTextAccessor={() => step.text}
              secondaryTextAccessor={() => step.secondaryText}
              type={stepLineType}
            />
          );
        })}
      </div>
    );
  }, [
    activeStepId,
    variant,
    steps,
    stepLineType,
    handleItemClick,
    getItemIconSvgAccessor,
    getItemIsDisabled,
  ]);

  const wrapper =
    variant === 'arrow'
      ? React.createElement(ScrollableContainer, {
          className: classes.scrollableContainer,
          enableScroll: true,
          orientation: Orientation.Horizontal,
          children: stepContent,
        })
      : React.createElement('div', {
          children: stepContent,
        });

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.arrowVariant]: variant === 'arrow' },
        className,
      )}
      {...rest}
    >
      {wrapper}
    </div>
  );
}

export default React.memo(WizardStepList);
