import React from 'react';
import find from 'lodash/fp/find';
import uniq from 'lodash/fp/uniq';
import createStyles from '@material-ui/core/styles/createStyles';
import closeSvg from 'uxt-graphics/icons/close';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';
import DropdownList from '../../DropdownList';
import IconButton from '../../IconButton';
import Input from '../../Input';
import Modal from '../../Modal';
import SimpleProperty from '../../SimpleProperty';
import Toolbar from '../../Toolbar';
import Wizard from '..';
import WizardStep from '../../WizardStep';
import WizardStepList from '../../WizardStepList';
import DialogService from '../../../services/DialogService';
import NotificationService from '../../../services/NotificationService';
import { UxtTheme } from '../../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      advancedRoot: {
        padding: theme.spacing(2),
      },
      basicsRoot: {
        padding: theme.spacing(2),
      },
      input: {
        '& + &': {
          marginTop: theme.spacing(2),
        },
      },
      summaryRoot: {
        padding: theme.spacing(2),
      },
      header: {
        ...theme.typography.h6,
        marginBottom: theme.spacing(2),
      },
      root: {
        padding: theme.spacing(2),
      },
      title: {
        ...theme.typography.h6,
      },
      closeButton: {
        marginLeft: 'auto',
      },
      content: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
          minHeight: (theme.breakpoints.values.sm / 4) * 3,
          minWidth: theme.breakpoints.values.sm,
        },
      },
      wizard: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      },
    }),
  {
    name: 'UxtStorybookWizardWithStepList',
  },
);

const initialState = {
  activeStepId: 'basics',
  category: 'Construction',
  completedStepIds: [],
  isModalOpen: false,
  isNameTouched: false,
  isVisibilityTouched: false,
  name: '',
  visibility: undefined,
};

interface AdvancedProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Record<string, unknown>;
  isVisibilityInvalid?: boolean;
  onIsVisibilityTouchedChange?: (visibility: boolean) => void;
  onVisibilityChange?: (value: 'Public' | 'Private' | undefined) => void;
  visibility?: 'Public' | 'Private' | undefined;
  isVisibilityTouched: boolean;
}

interface SecondAdvancedProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Record<string, unknown>;
  selectedSite?: string;
  onSiteChange?: (val: string) => void;
}

interface BasicsProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string | undefined;
  classes?: Record<string, unknown>;
  isNameInvalid: boolean;
  onIsNameTouchedChange: (v: boolean) => void;
  onCategoryChange: (v: string | undefined) => void;
  onNameChange: (name: string | undefined) => void;
  name: string | undefined;
}

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string | undefined;
  classes?: Record<string, unknown>;
  name: string | undefined;
  visibility: 'Public' | 'Private' | undefined;
}

interface WizardWithArrowStepListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Record<string, unknown>;
}

const Advanced = React.memo((props: AdvancedProps) => {
  const {
    classes: classesProp,
    isVisibilityInvalid,
    onIsVisibilityTouchedChange,
    onVisibilityChange,
    visibility,
    ...rest
  } = props;
  const classes = useStyles(props);

  const getHelperText = React.useCallback(() => {
    if (visibility === 'Private') {
      return 'Private projects are not available at this time';
    }
  }, [visibility]);

  return (
    <div className={classes.advancedRoot} {...rest}>
      <DropdownList
        helperText={getHelperText()}
        isInvalid={isVisibilityInvalid}
        items={['Public', 'Private']}
        label="Visibility*"
        onBlur={() => onIsVisibilityTouchedChange?.(true)}
        onValueChange={onVisibilityChange}
        value={visibility}
      />
    </div>
  );
});

const sites = [
  { text: 'Site 1', value: 'Site 1' },
  { text: 'Site 2', value: 'Site 2' },
  { text: 'Site 3', value: 'Site 3' },
  { text: 'Site 4', value: 'Site 4' },
];

const SecondAdvanced = React.memo((props: SecondAdvancedProps) => {
  const {
    classes: classesProp,
    selectedSite = sites[0].text,
    onSiteChange,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.advancedRoot} {...rest}>
      <DropdownList
        label="Select Site"
        value={selectedSite}
        textAccessor={'text'}
        valueAccessor={'value'}
        items={sites}
        onValueChange={onSiteChange}
      />
    </div>
  );
});

const Basics = React.memo((props: BasicsProps) => {
  const {
    category,
    classes: classesProp,
    isNameInvalid,
    onIsNameTouchedChange,
    onCategoryChange,
    onNameChange,
    name,
    ...rest
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.basicsRoot} {...rest}>
      <Input
        className={classes.input}
        helperText="*Required"
        isInvalid={isNameInvalid}
        label="Name*"
        onBlur={() => onIsNameTouchedChange(true)}
        onValueChange={onNameChange}
        value={name}
      />
      <Input
        className={classes.input}
        label="Category"
        onValueChange={onCategoryChange}
        value={category}
      />
    </div>
  );
});

const Summary = React.memo((props: SummaryProps) => {
  const { category, classes: classesProp, name, visibility = 'Public' } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.summaryRoot}>
      <h1 className={classes.header}>Summary</h1>
      <SimpleProperty name="Name" value={name} />
      <SimpleProperty name="Category" value={category} />
      <SimpleProperty name="Visibility" value={visibility} />
    </div>
  );
});

export default function WizardWithArrowStepList(
  props: WizardWithArrowStepListProps,
) {
  const { classes: classesProp, ...rest } = props;
  const classes = useStyles(props);
  const [activeStepId, setActiveStepId] = React.useState(
    initialState.activeStepId,
  );
  const [category, setCategory] = React.useState(initialState.category);
  const [completedStepIds, setCompletedStepIds] = React.useState(
    initialState.completedStepIds,
  );
  const [isModalOpen, setIsModalOpen] = React.useState(
    initialState.isModalOpen,
  );
  const [selectedSite, setSelectedSite] = React.useState(sites[0].text);
  const [isNameTouched, setIsNameTouched] = React.useState(
    initialState.isNameTouched,
  );
  const [isVisibilityTouched, setIsVisibilityTouched] = React.useState<boolean>(
    initialState.isVisibilityTouched,
  );
  const [name, setName] = React.useState(initialState.name);
  const [visibility, setVisibility] = React.useState(initialState.visibility);

  const getIsNameInvalid = React.useCallback(() => {
    if (!isNameTouched) {
      return false;
    }

    return !name;
  }, [isNameTouched, name]);

  const getIsVisibilityInvalid = React.useCallback(() => {
    if (visibility === 'Private') {
      return true;
    }

    if (!isVisibilityTouched) {
      return false;
    }

    return !visibility;
  }, [isVisibilityTouched, visibility]);

  const invalidStepIds = React.useMemo(
    () => [
      ...(getIsNameInvalid() ? ['basics'] : []),
      ...(getIsVisibilityInvalid() ? ['advanced'] : []),
    ],
    [getIsNameInvalid, getIsVisibilityInvalid],
  );

  const getIsAdvancedEnabled = React.useCallback(() => !!name, [name]);

  const getIsSecondAdvancedEnabled = React.useCallback(
    () => !(visibility === 'Private' || !visibility),
    [visibility],
  );

  const getIsSummaryEnabled = React.useCallback(
    () =>
      getIsSecondAdvancedEnabled() &&
      !(visibility === 'Private' || !visibility),
    [getIsSecondAdvancedEnabled, visibility],
  );

  const handleCategoryChange = React.useCallback(value => {
    setCategory(value);
  }, []);

  const handleCreateButtonClick = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleIsNameTouchedChange = React.useCallback(value => {
    setIsNameTouched(value);
  }, []);

  const handleIsVisibilityTouchedChange = React.useCallback(
    (value: boolean) => {
      setIsVisibilityTouched(value);
    },
    [],
  );

  const handleNameChange = React.useCallback(value => {
    setName(value);
  }, []);

  const handleVisibilityChange = React.useCallback(value => {
    setVisibility(value);
  }, []);

  const steps = React.useMemo(
    () => [
      {
        getIsNextEnabled: getIsAdvancedEnabled,
        stepId: 'basics',
        text: 'Basic Info',
        getContent: () => (
          <Basics
            category={category}
            isNameInvalid={getIsNameInvalid()}
            name={name}
            onCategoryChange={handleCategoryChange}
            onIsNameTouchedChange={handleIsNameTouchedChange}
            onNameChange={handleNameChange}
          />
        ),
      },
      {
        getIsNextEnabled: getIsSecondAdvancedEnabled,
        stepId: 'advanced',
        text: 'Advanced Settings',
        secondaryText: 'Sample Description',
        getContent: () => (
          <Advanced
            isVisibilityInvalid={getIsVisibilityInvalid()}
            isVisibilityTouched={isVisibilityTouched}
            onIsVisibilityTouchedChange={handleIsVisibilityTouchedChange}
            onVisibilityChange={handleVisibilityChange}
            visibility={visibility}
          />
        ),
      },
      {
        getIsNextEnabled: getIsSummaryEnabled,
        stepId: 'secondAdvanced',
        text: 'Second Advanced Settings',
        secondaryText: 'Sample Description',
        getContent: () => (
          <SecondAdvanced
            selectedSite={selectedSite}
            onSiteChange={setSelectedSite}
          />
        ),
      },
      {
        getIsNextEnabled: () => true,
        stepId: 'summary',
        text: 'Summary',
        getContent: () => (
          <Summary category={category} name={name} visibility={visibility} />
        ),
      },
    ],
    [
      category,
      getIsAdvancedEnabled,
      getIsNameInvalid,
      getIsSummaryEnabled,
      getIsVisibilityInvalid,
      handleCategoryChange,
      handleIsNameTouchedChange,
      handleIsVisibilityTouchedChange,
      handleNameChange,
      handleVisibilityChange,
      isVisibilityTouched,
      name,
      visibility,
    ],
  );

  const modalTitle = React.useMemo(
    () =>
      `Create Project - ${
        find(step => step.stepId === activeStepId, steps).text
      }`,
    [activeStepId, steps],
  );

  const handleActiveStepIdChange = React.useCallback(
    id => {
      setCompletedStepIds(
        uniq([
          ...completedStepIds,
          ...(activeStepId === 'basics' && id === 'advanced' ? ['basics'] : []),
          ...(activeStepId === 'advanced' && id === 'secondAdvanced'
            ? ['advanced']
            : []),
          ...(activeStepId === 'secondAdvanced' && id === 'summary'
            ? ['advanced', 'secondAdvanced']
            : []),
        ]),
      );
      setActiveStepId(id);
    },
    [activeStepId, completedStepIds],
  );

  const handleModalCloseButtonClick = React.useCallback(() => {
    DialogService.confirm({
      cancelText: 'Stay',
      message: 'Progress in project creation wizard will be lost.',
      submitText: 'Leave',
      titleText: 'Are you sure you want to leave?',
    }).then(result => {
      if (!result) {
        return;
      }

      NotificationService.info('Canceled project creation.');

      setActiveStepId(initialState.activeStepId);
      setCategory(initialState.category);
      setCompletedStepIds(initialState.completedStepIds);
      setIsModalOpen(initialState.isModalOpen);
      setIsNameTouched(initialState.isNameTouched);
      setIsVisibilityTouched(initialState.isVisibilityTouched);
      setName(initialState.name);
      setVisibility(initialState.visibility);
    });
  }, []);

  const handleWizardFinish = React.useCallback(() => {
    NotificationService.success(`Created project: ${name}!`);

    setActiveStepId(initialState.activeStepId);
    setCategory(initialState.category);
    setCompletedStepIds(initialState.completedStepIds);
    setIsModalOpen(initialState.isModalOpen);
    setIsNameTouched(initialState.isNameTouched);
    setIsVisibilityTouched(initialState.isVisibilityTouched);
    setName(initialState.name);
    setVisibility(initialState.visibility);
  }, [name]);

  return (
    <div className={classes.root} {...rest}>
      <Button onClick={handleCreateButtonClick} text="Create Project" />
      <Modal
        isContentPadded={false}
        isOpen={isModalOpen}
        showActions={false}
        showHeader={false}
      >
        <Toolbar position="top">
          <h1 className={classes.title}>{modalTitle}</h1>
          <IconButton
            className={classes.closeButton}
            iconSvg={closeSvg}
            onClick={handleModalCloseButtonClick}
          />
        </Toolbar>
        <div className={classes.content}>
          <WizardStepList
            activeStepId={activeStepId}
            className={classes.stepList}
            completedStepIds={completedStepIds}
            invalidStepIds={invalidStepIds}
            onStepChange={handleActiveStepIdChange}
            steps={steps}
            variant="arrow"
            stepIconPlacement="right"
            stepLineType="double"
          />
          <Wizard
            className={classes.wizard}
            showCancelButton={true}
            onCancel={handleModalCloseButtonClick}
            onFinish={handleWizardFinish}
            onStepChange={handleActiveStepIdChange}
            step={activeStepId}
            variant="arrow"
          >
            {steps.map(step => (
              <WizardStep
                key={step.stepId}
                isNextEnabled={step.getIsNextEnabled() as unknown as boolean}
                stepId={step.stepId}
              >
                {step.getContent()}
              </WizardStep>
            ))}
          </Wizard>
        </div>
      </Modal>
    </div>
  );
}
