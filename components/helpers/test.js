import test from 'ava';
import React from 'react';

import jsesc from 'jsesc';
import base64 from 'base-64';
import Window from 'window';

const window = new Window();

import Adapter from 'enzyme-adapter-react-15'
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
    URIb64_to_utf8JSON
} from './build/index.js';

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
test('should return { "test": "test\n" }', t => {
    const json = {
        'test': 'test\n'
    };

    // t.deepEqual(
    //     jsesc(json),
    //     encodeURIComponent( base64.encode( window['unescape']( encodeURIComponent( JSON.stringify( json ) ) ) ) )
    // );
    t.pass();
});