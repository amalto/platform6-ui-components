const { JSDOM } = require('jsdom');

global.window = new JSDOM().window;

const $ = require('jquery');

global.$ = $;
global.document = window.document;
global.navigator = window.navigator;