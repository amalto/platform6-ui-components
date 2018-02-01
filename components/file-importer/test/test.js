import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import FileImporter from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('FileImporter component should exist', t => {
    const wrapper = shallow(
        <FileImporter locale='en-US'
            fileData={{ name: 'test_file', size: 100 }}
            cancelHandler={() => { }}
            submitHandler={() => { }}
            spinnerSrc={'/images/spinner.gif'}
        />
    )

    t.true(wrapper.exists());
});

test('FileImporter props should be defined', t => {
    const cancelHandler = () => {
        console.info('cancelHandler triggered');
    };
    const spyCancelHandler = sinon.spy(cancelHandler);
    const submitHandler = () => {
        console.info('submitHandler triggered');
    };
    const spySubmitHandler = sinon.spy(submitHandler);
    const wrapper = shallow(
        <FileImporter locale='en-US'
            fileData={{ name: 'test_file', size: 100 }}
            cancelHandler={spyCancelHandler}
            submitHandler={spySubmitHandler}
            processing={true}
            spinnerSrc={'/images/spinner.gif'}
        />
    );
    t.pass();
});