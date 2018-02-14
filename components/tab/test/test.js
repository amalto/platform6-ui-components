import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Tab from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.beforeEach('Tab component should exist', t => {
    const wrapper = shallow(
        <Tab id='tab-example-exist' title='Tab' />
    );

    t.true(wrapper.exists());
});

test('Tab props should be defined', t => {
    const wrapper = shallow(
        <Tab id='tab-example'
            iconClass='fa fa-file-o'
            title='Tab'
            closable={true}
            tabClassNames=''
            tabLinkUniqueClass=''
            tabLinkUniqueStyle={{}}>
            <div>Tab child</div>
        </Tab>
    );
    t.is(wrapper.childAt(0).childAt(0).text(), 'Tab child');
});