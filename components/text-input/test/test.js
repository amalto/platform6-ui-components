import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import TextInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('TextInput component should exist', t => {
    const ExistTextInput = reduxForm({
        form: 'form-text-input-example',
        enableReinitialize: true
    })(TextInput);
    const wrapper = shallow(<ExistTextInput />);

    t.true(wrapper.exists());
});

test('TextInput props should be defined', t => {
    const ExampleTextInput = reduxForm({
        form: 'form-text-input-example',
        enableReinitialize: true
    })(TextInput);
    const wrapper = shallow(
        <ExampleTextInput name='text-input-example'
            label='TextInput example'
            placeholder='TextInput placeholder'
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            type='text'
            autofocus={true}
            randomGenerator={false}
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-text-input-example');
    t.is(wrapper.prop('name'), 'text-input-example');
    t.is(wrapper.prop('label'), 'TextInput example');
    t.is(wrapper.prop('placeholder'), 'TextInput placeholder');
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('type'), 'text');
    t.is(wrapper.prop('autofocus'), true);
    t.is(wrapper.prop('randomGenerator'), true);
    t.is(wrapper.prop('collapseErrorSpace'), true);
});