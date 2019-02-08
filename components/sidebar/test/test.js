import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Sidebar from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('ActionButton component should exist', t => {
    const wrapper = shallow(<Sidebar />);

    t.true(wrapper.exists());
});

test('should have width of 300 and height of 200', t => {
    const wrapper = shallow(
        <Sidebar mainCss={'sidebar'}
            width={300} height={200}
            backgroundColor='#000' />
    );

    t.true(wrapper.hasClass('sidebar'));
    t.is(wrapper.prop('style').width, 300);
    t.is(wrapper.prop('style').height, 200);
    t.is(wrapper.prop('style').overflow, 'auto');
    t.is(wrapper.prop('style').backgroundColor, '#000');
});