import React from 'react';
import { mount } from 'enzyme';
import WizardStep from '..';
import Button from '../../Button';

const component = mount(<WizardStep />);

describe('UxtWizardStep', () => {
  it('check render of component', () => {
    expect(component.find(WizardStep).length).toEqual(1);
  });

  it('check for isActive and stepId', () => {
    component.setProps({
      isActive: true,
      stepId: 1,
    });
    component.update();

    expect(component.find(WizardStep).prop('isActive')).toEqual(true);
    expect(component.find(WizardStep).prop('stepId')).toEqual(1);
  });

  it('check for children and isNextEnabled', () => {
    component.setProps({
      children: <Button text="Next" />,
      isNextEnabled: true,
    });
    component.update();

    expect(component.find(WizardStep).prop('isNextEnabled')).toEqual(true);
    expect(component.find(WizardStep).prop('children')).toEqual(
      <Button text="Next" />,
    );
  });
});
