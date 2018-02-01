import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CheckboxInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('CheckboxInput component should exist', t => {
    const ExistCheckboxInput = reduxForm({
        form: 'form-checkbox-input-example',
        enableReinitialize: true
    })(CheckboxInput);
    const wrapper = shallow(<ExistCheckboxInput />);

    t.true(wrapper.exists());
});

test('CheckboxInput props should be defined', t => {
    const ExampleCheckboxInput = reduxForm({
        form: 'form-checkbox-input-example',
        enableReinitialize: true
    })(CheckboxInput);
    const wrapper = shallow(
        <ExampleCheckboxInput name='checkbox-input-example'
            label='CheckboxInput example'
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-checkbox-input-example');
    t.is(wrapper.prop('name'), 'checkbox-input-example');
    t.is(wrapper.prop('label'), 'CheckboxInput example');
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);
});