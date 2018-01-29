import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import { unloadTooltips, loadTooltips } from '@amalto/helpers'
import ActionButton from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test('should have .action-icon-button class name', t => {
    const wrapper = shallow(<ActionButton />);

    t.true(wrapper.hasClass('action-icon-button'));
});

test('children should have classname .fa .fa-info', t => {
    const wrapper = shallow(<ActionButton iconClass='fa-info' />);

    t.is(wrapper.children('span').length, 1);
    t.true(wrapper.children('span').hasClass('fa fa-info'));
});