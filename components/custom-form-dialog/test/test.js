import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CustomFormDialog from '../build/index.js';

configure({ adapter: new Adapter() });

test.todo('CustomFormDialog: Can\'t be tested right now');