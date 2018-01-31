import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CodeEditor from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('CodeEditor component should exist', t => {
    const wrapper = shallow(
        <CodeEditor docId='test-code-editor-exist'
            value='code-editor-value'
            mode='xml'
            loadTime={new Date()}
        />
    );

    t.true(wrapper.exists());
});

/** Can just test the container id, the rest is up to ace editor. */
test('CodeEditor props should be defined', t => {
    let aceSession = null
    const saveSession = (session) => {
        aceSession = session
        console.info('saveSession triggered');
    };
    const saveContent = (session) => {
        aceSession = session
        console.info('saveContent triggered');
    };
    const spySaveSession = sinon.spy(saveSession);
    const spySaveContent = sinon.spy(saveContent);
    const wrapper = shallow(
        <CodeEditor docId='test-code-editor'
            value='code-editor-value'
            mode='xml'
            readonly={true}
            displaySettings={{}}
            loadTime={new Date()}
            aceSession={aceSession}
            saveSession={spySaveSession}
            saveContent={spySaveContent}
        />
    );

    t.is(wrapper.prop('id'), 'test-code-editor');
    t.true(spySaveSession.called);
})