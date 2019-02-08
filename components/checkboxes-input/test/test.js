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
        <ExampleCheckboxesInput name='checkboxes-input-example'
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

    const wrapperTest = shallow(
        <CheckboxesInput name='checkboxes-input-example'
            label='CheckboxesInput example'
            options={options}
            disabled={false}
            help='Helper text'
            containerClass='padded'
            inputClass='text-large'
            collapseErrorSpace={true}
        />
    )

    const Checkboxes = shallow(
        React.createElement(
            wrapperTest.prop('component'),
            {
                input: {
                    value: 'CheckboxesInput text'
                }, meta: {
                    touched: true,
                    error: 'CheckboxesInput error'
                },
                name: 'checkboxes-input-example',
                label: 'CheckboxesInput example',
                options: options,
                disabled: false,
                help: 'Helper text',
                containerClass: 'padded',
                inputClass: 'text-large',
                collapseErrorSpace: true
            }
        )
    );

    t.true(Checkboxes.hasClass('form-group'));
    t.true(Checkboxes.hasClass('padded'));
    t.true(Checkboxes.hasClass('invalid'));

    // Label & Helper
    t.is(Checkboxes.childAt(0).childAt(0).text(), 'CheckboxesInput example');
    t.is(Checkboxes.childAt(0).childAt(1).prop('text'), 'Helper text');

    // Options
    t.true(Checkboxes.childAt(1).hasClass('fieldset'));
    t.true(Checkboxes.childAt(1).hasClass('invalid'));

    t.true(Checkboxes.childAt(1).childAt(0).hasClass('form-checkbox-wrapper'));
    t.true(Checkboxes.childAt(1).childAt(0).hasClass('text-large'));
    t.true(Checkboxes.childAt(1).childAt(0).childAt(0).hasClass('form-checkbox'));
    t.is(Checkboxes.childAt(1).childAt(0).childAt(0).prop('type'), 'checkbox');
    t.not(Checkboxes.childAt(1).childAt(0).childAt(0).prop('disabled'));
    t.is(Checkboxes.childAt(1).childAt(0).childAt(0).prop('value'), 'first');
    // t.true(Checkboxes.childAt(1).childAt(0).childAt(0).prop('checked'));

    t.true(Checkboxes.childAt(1).childAt(0).childAt(1).hasClass('form-checkbox-label'));
    t.is(Checkboxes.childAt(1).childAt(0).childAt(1).text(), 'first');

    t.is(Checkboxes.childAt(1).childAt(1).childAt(0).prop('value'), 'second');

    t.true(Checkboxes.childAt(1).childAt(1).childAt(1).hasClass('form-checkbox-label'));
    t.is(Checkboxes.childAt(1).childAt(1).childAt(1).text(), 'second');

    // Error message
    t.true(Checkboxes.childAt(2).hasClass('validation-error-message'));
    t.is(Checkboxes.childAt(2).text(), 'CheckboxesInput error');

    t.is(Checkboxes.childAt(3).prop('type'), 'hidden');
    t.is(Checkboxes.childAt(3).prop('value'), 'CheckboxesInput text');
});