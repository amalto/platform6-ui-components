import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import TimePicker from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('TimePicker component should exist', t => {
    const wrapper = shallow(
        <TimePicker name='test-timepicker-exist'
            value='10:10'
            handleFieldChange={() => { }}
        />
    );

    t.true(wrapper.exists());
});

test('TimePicker props should be defined', t => {
    const handleFieldChange = (fieldValue, fieldName) => {
        console.info('handleFieldChange triggered');
    };
    const spy = sinon.spy(handleFieldChange);
    const wrapper = shallow(
        <TimePicker name='test-timepicker'
            value='10:10'
            handleFieldChange={spy}
            disabled={false}
            label='timepicker'
            help='timepicker help'
            minutesInterval={10}
            minHour={0}
            maxHour={12}
            containerClass='padded'
            mandatory={true}
        />
    );

    wrapper.childAt(1).childAt(0).simulate('change', { target: { value: '' } });
    t.true(wrapper.hasClass('form-group padded mandatory'));
    t.is(wrapper.childAt(0).childAt(0).text(), 'timepicker');
    t.is(wrapper.childAt(0).childAt(1).prop('text'), 'timepicker help');
    t.is(wrapper.childAt(2).prop('name'), 'test-timepicker');
    t.is(wrapper.childAt(2).prop('value'), '10:10');
    t.true(spy.called);
});