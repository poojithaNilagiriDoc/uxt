import React from 'react';
import FormDivider from '../../FormDivider';
import PushPanel from '../../PushPanel';
import Toolbar from '../../Toolbar';
import SimpleProperty from '../index';

function Section(props) {
  return (
    <div style={{ paddingLeft: 16, paddingRight: 16 }}>{props.children}</div>
  );
}

function FirstSection() {
  return (
    <Section>
      <FormDivider
        isFirstSection={true}
        style={{ marginLeft: -16, marginRight: -16 }}
        text="First Section"
      />
      <SimpleProperty
        id="some-id"
        name="Property A"
        value="Some Value that is a really long value and would wrap onto multiple lines."
      />
      <div style={{ marginTop: 16 }}>
        <SimpleProperty name="Property B" value="Some Value" />
      </div>
    </Section>
  );
}

function SecondSection() {
  return (
    <Section>
      <FormDivider
        style={{ marginLeft: -16, marginRight: -16 }}
        text="Second Section"
      />
      <SimpleProperty name="Age" value="29" />
      <div style={{ marginTop: 16 }}>
        <SimpleProperty name="Country of Origin" value="England" />
      </div>
      <div style={{ marginTop: 16 }}>
        <SimpleProperty name="Occupation" value="Design Guru" />
      </div>
    </Section>
  );
}

export default function SimplePropertyContext() {
  return (
    <div style={{ backgroundColor: '#eee', flexDirection: 'row' }}>
      <PushPanel
        isOpen={true}
        style={{ borderRight: '1px solid #ccc' }}
        width={320}
      >
        <Toolbar position="top" style={{ backgroundColor: 'white' }}>
          <h1>HxSB Left Panel</h1>
        </Toolbar>
        <FirstSection />
        <SecondSection />
      </PushPanel>
    </div>
  );
}
