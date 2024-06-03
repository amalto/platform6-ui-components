import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import ActionButton from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('ActionButton component should exist', t => {
    const wrapper = shallow(<ActionButton />);

    t.true(wrapper.exists());
});

test('should have class name .action-icon-button .disabled', t => {
    const wrapper = shallow(<ActionButton disabled={true} btnClass='btn btn-trans btn-info' />);

    t.true(wrapper.hasClass('action-icon-button'));
    t.true(wrapper.hasClass('disabled'));
    t.true(wrapper.hasClass('btn btn-trans btn-info'));
});

test('children should have classname .fas .fa-info .info-color', t => {
    const wrapper = shallow(<ActionButton iconClass='fas fa-info' colorClass='info-color' />);

    t.is(wrapper.children('span').length, 1);
    t.true(wrapper.children('span').hasClass('fas fa-info'));
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
    const clickAction = e => { console.info('clickAction called') };
    const spy = sinon.spy(clickAction);
    const wrapper = shallow(<ActionButton clickAction={spy} />);

    wrapper.simulate('click');
    t.true(spy.called);
})