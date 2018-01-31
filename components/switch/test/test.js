import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import * as sinon from 'sinon';

import Switch from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('Switch component should exist', t => {
    const wrapper = shallow(<Switch />);

    t.true(wrapper.exists());
});

test('should work will all props', t => {
    const changeHandler = (value, name) => {
        console.warn('changeHandler method as been called');
    };
    const spy = sinon.spy(changeHandler);
    const wrapper = shallow(
        <Switch id='id-test-swipe-component'
            value={true}
            cssClass='padded'
            alignLeft={false}
            name='name-test-swipe-component'
            changeHandler={spy}
        />
    );

    t.true(wrapper.hasClass('padded'));
    t.true(wrapper.children().hasClass('onoffswitch'));

    // check input
    t.is(wrapper.children().childAt(0).prop('id'), 'id-test-swipe-component');
    t.is(wrapper.children().childAt(0).prop('checked'), true);
    t.is(wrapper.children().childAt(0).prop('name'), 'name-test-swipe-component');

    // triggering onchange event on input
    wrapper.children().childAt(0).props().onChange({ target: { checked: true } });
    t.true(spy.called);
});