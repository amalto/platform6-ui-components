import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CronInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('CronInput component should exist', t => {
    const value = {
        enabled: true,
        second: '30',
        minute: '10',
        hour: '5',
        dayOfMonth: '3',
        month: 'JAN',
        dayOfWeek: 'MON',
        year: '2017'
    }
    const handleChange = (fieldValue) => {
        // Handle change
    };
    const wrapper = shallow(
        <CronInput name='cron-input-example-exist'
            value={value}
            handleChange={handleChange}
            label='Cron input example'
            invalid={false}
            containerClass='padded'
            forceValidation={true}
            locale='en-US'
        />
    );

    t.true(wrapper.exists());
});

test('CronInput props should be defined', t => {
    const value = {
        enabled: true,
        second: '30',
        minute: '10',
        hour: '5',
        dayOfMonth: '3',
        month: 'JAN',
        dayOfWeek: 'MON',
        year: '2017'
    };
    const handleChange = (fieldValue) => {
        // Handle change
    };
    const spy = sinon.spy(handleChange);
    const wrapper = shallow(
        <CronInput name='cron-input-example-exist'
            value={value}
            handleChange={spy}
            label='Cron input example'
            invalid={false}
            containerClass='padded'
            forceValidation={true}
            locale='en-US'
        />
    );

    t.true(wrapper.hasClass('fieldset padded'));
    t.is(wrapper.childAt(0).childAt(0).text(), 'Cron input example');
    t.is(wrapper.childAt(1).childAt(0).childAt(0).prop('value'), '30');
    t.is(wrapper.childAt(1).childAt(1).childAt(0).prop('value'), '10');
    t.is(wrapper.childAt(1).childAt(2).childAt(0).prop('value'), '5');
    t.is(wrapper.childAt(1).childAt(3).childAt(0).prop('value'), '3');
    t.is(wrapper.childAt(1).childAt(4).childAt(0).prop('value'), 'JAN');
    t.is(wrapper.childAt(1).childAt(5).childAt(0).prop('value'), 'MON');
    t.is(wrapper.childAt(1).childAt(6).childAt(0).prop('value'), '2017');
    t.true(wrapper.childAt(1).childAt(6).childAt(0).prop('handleFieldChange') !== undefined);
});
