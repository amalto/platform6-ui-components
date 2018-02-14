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
            hideControls={{
                separator: true,
                encoding: true,
                overwrite: true
            }}
            processing={true}
        />
    );

    t.true(wrapper.hasClass('form-dialog'));
    t.true(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).hasClass('panel-title has-spinner'));
    t.is(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).text(), 'Import data from a file');
    t.true(wrapper.childAt(0).childAt(0).childAt(0).childAt(1).hasClass('spinner-container'));

    t.is(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).children().length, 6);
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(0).hasClass('col-xs-12 col-sm-6'));
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(1).hasClass('col-xs-12 col-sm-6 hidden'));
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(2).hasClass('col-xs-12 col-sm-6'));
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(3).hasClass('col-xs-12 col-sm-6 hidden'));
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(4).hasClass('col-xs-12 col-sm-6'));
    t.true(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).childAt(5).hasClass('col-xs-12 col-sm-6 hidden'));


    t.false(spyCancelHandler.called);
    wrapper.childAt(0).childAt(0).childAt(2).childAt(0).simulate('click');
    t.true(spyCancelHandler.called);

    t.false(spySubmitHandler.called);
    wrapper.childAt(0).childAt(0).childAt(2).childAt(1).simulate('click');
    t.true(spySubmitHandler.called);
});