import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import FileInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('component should exist', t => {
    const wrapper = shallow(<FileInput />);

    t.true(wrapper.exists());
});

test.skip('FileInput: put in hold because jQuery choose the wrong definition of map method', t => {
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
    // const wrapper = shallow(
    //     <FileInput locale='en-US'
    //         mimeTypeAccepted={'text/plain, text/html'}
    //         maxBytesSize={1000}
    //         filesQueue={{
    //             fileTest: {
    //                 sourceFile: {
    //                     name: 'test',
    //                     size: 100
    //                 },
    //                 uploadStarted: true,
    //                 uploadProgress: 50,
    //                 uploadEnded: false
    //             }
    //         }}
    //         addFilesToQueue={spyAddFilesToQueue}
    //         deleteUploadedFile={spyDeleteUploadedFile}
    //         cancelSubmit={spyCancelSubmit}
    //     />
    // );
    t.pass();
});