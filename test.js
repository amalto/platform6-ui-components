import test from 'ava';
import React from 'react';
import ActionButton from './components/action-button/build/index.js';
import Adapter from 'enzyme-adapter-react-15'
import { shallow, mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

test('should have .action-icon-button classname', t => {
    const wrapper = shallow(<ActionButton />);
    t.true(wrapper.hasClass('action-icon-button'));
});