import React from 'react';
import ReactDOM from 'react-dom';

import test from 'ava';
import base64 from 'base-64';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, mount, configure } from 'enzyme';
import {
    compileWordings,
    isValidEmail,
    isValidColorCode,
    isNotEmpty,
    isValidScopeKeyword,
    isValidKeyChar,
    isValidXMLTag,
    isValidHttpsUrl,
    escapeXml,
    utf8JSON_to_b64URI,
    URIb64_to_utf8JSON,
    arrayMin,
    arrayMax,
    formatFileSize,
    getQueryParams,
    addQueryParam,
    buildReactRouterUri,
    orderAsc,
    orderDesc,
    saveDataAsJSONFile,
    downloadDataFile,
    triggerDataDownload,
    loadTooltips,
    unloadTooltips,
    groupByProperty,
    addValToArrayNoDup,
    removeValFromArrayNoDup,
    getNestedValue,
    filterCollection,
    base64Decode
} from '../build/index.js';

configure({ adapter: new Adapter() });

const WORDINGS = {
    'hello': {
        'en-US': 'Hello World!',
        'fr-FR': 'Bonjour le monde !'
    }
};

// compileWordings
test('should return [Hello World!]', t => {
    const wordings = compileWordings(WORDINGS, 'en-US');

    t.deepEqual(wordings['hello'], 'Hello World!');
});

test('should not return [Hello World!]', t => {
    const wordings = compileWordings(WORDINGS, 'fr-FR');

    t.notDeepEqual(wordings['hello'], 'Hello World!');
});

// isValidEmail
test('should be a valid email', t => {
    t.true(isValidEmail('valid-email@gmail.com'));
});

test('should be an invalid email', t => {
    t.false(isValidEmail('valid-email@gmail'));
});

// isValidColorCode
test('should be a valid hexadecimal color', t => {
    t.true(isValidColorCode('#FFFFFF'));
    t.true(isValidColorCode('#abc'));
});

test('should be an invalid hexadecimal color', t => {
    t.false(isValidColorCode('#FFFFFZ'));
    t.false(isValidColorCode('#abcd'));
});

// isNotEmpty
test('shouldn\'t be an empty string', t => {
    t.true(isNotEmpty('I am not empty'));
});

test('should be an empty string', t => {
    t.false(isNotEmpty(''));
    t.false(isNotEmpty());
});

// isValidScopeKeyword
test('should be a valid scope keyword', t => {
    t.true(isValidScopeKeyword('permission'));
});

test('should be an invalid scope keyword', t => {
    t.false(isValidScopeKeyword('permission.'));
});

// isValidKeyChar
test('should be a valid key character', t => {
    t.true(isValidKeyChar('abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789'));
});

test('should be an invalid key character', t => {
    t.false(isValidKeyChar('abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789.'));
});

// isValidXMLTag
test('should be a valid XML tag', t => {
    t.true(isValidXMLTag(':valid-XML.Tag'));
});

test('should be an invalid XML tag', t => {
    t.false(isValidXMLTag(':invalid-XML.Tag&'));
});

// isValidHttpsUrl
test('should be a valid https url', t => {
    t.true(isValidHttpsUrl('https://www.localhost:6060.com/whatever/after'));
});

test('should be an invalid https url', t => {
    t.false(isValidHttpsUrl('https://www.localhost:6060/wrong/cause/incomplete/domain/name'));
});

// escapeXml
test('should return [&lt&amp&apos&quot&gt]', t => {
    t.deepEqual(escapeXml('[<&\'">]'), '[&lt&amp&apos&quot&gt]');
});

test('shouldn\'t return [&lt&amp&apos&quot&gt]', t => {
    t.notDeepEqual(escapeXml('[<>]', '[&lt&amp&apos&quot&gt]'));
});

// utf8JSON_to_b64URI and URIb64_to_utf8JSON
test('should return { "test": "test\\n" } after encode and decode', t => {
    const json = { 'test': 'test\n' };
    const encoded = utf8JSON_to_b64URI(json);
    const decoded = URIb64_to_utf8JSON(encoded)

    t.deepEqual(json.test, decoded.test);
});

// arrayMin
test('should return 5', t => {
    t.true(arrayMin([10, 6, 116, 5, 47, 11, 34]) === 5);
});

// arrayMax
test('should return 116', t => {
    t.true(arrayMax([10, 6, 116, 5, 47, 11, 34]) === 116);
});

// formatFileSize
test('should return 10.0 B', t => {
    t.true(formatFileSize(10) === '10.0 B');
});

test('should return 1.0 KB', t => {
    t.true(formatFileSize(1000) === '1.0 KB');
});

test('should return 1.0 MB', t => {
    t.true(formatFileSize(1000000) === '1.0 MB');
});

test('should return 1.0 GB', t => {
    t.true(formatFileSize(1000000000) === '1.0 GB');
});

test('should return 1.0 TB', t => {
    t.true(formatFileSize(1000000000000) === '1.0 TB');
});

// getQueryParams
test('should return { "test": "value", "other": "something" }', t => {
    const result = getQueryParams('?test=value&other=something');

    t.deepEqual(result, { "test": "value", "other": "something" });
});

// addQueryParam
test.skip('addQueryParam: need to mock document and windows to test', t => {
    t.pass();
});

// buildReactRouterUri
test.skip('buildReactRouterUri: need to mock document and windows to test', t => {
    t.pass();
});

// orderAsc
test('should order by asc key-value', t => {
    const object = { c: 'c', b: 'b', a: 'a' };

    t.deepEqual(Object.keys(orderAsc(object)), Object.keys({ a: 'a', b: 'b', c: 'c' }));
    t.notDeepEqual(Object.keys(orderAsc(object)), Object.keys(object));
});

// orderDesc
test('should order by desc key-value', t => {
    const object = { a: 'a', b: 'b', c: 'c' };

    t.deepEqual(Object.keys(orderDesc(object)), Object.keys({ c: 'c', b: 'b', a: 'a' }));
    t.notDeepEqual(Object.keys(orderDesc(object)), Object.keys(object));
});

// saveDataAsJSONFile
test.skip('saveDataAsJSONFile: need to mock document and windows to test', t => {
    t.pass();
});

// downloadDataFile
test.skip('downloadDataFile: need to mock document and windows to test', t => {
    t.pass();
});

// triggerDataDownload
test.skip('triggerDataDownload: need to mock document and windows to test', t => {
    t.pass();
});

// loadTooltips
test.skip('loadTooltips: need to mock document and windows to test', t => {
    t.pass();
});

// unloadTooltips
test.skip('unloadTooltips: need to mock document and windows to test', t => {
    t.pass();
});

// groupByProperty
test('should store content of array into object array at property name', t => {
    const list = [
        {
            id: 1,
            test: 'one'
        },
        {
            id: 2,
            test: 'two'
        },
        {
            id: 3,
            test: 'three'
        }
    ];

    t.deepEqual(groupByProperty(list, 'test'), {
        one: [{
            id: 1,
            test: 'one'
        }],
        two: [{
            id: 2,
            test: 'two'
        }],
        three: [{
            id: 3,
            test: 'three'
        }]
    });
});

// addValToArrayNoDup
test('should add element to array only if there a no duplicate', t => {
    const data = ['1', '2', '3'];

    t.deepEqual(addValToArrayNoDup(data, '4'), ['1', '2', '3', '4']);
    t.deepEqual(addValToArrayNoDup(data, '3'), ['1', '2', '3']);
    t.notDeepEqual(addValToArrayNoDup(data, '3'), ['1', '2', '3', '4']);
});

// removeValFromArrayNoDup
test('should remove element from array', t => {
    const data = ['1', '2', '3'];

    t.deepEqual(removeValFromArrayNoDup(data, '3'), ['1', '2']);
    t.deepEqual(removeValFromArrayNoDup(data, '4'), ['1', '2', '3']);
    t.notDeepEqual(removeValFromArrayNoDup(data, '4'), ['1', '2']);
});

// getNestedValue
test('should get nested value from object', t => {
    const data = {
        node: {
            nested: 1
        },
        child: {
            value: 2
        }
    };

    t.deepEqual(getNestedValue(data, 'node.nested'), 1);
    t.deepEqual(getNestedValue(data, 'child.value'), 2);
    t.deepEqual(getNestedValue(data, 'i.do.not.exist'), undefined);
    t.notDeepEqual(getNestedValue(data, 'node.nested'), 2);
});

// filterCollection
test('should filter collection by properties and search value', t => {
    const data = [
        { one: 'sheep', two: 'chicken', three: 'cow' },
        { one: 'wolf', two: 'deer', three: 'snake' },
        { one: 'lion', two: 'zebra', three: 'giraf' }
    ];
    const filterOne = filterCollection(data, ['one'], '');

    t.is(filterOne[0].one, 'sheep');
    t.is(filterOne[1].one, 'wolf');
    t.is(filterOne[2].one, 'lion');

    const filterOneInvalidProperty = filterCollection(data, ['one', 'toto'], '');

    t.is(filterOneInvalidProperty[0].one, 'sheep');
    t.is(filterOneInvalidProperty[1].one, 'wolf');
    t.is(filterOneInvalidProperty[2].one, 'lion');

    /**
     * Should return the original data without any changes.
     * Only searchString can interact with the collection returned.
     */
    const filterInvalidProperty = filterCollection(data, ['toto'], '');

    t.is(filterOneInvalidProperty[0].one, 'sheep');
    t.is(filterOneInvalidProperty[1].one, 'wolf');
    t.is(filterOneInvalidProperty[2].one, 'lion');

    const filterSearchValue = filterCollection(data, ['one', 'two', 'three'], 's');

    t.is(filterSearchValue.length, 2);
    t.is(filterSearchValue[0].one, 'sheep');
    t.is(filterSearchValue[1].three, 'snake');

    const filterUnfindable = filterCollection(data, ['one', 'two', 'three'], 'you can\'t find me');

    t.is(filterUnfindable.length, 0);
});

// base64Decode
test.skip('base64Decode: This won\'t be tested because it use base64.decode directly', t => { });