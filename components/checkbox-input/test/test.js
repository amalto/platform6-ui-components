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

    // Props
    t.is(wrapper.prop('form'), 'form-checkbox-input-example');
    t.is(wrapper.prop('name'), 'checkbox-input-example');
    t.is(wrapper.prop('label'), 'CheckboxInput example');
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('inputClass'), 'text-large');
    t.is(wrapper.prop('collapseErrorSpace'), true);

    const wrapperTest = shallow(<CheckboxInput
        name='checkbox-input-example'
        label='CheckboxInput example'
        disabled={false}
        help='Helper text'
        containerClass='padded'
        inputClass='text-large'
        collapseErrorSpace={true}
    />);

    const component = shallow(wrapperTest.prop('component')({ input: { name: 'checkbox-input-example', value: 'ExistCheckboxInput' }, meta: { error: 'error', touched: true } }));

    // Classes
    t.true(component.hasClass('form-group'));
    t.true(component.hasClass('padded'));

    t.true(component.childAt(0).hasClass('form-checkbox-wrapper'));
    t.true(component.childAt(0).hasClass('text-large'));

    // Input
    t.true(component.childAt(0).childAt(0).hasClass('form-checkbox'));
    t.is(component.childAt(0).childAt(0).prop('type'), 'checkbox');
    t.is(component.childAt(0).childAt(0).prop('name'), 'checkbox-input-example');
    t.not(component.childAt(0).childAt(0).prop('disabled'));
    t.true(!!component.childAt(0).childAt(0).prop('checked'));

    t.true(component.childAt(0).childAt(1).hasClass('form-checkbox-label'));
    t.is(component.childAt(0).childAt(1).text(), 'CheckboxInput example');

    t.is(component.childAt(0).childAt(2).prop('text'), 'Helper text');
    t.is(component.childAt(0).childAt(2).prop('containerClass'), 'pos-absolute');

    // Error message
    t.true(component.childAt(1).hasClass('validation-error-message'));
    t.is(component.childAt(1).text(), 'error');
});