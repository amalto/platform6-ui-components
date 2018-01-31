const { JSDOM } = require('jsdom');

global.window = new JSDOM().window;

const $ = require('jquery')(window);

global.document = window.document;
global.navigator = window.navigator;
global.$ = $;