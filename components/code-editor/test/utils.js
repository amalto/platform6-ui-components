const { JSDOM } = require('jsdom');

global.window = new JSDOM(`<!DOCTYPE HTML><html><head></head><body><div id=\'test-code-editor-exist\'></div><div id=\'test-code-editor\'></div></body></html>`).window;

const $ = require('jquery');

global.document = window.document;
global.navigator = window.navigator;
global.$ = $;