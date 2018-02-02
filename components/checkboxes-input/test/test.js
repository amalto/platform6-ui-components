import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CheckboxesInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('CheckboxesInput component should exist', t => {
    const ExistCheckboxesInput = reduxForm({
        form: 'form-checkboxes-input-example',
        enableReinitialize: true
    })(CheckboxesInput);
    const wrapper = shallow(<ExistCheckboxesInput />);

    t.true(wrapper.exists());
});

test('CheckboxesInput props should be defined', t => {
    const ExampleCheckboxesInput = reduxForm({
        form: 'form-checkboxes-input-example',
        enableReinitialize: true
    })(CheckboxesInput);
    const options = [
        { value: 'first', label: 'first' },
        { value: 'second', label: 'second' }
    ];
    const wrapper = shallow(
        <ExampleCheckboxes name='checkboxes-input-example'
            label='CheckboxesInput example'
            options={options}
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-checkboxes-input-example');
    t.is(wrapper.prop('name'), 'checkboxes-input-example');
    t.is(wrapper.prop('label'), 'CheckboxesInput example');
    t.deepEqual(wrapper.prop('options'), options);
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);
});