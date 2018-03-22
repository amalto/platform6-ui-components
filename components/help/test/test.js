import * as React from 'react';

import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import Help from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('Help component should exist', t => {
    const wrapper = shallow(
        <Help containerClass='info-color'
            style={{}}
            text='Help text'
        />
    );

    t.true(wrapper.exists());
});

test('Help props should be defined', t => {
    const style = {
        color: '#000000'
    }
    const wrapper = shallow(
        <Help containerClass='info-color'
            style={style}
            text='Help text'
        />
    );

    t.true(wrapper.hasClass('fas fa-fw fa-question-circle default-color info-color'));
    t.deepEqual(wrapper.prop('style'), style);
    t.is(wrapper.prop('data-content'), 'Help text');
});