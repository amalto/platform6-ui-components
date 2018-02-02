import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import SelectInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('SelectInput component should exist', t => {
    const ExistSelectInput = reduxForm({
        form: 'form-select-input-example',
        enableReinitialize: true
    })(SelectInput);
    const wrapper = shallow(<ExistSelectInput />);

    t.true(wrapper.exists());
});

test('SelectInput props should be defined', t => {
    const ExampleSelectInput = reduxForm({
        form: 'form-select-input-example',
        enableReinitialize: true
    })(SelectInput);
    const options = [
        { value: 'first', label: 'first', disabled: false },
        { value: 'second', label: 'second', disabled: true },
        { value: 'third', label: 'third', disabled: false }
    ];
    const wrapper = shallow(
        <ExampleSelectInput name='select-input-example'
            label='SelectInput example'
            options={options}
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            hideEmptyOption={true}
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-select-input-example');
    t.is(wrapper.prop('name'), 'select-input-example');
    t.is(wrapper.prop('label'), 'SelectInput example');
    t.deepEqual(wrapper.prop('options'), options);
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('hideEmptyOption'), true);
    t.is(wrapper.prop('collapseErrorSpace'), true);
});