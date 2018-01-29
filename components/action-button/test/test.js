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

test.beforeEach('should component exist', t => {
    const wrapper = shallow(<ActionButton />);

    t.true(wrapper.exists());
});

test('should have class name .action-icon-button .disabled', t => {
    const wrapper = shallow(<ActionButton disabled={true} btnClass='btn btn-trans btn-info' />);

    t.true(wrapper.hasClass('action-icon-button'));
    t.true(wrapper.hasClass('disabled'));
    t.true(wrapper.hasClass('btn btn-trans btn-info'));
});

test('children should have classname .fa .fa-info .info-color', t => {
    const wrapper = shallow(<ActionButton iconClass='fa-info' colorClass='info-color' />);

    t.is(wrapper.children('span').length, 1);
    t.true(wrapper.children('span').hasClass('fa fa-info'));
    t.true(wrapper.children('span').hasClass('info-color'));
});

test('should display a tooltip', t => {
    const wrapper = shallow(<ActionButton tooltipText={'Hello world'} />);

    /**
     * Check props data-original-title because it's the wrapper props associated to tooltipText
     */
    t.deepEqual(wrapper.prop('data-original-title'), 'Hello world');
    t.notDeepEqual(wrapper.prop('data-original-title'), 'Goodbye world');
});

test('should trigger clickAction', t => {
    let count = 0;
    const clickAction = e => {
        // Do something here
        count += 1;
    };
    const wrapper = shallow(<ActionButton clickAction={clickAction} />);

    wrapper.simulate('click');
    t.is(count, 1);
    t.not(count, 0);
})