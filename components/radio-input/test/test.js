import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import RadioInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('RadioInput component should exist', t => {
    const ExistRadioInput = reduxForm({
        form: 'form-radio-input-example',
        enableReinitialize: true
    })(RadioInput);
    const wrapper = shallow(<ExistRadioInput />);

    t.true(wrapper.exists());
});

test('RadioInput props should be defined', t => {
    const ExampleRadioInput = reduxForm({
        form: 'form-radio-input-example',
        enableReinitialize: true
    })(RadioInput);
    const options = [
        { value: 'first', label: 'first' },
        { value: 'second', label: 'second' }
    ];
    const wrapper = shallow(
        <ExampleRadioInput name='radio-input-example'
            label='RadioInput example'
            options={options}
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-radio-input-example');
    t.is(wrapper.prop('name'), 'radio-input-example');
    t.is(wrapper.prop('label'), 'RadioInput example');
    t.deepEqual(wrapper.prop('options'), options);
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);
});