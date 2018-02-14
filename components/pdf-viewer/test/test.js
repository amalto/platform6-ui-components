import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import PdfViewer from '../build/index.js';
const { PDF_DATA } = require('../build/pdf.js');

configure({ adapter: new Adapter() });

test.beforeEach('PdfViewer component should exist', t => {
    const wrapper = shallow(
        <PdfViewer containerClass='padded'
            style={{ height: 100 }}
            pdfSource={null}
            locale='en-US'
        />
    );

    t.true(wrapper.exists());
});

/** Test for pdfSource doesn't work,
 * need more investigation on error ENAMETOOLONG: name too long
 */
test('PdfViewer props should be defined', t => {
    const wrapper = shallow(
        <PdfViewer containerClass='padded'
            style={{ height: 100 }}
            pdfSource={null}
            locale='en-US'
        />
    );

    t.true(wrapper.hasClass('padded'));
    t.is(wrapper.prop('style').height, 100);
});