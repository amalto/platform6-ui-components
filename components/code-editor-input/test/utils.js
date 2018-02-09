const { JSDOM } = require('jsdom');

global.window = new JSDOM(`<!DOCTYPE HTML><html><head></head><body><div id=\'test-code-editor-input-exist\'></div><div id=\'test-code-editor-input\'></div></body></html>`).window;

const $ = require('jquery');

global.$ = $;
global.document = window.document;
global.navigator = window.navigator;