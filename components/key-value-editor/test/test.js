import React from 'react';
import base64 from 'base-64';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import KeyValueEditor from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('component should exist', t => {
    const wrapper = shallow(<KeyValueEditor />);

    t.true(wrapper.exists());
});

test('KeyValueEditor props should be defined', t => {
    const handleChange = (keyValues) => {
        console.info('handleChange triggered');
    };
    const spy = sinon.spy(handleChange);
    const encodedContent = base64.encode('example')
    const wrapper = shallow(
        <KeyValueEditor locale='en-US'
            keyValues={{
                first: {
                    contentType: 'plain/text',
                    contentBytes: encodedContent
                }
            }}
            handleChange={spy}
        />
    );

    wrapper.childAt(0).childAt(0).children().simulate('click', { currentTarget: { getAttribute: () => { } } })
    t.is(wrapper.childAt(0).childAt(0).children().prop('data-key'), 'first');
    t.true(spy.called);
});