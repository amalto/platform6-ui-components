import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import {
    shallow,
    configure
} from 'enzyme';

import ColorPicker from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('Component should exist', t => {
    const wrapper = shallow(<ColorPicker />);

    t.true(wrapper.exists());
});

test('props should be assigned', t => {
    const color = '#FFFFFF';
    const handleColorChange = (color) => {
        console.info('handleColorChange triggered');
    };
    const spy = sinon.spy(handleColorChange);
    const wrapper = shallow(<ColorPicker color={color} handleColorChange={spy} />);
    const mock = { currentTarget: { getAttribute: () => { } } };

    wrapper.children().childAt(0).props().onClick(mock);
    t.true(spy.called);
});