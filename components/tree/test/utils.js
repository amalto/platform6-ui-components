const { JSDOM } = require('jsdom');

global.window = new JSDOM(`<!DOCTYPE HTML><html><head></head><body><div id=\'test-tree-exist\'></body></html>`).window;

const $ = require('jquery');

global.$ = $;
global.document = window.document;
global.navigator = window.navigator;

require('jstree');