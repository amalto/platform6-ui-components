import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import ValidatedInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('ValidatedInput component should exist', t => {
    const wrapper = shallow(
        <ValidatedInput name='test-validated-input-exist'
            value='10:10'
            handleFieldChange={() => { }}
        />
    );

    t.true(wrapper.exists());
});

test('ValidatedInput props should be define', t => {
    const handleFieldChange = (fieldValue, fieldName, isInvalid) => {
        console.info('handleFieldChange triggered');
    };
    const validate = (fieldValue) => {
        console.info('validate triggered');
        return true;
    };
    const spyFieldOnChange = sinon.spy(handleFieldChange);
    const spyValidate = sinon.spy(validate);
    const wrapper = shallow(
        <ValidatedInput name='test-validated-input-name'
            value='this is a test'
            handleFieldChange={spyFieldOnChange}
            regex={/test/g}
            validate={spyValidate}
            errorMessage='error'
            disabled={false}
            mandatory={true}
            label='test-validated-input-label'
            validateOnLoad={true}
            formSubmitted={true}
            placeholder='validated-input placeholder'
            autoComplete={true}
            help='validated-input help'
            containerClass='padded'
            inputClass='text-small'
        />
    );

    wrapper.childAt(1).simulate('change', { target: { value: 'test' } });

    // input is invalid because the spy doesn't return true
    t.true(wrapper.hasClass('form-group padded invalid mandatory'));
    t.is(wrapper.childAt(0).childAt(0).text(), 'test-validated-input-label');
    t.is(wrapper.childAt(0).childAt(1).prop('text'), 'validated-input help');
    t.true(wrapper.childAt(1).hasClass('text-small'));
    t.is(wrapper.childAt(1).prop('defaultValue'), 'this is a test');
    t.not(wrapper.childAt(1).prop('defaultValue'), 'test');
    t.is(wrapper.childAt(1).prop('placeholder'), 'validated-input placeholder');
    t.not(wrapper.childAt(1).prop('placeholder'), 'placeholder');
    t.is(wrapper.childAt(1).prop('autoComplete'), true);
    t.not(wrapper.childAt(1).prop('autoComplete'), false);
    t.is(wrapper.childAt(1).prop('disabled'), false);
    t.not(wrapper.childAt(1).prop('disabled'), true);
});