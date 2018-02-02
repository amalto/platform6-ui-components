import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import SwitchInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('SwitchInput component should exist', t => {
    const ExistSwitchInput = reduxForm({
        form: 'form-switch-input-example',
        enableReinitialize: true
    })(SwitchInput);
    const wrapper = shallow(<ExistSwitchInput />);

    t.true(wrapper.exists());
});

test('SwitchInput props should be defined', t => {
    const ExampleSwitchInput = reduxForm({
        form: 'form-switch-input-example',
        enableReinitialize: true
    })(SwitchInput);
    const wrapper = shallow(
        <ExampleSwitchInput name='switch-input-example'
            label='SwitchInput example'
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            alignLeft={false}
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-switch-input-example');
    t.is(wrapper.prop('name'), 'switch-input-example');
    t.is(wrapper.prop('label'), 'SwitchInput example');
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('alignLeft'), false);
    t.is(wrapper.prop('collapseErrorSpace'), true);
});