import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import TimeInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('TimeInput component should exist', t => {
    const ExistTimeInput = reduxForm({
        form: 'form-time-input-test-exist',
        enableReinitialize: true
    })(TimeInput);
    const wrapper = shallow(<ExistTimeInput name='time-input-exist' />);

    t.true(wrapper.exists());
});

test('TimeInput props should be defined', t => {
    const today = new Date().toISOString();
    const now = new moment(today).format('HH:mm');
    const min = new moment(today).subtract(1, 'hour').format('HH:mm');
    const max = new moment(today).add(1, 'hour').format('HH:mm');
    const ExampleTimeInput = reduxForm({
        initialValues: now,
        form: 'form-time-input-test-example',
        enableReinitialize: true
    })(TimeInput);
    const wrapper = shallow(
        <ExampleTimeInput name='time-input-test-example'
            label='TimeInput example'
            help='Helper text'
            minutesInterval={10}
            minDate={min}
            minMax={max}
            containerClass='padded'
            mandatory={true}
        />
    )

    t.is(wrapper.prop('form'), 'form-time-input-test-example');
    t.is(wrapper.prop('name'), 'time-input-test-example');
    t.is(wrapper.prop('label'), 'TimeInput example');
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('minutesInterval'), 10);
    t.is(wrapper.prop('minDate'), min);
    t.is(wrapper.prop('minMax'), max);
    t.is(wrapper.prop('containerClass'), 'padded');
    t.is(wrapper.prop('mandatory'), true);
});