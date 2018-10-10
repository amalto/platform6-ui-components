const { JSDOM } = require('jsdom');

const tooltip = `<div id=\'tooltip\' data-toggle=\'tooltip\' data-original-title=\'Test tooltip\'></div>`;

global.window = new JSDOM(
    `<!DOCTYPE HTML><html><head></head><body>
    ${tooltip}
    </body></html>`
).window;

const $ = require('jquery');
const Modernizr = require('modernizr');

global.$ = $;
global.document = window.document;
global.navigator = window.navigator;
global.Modernizr = Modernizr;

require('bootstrap');