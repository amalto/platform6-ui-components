import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import SelectTextInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('SelectTextInput component should exist', t => {
    const ExistSelectTextInput = reduxForm({
        form: 'form-select-text-input-example',
        enableReinitialize: true
    })(SelectTextInput);
    const wrapper = shallow(<ExistSelectTextInput />);

    t.true(wrapper.exists());
});

test('SelectTextInput props should be defined', t => {
    const ExampleSelectTextInput = reduxForm({
        form: 'form-select-text-input-example',
        enableReinitialize: true
    })(SelectTextInput);
    const wrapper = shallow(
        <ExampleSelectTextInput name='select-text-input-example'
            label='SelectTextInput example'
            placeholder='SelectTextInput placeholder'
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            type='text'
            autofocus={true}
            randomGenerator={true}
            collapseErrorSpace={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-select-text-input-example');
    t.is(wrapper.prop('name'), 'select-text-input-example');
    t.is(wrapper.prop('label'), 'SelectTextInput example');
    t.is(wrapper.prop('placeholder'), 'SelectTextInput placeholder');
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('type'), 'text');
    t.is(wrapper.prop('autofocus'), true);
    t.is(wrapper.prop('randomGenerator'), true);
    t.is(wrapper.prop('collapseErrorSpace'), true);
});