import classnames from 'classnames';
import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ContentSwitcher from '../_internal/ContentSwitcher';
import Button from '../Button';
import Toolbar from '../Toolbar';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      },
      content: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      },
      footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      footerItems: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: (props: WizardProps) =>
          props.variant === 'arrow' ? 'flex-end' : 'space-around',
      },
      cancelButton: {
        width: 108,
        marginRight: theme.spacing(1),
      },
      previousButton: {
        width: 108,
        marginRight: theme.spacing(1),
      },
      nextButton: {
        width: 108,
      },
      finishButton: {
        width: 108,
      },
      stepIndicator: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
      },
    }),
  { name: 'UxtWizard' },
);

export type WizardVariant = 'arrow' | 'default';
export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  finishButtonText?: string;
  isNextEnabled?: boolean;
  nextButtonText?: string;
  cancelButtonText?: string;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onFinish?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  ofText?: string;
  onStepChange?: (nextStepId: string) => void;
  previousButtonText?: string;
  step?: string;
  stepText?: string;
  showCancelButton?: boolean | (() => boolean);
  variant?: WizardVariant;
}

function Wizard(props: WizardProps) {
  const {
    children = [],
    className,
    classes: classesProp,
    finishButtonText = 'Finish',
    isNextEnabled,
    nextButtonText = 'Next',
    cancelButtonText = 'Cancel',
    onCancel,
    onFinish,
    ofText = 'of',
    onStepChange,
    previousButtonText = 'Previous',
    step,
    stepText = 'Step',
    showCancelButton = false,
    variant = 'default',
    ...rest
  } = props;
  const classes = useStyles(props);

  const contentMap = React.useMemo((): { [key: string]: React.ReactNode } => {
    const childArray = React.Children.toArray(children);
    if (!(childArray instanceof Array)) return {};

    return (childArray as Array<React.ReactElement<any>>).reduce(
      (
        acc: { [key: string]: React.ReactNode },
        cur: React.ReactElement<any>,
      ) => ({
        ...acc,
        [cur.props.stepId]: cur.props.children,
      }),
      {},
    );
  }, [children]);

  const stepObjects = React.useMemo(
    () =>
      React.Children.map(
        children,
        (child: React.ReactElement<any>) => child.props,
      ),
    [children],
  );

  const currentStepIndex = React.useMemo(
    () =>
      findIndex({ stepId: step }, stepObjects) !== -1
        ? findIndex({ stepId: step }, stepObjects)
        : 0,
    [step, stepObjects],
  );

  const fallbackContent = React.useMemo(
    () => getOr(null, '[0].props.children', children),
    [children],
  );

  const isNextButtonDisabled = React.useMemo(() => {
    if (!isNil(isNextEnabled)) {
      return !isNextEnabled;
    }

    const stepObject = find({ stepId: step }, stepObjects);

    if (!isNil(stepObject.isNextEnabled)) {
      return !stepObject.isNextEnabled;
    }

    return false;
  }, [isNextEnabled, step, stepObjects]);

  const handleNextButtonClick = React.useCallback(
    function handleNextButtonClick() {
      if (currentStepIndex + 1 === stepObjects.length) return;

      onStepChange(stepObjects[currentStepIndex + 1].stepId);
    },
    [currentStepIndex, onStepChange, stepObjects],
  );

  const handlePreviousButtonClick = React.useCallback(
    function handlePreviousButtonClick() {
      if (currentStepIndex === 0) return;

      onStepChange(stepObjects[currentStepIndex - 1].stepId);
    },
    [currentStepIndex, onStepChange, stepObjects],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <ContentSwitcher
        className={classes.content}
        contentKey={step}
        contentMap={contentMap}
        fallbackContent={fallbackContent}
      />
      <Toolbar
        className={classes.footer}
        classes={{ items: classes.footerItems }}
      >
        {showIf(showCancelButton)(
          <Button className={classes.cancelButton} onClick={onCancel}>
            {cancelButtonText}
          </Button>,
        )}
        <Button
          className={classes.previousButton}
          onClick={handlePreviousButtonClick}
          style={{ display: currentStepIndex === 0 ? 'none' : 'block' }}
        >
          {previousButtonText}
        </Button>
        {hideIf(variant === 'arrow')(
          <div className={classes.stepIndicator}>
            {stepText}
            <span
              dangerouslySetInnerHTML={{
                __html: `&nbsp;${currentStepIndex + 1}&nbsp;`,
              }}
            />
            {ofText}
            <span
              dangerouslySetInnerHTML={{
                __html: `&nbsp;${stepObjects.length}`,
              }}
            />
          </div>,
        )}
        {hideIf(currentStepIndex + 1 === stepObjects.length)(
          <Button
            className={classes.nextButton}
            disabled={isNextButtonDisabled}
            onClick={handleNextButtonClick}
          >
            {nextButtonText}
          </Button>,
        )}
        {showIf(currentStepIndex + 1 === stepObjects.length)(
          <Button
            appearance="contained"
            className={classes.finishButton}
            disabled={isNextButtonDisabled}
            onClick={onFinish}
          >
            {finishButtonText}
          </Button>,
        )}
      </Toolbar>
    </div>
  );
}

export default React.memo(Wizard);
