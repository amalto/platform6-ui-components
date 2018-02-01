import React from 'react';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import FileImporter from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('FileImporter component should exist', t => {
    const wrapper = shallow(<FileImporter />);

    t.true(wrapper.exists());
});

test.skip('FileImporter props should be defined', t => {
    const cancelHandler = () => {
        console.info('cancelHandler triggered');
    };
    const spyCancelHandler = sinon.spy(cancelHandler);
    const submitHandler = () => {
        console.info('submitHandler triggered');
    };
    const spySubmitHandler = sinon.spy(submitHandler);
    // const wrapper = shallow(
    //     <FileImporter locale='en-US'
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