import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import { createHashHistory } from 'history';

import DynamicComponent from '../build/index.js';
import {
    api,
    showDialog,
    hideDialog,
    displayNotification,
    handleErrorDisplay
} from './test/Mock.ts';

const appHistory = createHashHistory();

configure({ adapter: new Adapter() });

test('DynamicComponent: Can\'t be tested right now', t => {
    const wrapper = shallow(
        <DynamicComponent api={api}
            appHistory={appHistory}
            componentScript=''
            componentData={{ iconClass: 'fa fa-info', btnClass: 'btn btn-trans btn-info' }}
            showDialog={showDialog}
            hideDialog={hideDialog}
            displayNotification={displayNotification}
            handleErrorDisplay={handleErrorDisplay}
            locale='en-US'
        />
    );
    t.pass();
});