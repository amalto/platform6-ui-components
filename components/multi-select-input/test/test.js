import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import MultiSelectInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('MultiSelectInput component should exist', t => {
    const ExistMultiSelectInput = reduxForm({
        form: 'form-multi-select-input-example',
        enableReinitialize: true
    })(MultiSelectInput);
    const wrapper = shallow(<ExistMultiSelectInput />);

    t.true(wrapper.exists());
});

test('MultiSelectInput props should be defined', t => {
    const ExampleMultiSelectInput = reduxForm({
        form: 'form-multi-select-input-example',
        enableReinitialize: true
    })(MultiSelectInput);
    const options = [
        { value: 'first', label: 'first' },
        { value: 'second', label: 'second' },
        { value: 'third', label: 'third' }
    ];
    const wrapper = shallow(
        <ExampleMultiSelectInput name='multi-select-input-example'
            label='MultiSelectInput example'
            options={options}
            multiple={true}
            fieldLineHeight={1.5}
            locale={'en-US'}
            help='Helper text'
            containerClass='col-lg-12 col-xs-12 padding-none'
            inputClass='info-color'
            disabled={false}
        />
    )

    // console.info(wrapper.prop('form'));

    t.is(wrapper.prop('form'), 'form-multi-select-input-example');
    t.is(wrapper.prop('name'), 'multi-select-input-example');
    t.is(wrapper.prop('label'), 'MultiSelectInput example');
    t.deepEqual(wrapper.prop('options'), options);
    t.is(wrapper.prop('disabled'), false);
    t.is(wrapper.prop('help'), 'Helper text');
    t.is(wrapper.prop('containerClass'), 'col-lg-12 col-xs-12 padding-none');
    t.is(wrapper.prop('inputClass'), 'info-color');
    t.is(wrapper.prop('hideEmptyOption'), undefined);
    t.is(wrapper.prop('collapseErrorSpace'), undefined);
    t.pass('FIXME');
});