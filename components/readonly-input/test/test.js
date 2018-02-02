import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import ReadOnlyInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('ReadOnlyInput component should exist', t => {
    const ExistReadOnlyInput = reduxForm({
        form: 'form-readonly-input-example',
        enableReinitialize: true
    })(ReadOnlyInput);
    const wrapper = shallow(<ExistReadOnlyInput />);

    t.true(wrapper.exists());
});

test('ReadOnlyInput props should be defined', t => {
    const ExampleReadOnlyInput = reduxForm({
        form: 'form-readonly-input-example',
        enableReinitialize: true
    })(ReadOnlyInput);
    const wrapper = shallow(
        <ExampleReadOnlyInput name='readonly-input-example'
            label='ReadOnlyInput example'
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-readonly-input-example');
    t.is(wrapper.prop('name'), 'readonly-input-example');
    t.is(wrapper.prop('label'), 'ReadOnlyInput example');
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);
});