import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import { unloadTooltips, loadTooltips } from '@amalto/helpers'
import Header from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('Header component should exist', t => {
    const wrapper = shallow(<Header />);

    t.true(wrapper.exists());
});

test('Testing props', t => {
    const burgerAction = () => { console.info('burgerAction click action'); }

    const wrapper = shallow(
        <Header disabled={true}
            mainCss='header'
            backgroundColor='#fff'
            height={70}
            imgSrc={'images/logo.png'}
            url='#menu'
            burgerAction={burgerAction}
        />
    );

    // Header
    t.is(wrapper.prop('className'), 'header');
    t.is(wrapper.prop('style').height, 70);
    t.is(wrapper.prop('style').backgroundColor, '#fff');
    t.is(wrapper.prop('style').overflow, 'auto');
    t.is(wrapper.prop('style').position, 'fixed');
    t.is(wrapper.prop('style').zIndex, 200);

    // Brand
    t.is(wrapper.childAt(0).prop('backgroundColor'), '#fff');
    t.is(wrapper.childAt(0).prop('imgSrc'), 'images/logo.png');
    t.is(wrapper.childAt(0).prop('url'), '#menu');

    // Brand
    t.is(wrapper.childAt(1).prop('burgerAction'), burgerAction);
});