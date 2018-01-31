import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import PagingControls from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('component should exist', t => {
    const wrapper = shallow(
        <PagingControls containerClass='padded'
            currentPage={1}
            totalPages={2}
            handlePageChange={() => { }}
            locale='en-US'
        />
    );

    t.true(wrapper.exists());
});

test('PagingControls props should be defined', t => {
    const handlePageChange = (newPage) => {
        console.info('handlePageChange triggered');
    };
    const spy = sinon.spy(handlePageChange);
    const wrapper = shallow(
        <PagingControls containerClass='padded'
            currentPage={1}
            totalPages={2}
            handlePageChange={spy}
            byContext={{
                prevContextToken: 'prev',
                nextContextToken: 'next'
            }}
            locale='en-US'
        />
    );

    wrapper.childAt(0).simulate('click', { currentTarget: { blur: () => { } } });
    t.true(wrapper.hasClass('padded'));
    t.false(wrapper.childAt(0).prop('disabled'));
    t.true(spy.called);
});