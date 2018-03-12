import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import FileUploadInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('FileUploadInput component should exist', t => {
    const wrapper = shallow(<FileUploadInput />);

    t.true(wrapper.exists());
});

test.skip('FileUploadInput: put in hold because jQuery choose the wrong definition of map method', t => {
    const addFilesToQueue = () => {
        console.info('addFilesToQueue triggered');
    };
    const spyAddFilesToQueue = sinon.spy(addFilesToQueue);
    const deleteUploadedFile = () => {
        console.info('deleteUploadedFile triggered');
    };
    const spyDeleteUploadedFile = sinon.spy(deleteUploadedFile);
    const cancelSubmit = () => {
        console.info('cancelSubmit triggered');
    };
    const spyCancelSubmit = sinon.spy(cancelSubmit);
    const wrapper = shallow(
        <FileUploadInput locale='en-US'
            name='file-upload-input-example-name'
            label='FileUploadInput example'
            disabled={false}
            help='FileUploadInput help'
            locale='en-US'
        />
    );
    t.pass();
});