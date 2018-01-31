import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import Tree from '../build/index.js';

configure({ adapter: new Adapter() });

/**
 * This is impossible to test because the element id is generated dynamically by jtree.
 * 
 * code concern from jstree module: node = !document.querySelector ? document.getElementById(obj.id) : this.element[0].querySelector('#' + ("0123456789".indexOf(obj.id[0]) !== -1 ? '\\3' + obj.id[0] + ' ' + obj.id.substr(1).replace($.jstree.idregex,'\\$&') : obj.id.replace($.jstree.idregex,'\\$&')) ); //, this.element);
*/
test.skip('Tree impossible to test due to dynamic allocation of element id by jtree', t => {
    t.pass();
});