import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import TextareaInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('TextareaInput component should exist', t => {
    const ExistTextareaInput = reduxForm({
        form: 'form-textarea-input-example',
        enableReinitialize: true
    })(TextareaInput);
    const wrapper = shallow(<ExistTextareaInput />);

    t.true(wrapper.exists());
});

test('TextareaInput props should be defined', t => {
    const ExampleTextareaInput = reduxForm({
        form: 'form-textarea-input-example',
        enableReinitialize: true
    })(TextareaInput);
    const wrapper = shallow(
        <ExampleTextareaInput name='textarea-input-example'
            label='TextareaInput example'
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-textarea-input-example');
    t.is(wrapper.prop('name'), 'textarea-input-example');
    t.is(wrapper.prop('label'), 'TextareaInput example');
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);
});