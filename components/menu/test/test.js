import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Menu from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('ActionButton component should exist', t => {
    const wrapper = shallow(<Menu entries={[]} />);

    t.true(wrapper.exists());
});

test('check props', t => {
    const entries = [
        { label: 'Homes', icon: 'fa-fw fa-fw fas fa-home', url: '#menu' },
        { label: 'Reports', icon: 'fa-fw fas fa-chart-area', url: '#menu' },
        { label: 'Frames', icon: 'fa-fw far fa-window-maximize', url: '#menu' },
        { label: 'Counters', icon: 'fa-fw fas fa-tachometer-alt', url: '#menu' },
        { label: 'Scripts', icon: 'fa-fw fas fa-terminal', url: '#menu' },
        { label: 'Administration', icon: 'fa-fw fas fa-cogs', url: '#menu' },
        { label: 'Organizations', icon: 'fa-fw fas fa-sitemap', url: '#menu' }
    ];

    const wrapper = shallow(
        <Menu title={'Menu'}
            entries={entries}
            hideLabel={false}
            selectedEntry={'Home'}
            mainCss={'menu'}
            mainColor={'#000'}
            subColor={'#fff'}
            textColor={'#000'}
            hoverTextColor={'#fff'}
            width={300} height={200}
            backgroundColor='#000' />
    );

    t.is(wrapper.childAt(0).prop('style').color, '#000');
    t.is(wrapper.childAt(0).prop('style').fontWeight, 400);
    t.is(wrapper.childAt(0).prop('style').fontSize, '1.25em');
    t.is(wrapper.childAt(0).prop('style').padding, '10px 10px 5px');
    t.is(wrapper.childAt(0).prop('style').textTransform, 'uppercase');

    t.is(wrapper.childAt(0).childAt(0).prop('style').fontSize, '.813em');
    t.is(wrapper.childAt(0).childAt(0).text(), 'Menu');

    t.is(wrapper.childAt(1).prop('style').padding, 0);
    t.is(wrapper.childAt(1).prop('style').margin, '0px 10px');
    t.is(wrapper.childAt(1).prop('style').paddingBottom, 10);

    t.is(wrapper.childAt(1).children().length, 7);

    // Homes
    t.is(wrapper.childAt(1).childAt(0).prop('entry').label, 'Homes');
    t.is(wrapper.childAt(1).childAt(0).prop('entry').icon, 'fa-fw fa-fw fas fa-home');
    t.is(wrapper.childAt(1).childAt(0).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(0).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(0).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(0).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Reports
    t.is(wrapper.childAt(1).childAt(1).prop('entry').label, 'Reports');
    t.is(wrapper.childAt(1).childAt(1).prop('entry').icon, 'fa-fw fas fa-chart-area');
    t.is(wrapper.childAt(1).childAt(1).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(1).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(1).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(1).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Frames
    t.is(wrapper.childAt(1).childAt(2).prop('entry').label, 'Frames');
    t.is(wrapper.childAt(1).childAt(2).prop('entry').icon, 'fa-fw far fa-window-maximize');
    t.is(wrapper.childAt(1).childAt(2).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(2).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(2).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(2).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Counters
    t.is(wrapper.childAt(1).childAt(3).prop('entry').label, 'Counters');
    t.is(wrapper.childAt(1).childAt(3).prop('entry').icon, 'fa-fw fas fa-tachometer-alt');
    t.is(wrapper.childAt(1).childAt(3).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(3).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(3).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(3).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Scripts
    t.is(wrapper.childAt(1).childAt(4).prop('entry').label, 'Scripts');
    t.is(wrapper.childAt(1).childAt(4).prop('entry').icon, 'fa-fw fas fa-terminal');
    t.is(wrapper.childAt(1).childAt(4).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(4).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(4).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(4).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Administration
    t.is(wrapper.childAt(1).childAt(5).prop('entry').label, 'Administration');
    t.is(wrapper.childAt(1).childAt(5).prop('entry').icon, 'fa-fw fas fa-cogs');
    t.is(wrapper.childAt(1).childAt(5).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(5).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(5).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(5).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    // Organizations
    t.is(wrapper.childAt(1).childAt(6).prop('entry').label, 'Organizations');
    t.is(wrapper.childAt(1).childAt(6).prop('entry').icon, 'fa-fw fas fa-sitemap');
    t.is(wrapper.childAt(1).childAt(6).prop('entry').url, '#menu');

    t.is(wrapper.childAt(1).childAt(6).prop('linkStyle').color, '#000');
    t.is(wrapper.childAt(1).childAt(6).prop('linkStyle')[':hover'].color, '#fff');
    t.is(wrapper.childAt(1).childAt(6).prop('linkStyle')[':hover'].backgroundColor, '#fff');

    t.is(wrapper.childAt(1).childAt(0).prop('hideLabel'), false);
});