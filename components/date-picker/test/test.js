import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import {
    shallow,
    configure
} from 'enzyme';

import DatePicker from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('DatePicker component should exist', t => {
    const wrapper = shallow(<DatePicker />);

    t.true(wrapper.exists());
});

/** All date cant't be tested because it's handled by Pikaday module */
test('component\'s props should be assigned', t => {
    const handleDateChangeEvent = () => {
        console.info('handleDateChangeEvent triggered');
    }
    const handleDateChange = () => {
        console.info('handleDateChange triggered');
    }
    const spyDateChangeEvent = sinon.spy(handleDateChangeEvent);
    const spyDateChange = sinon.spy(handleDateChange);
    const wrapper = shallow(
        <DatePicker name='test-datepicker-name'
            defaultValue='2017-30-01'
            handleDateChangeEvent={spyDateChangeEvent}
            handleDateChange={spyDateChange}
            minDate='2016-30-12'
            minMax='2017-30-02'
            mandatory={true}
            label='test-datepicker-label'
            help='datepicker'
            containerClass='padded'
        />
    );

    // parent
    t.true(wrapper.hasClass('padded form-group mandatory'));

    // label
    t.true(wrapper.childAt(0).childAt(0).exists());
    t.is(wrapper.childAt(0).childAt(0).text(), 'test-datepicker-label');

    // help
    t.true(wrapper.childAt(0).childAt(1).exists());
    t.is(wrapper.childAt(0).childAt(1).prop('text'), 'datepicker');

    // input
    t.true(wrapper.childAt(1).childAt(0).hasClass('form-control datepicker'));
    t.true(wrapper.childAt(1).childAt(0).prop('readOnly'));
    t.is(wrapper.childAt(1).childAt(0).prop('name'), 'test-datepicker-name');

    // clear button
    t.is(wrapper.childAt(1).childAt(1).children().prop('disabled'), true);

    // trigger button onclick event
    wrapper.childAt(1).childAt(1).children().props().onClick();
    t.true(spyDateChangeEvent.called);
    t.true(spyDateChange.called);
});