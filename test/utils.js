const { JSDOM } = require('jsdom');

const codeEditor = `<div id=\'test-code-editor-exist\'></div><div id=\'test-code-editor\'></div></body></html>`;
const codeEditorInput = `<div id=\'test-code-editor-input-exist\'></div><div id=\'test-code-editor-input\'></div>`;
const tree = `<div id=\'test-tree-exist\'>`;

global.window = new JSDOM(
    `<!DOCTYPE HTML><html><head></head><body>
    ${codeEditor}
    ${codeEditorInput}
    ${tree}
    </body></html>`
).window;

const $ = require('jquery');

global.$ = $;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLSpanElement = window.HTMLSpanElement;
global.HTMLInputElement = window.HTMLInputElement;
global.Element = window.Element;

require('bootstrap');