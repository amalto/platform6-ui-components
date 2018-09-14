import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import SelectText from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('SelectText component should exist', t => {
    const wrapper = shallow(<SelectText />);

    t.true(wrapper.exists());
});

test('SelectText props should be defined', t => {
    const options = [
        {
            leftIcon: 'fas fa-arrow-right info-color',
            rightIcon: 'fas fa-unlink warning-color',
            value: 'first',
            iconAlignment: 'center',
            label: 'first.'

        },
        { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'second', label: 'second' },
        { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'third', label: 'third' }
    ];


    const wrapper = shallow(
        <SelectText name='select-text-example'
            label='SelectText example'
            placeholder='SelectText placeholder'
            disabled={false}
            help='Helper text'
            options={options}
            containerClass='padded'
            inputClass='text-large'
            type='text'
            autofocus={true}
        />
    );

    t.is(wrapper.hasClass('form-group padded'), true);
    t.is(wrapper.childAt(6).childAt(1).prop('text'), 'Helper text');
    t.is(wrapper.childAt(7).hasClass('select-text-input text-large'), true);
    t.is(wrapper.childAt(7).childAt(0).prop('name'), 'select-text-example');
    t.is(wrapper.childAt(7).childAt(0).prop('type'), 'text');
    t.is(wrapper.childAt(7).childAt(0).prop('autoFocus'), true);
    t.is(wrapper.childAt(7).childAt(0).prop('disabled'), false);
    t.is(wrapper.childAt(7).childAt(0).prop('placeholder'), 'SelectText placeholder');
});