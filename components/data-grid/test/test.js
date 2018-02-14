import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import {
    shallow,
    configure
} from 'enzyme';

import DataGrid from '../build/index.js';
// const {
//     api,
//     displayContextMenu,
//     hideContextMenu,
//     receiveUserInfo,
//     displayNotification,
//     handleErrorDisplay,
//     showDialog,
//     hideDialog
// } = require('./Mock.ts');

configure({ adapter: new Adapter() });

test.todo('DataGrid: Declaring type wasn\'t working.');