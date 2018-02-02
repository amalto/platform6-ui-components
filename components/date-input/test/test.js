import React from 'react';
import { reduxForm } from 'redux-form';

import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import DateInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('DateInput component should exist', t => {
    const ExistDateInput = reduxForm({
        form: 'form-date-input-test-exist',
        enableReinitialize: true
    })(DateInput);
    const wrapper = shallow(<ExistDateInput name='date-input-exist' />);

    t.true(wrapper.exists());
});

test('DateInput props should be defined', t => {
    const ExampleDateInput = reduxForm({
        form: 'form-date-input-test-example',
        enableReinitialize: true
    })(DateInput);
    const wrapper = shallow(
        <ExampleDateInput name='date-input-test-example'
            label='DateInput example'
            minDate='2016-30-12'
            minMax='2017-30-02'
            mandatory={true}
            help='Helper text'
            containerClass='padded'
        />
    )

    t.is(wrapper.prop('form'), 'form-date-input-test-example');
    t.is(wrapper.prop('name'), 'date-input-test-example');
    t.is(wrapper.prop('label'), 'DateInput example');
    t.is(wrapper.prop('minDate'), '2016-30-12');
    t.is(wrapper.prop('minMax'), '2017-30-02');
    t.is(wrapper.prop('mandatory'), true);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'padded');
});