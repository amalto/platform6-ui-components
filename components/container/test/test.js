import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import { unloadTooltips, loadTooltips } from '@amalto/helpers'
import Container from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('Container component should exist', t => {
    const wrapper = shallow(<Container />);

    t.true(wrapper.exists());
});

test('Check props', t => {
    const wrapper = shallow(
        <Container mainCss='container'
            mainStyle={{ color: '#000' }}
            backgroundColor='#fff'
            height={300}>
            <span>Container</span>
        </Container>
    );

    t.true(wrapper.hasClass('container'));
    t.is(wrapper.prop('style').color, '#000');
    t.is(wrapper.prop('style').backgroundColor, '#fff');
    t.is(wrapper.prop('style').height, 300);
    t.is(wrapper.childAt(0).text(), 'Container');
});