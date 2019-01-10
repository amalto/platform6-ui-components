import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Signature from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

// test.beforeEach('Signature should component exist', t => {
//     const wrapper = shallow(<Signature />);

//     t.true(wrapper.exists());
// });

test.skip('Waiting for component to be finished.', t => {
    t.pass();
});

// test('should have the style applied', t => {
//     const wrapper = shallow(<Signature

//     />);

//     t.true(wrapper.hasClass('spinner'));
//     t.is(wrapper.props().style.top, 10);
//     t.is(wrapper.props().style.bottom, '5px');
//     t.is(wrapper.props().style.right, 20);
//     t.is(wrapper.props().style.left, '15px');
// });