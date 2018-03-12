import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Spinner from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('Spinner should component exist', t => {
    const wrapper = shallow(<Spinner />);

    t.true(wrapper.exists());
});

test('should have the style applied', t => {
    const wrapper = shallow(<Spinner
        top={10}
        bottom='5px'
        right={20}
        left='15px'
        size={30}
    />);

    t.true(wrapper.hasClass('spinner'));
    t.is(wrapper.props().style.top, 10);
    t.is(wrapper.props().style.bottom, '5px');
    t.is(wrapper.props().style.right, 20);
    t.is(wrapper.props().style.left, '15px');
});