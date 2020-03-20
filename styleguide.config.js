const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'Platform 6 UI components',

    assetsDir: 'public/',

    require: [
        path.resolve(__dirname, 'public/sass/main.scss')
    ],

    styleguideComponents: {
        Wrapper: path.join(__dirname, 'typescript/custom/Wrapper'),
        PathlineRenderer: path.join(__dirname, 'typescript/custom/Pathline'),
        PropsRenderer: path.join(__dirname, 'typescript/custom/PropsRenderer'),
        TableRenderer: path.join(__dirname, 'typescript/custom/TableRenderer')
    },

    getComponentPathLine(componentPath) {
        const packageJsonPath = path.resolve(__dirname, componentPath.replace('index.tsx', 'package.json'))
        const package = require(packageJsonPath)

        return JSON.stringify({ name: package.name, version: package.version })
    },

    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.md')
    },

    template: {
        favicon: "images/platform-6-logo.png",
        head: {
            meta: [
                { name: "robots", content: "noindex, nofollow" },
                { name: "description", content: "Amalto b2portal" },
                { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }
            ],
            links: [
                { rel: "stylesheet", type: "text/css", href: "https://portal.amalto.com/assets/vendor/bootstrap-3.3.1/css/bootstrap.min.css" },
                { rel: "stylesheet", type: "text/css", href: "https://use.fontawesome.com/releases/v5.0.8/css/all.css", integrity: "sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S", crossorigin: "anonymous" },
                { rel: "stylesheet", type: "text/css", href: "https://portal.amalto.com/fonts/icomoon/style.css" },
                { rel: "stylesheet", type: "text/css", href: "https://portal.amalto.com/assets/vendor/animate.min.css" },
                { rel: "stylesheet", type: "text/css", href: "https://portal.amalto.com/assets/vendor/pikaday-1.4.0/pikaday.css" },
                { rel: "stylesheet", type: "text/css", href: "https://portal.amalto.com/assets/vendor/jstree-3.3.1/themes/default/style.min.css" },
                { rel: "stylesheet", type: "text/css", href: "https://dev.portal.amalto.com/assets/generated/styles.css" }
            ],
            scripts: [
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/modernizr-custom-3.3.1.min.js" }
            ]
        },
        body: {
            scripts: [
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/jquery-2.1.4.min.js" },
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/bootstrap-3.3.1/js/bootstrap.min.js" },
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/jquery.navgoco-0.2.1.min.js" },
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/jquery.fullscreen-1.1.5.min.js" },
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/typeahead-0.11.1.min.js" },
                { type: "text/javascript", src: "https://portal.amalto.com/assets/vendor/jstree-3.3.1/jstree.min.js" },
                { type: "text/javascript", src: "//cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.fr" }
            ]
        }
    },
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    webpackConfig: require('./webpack.config.js'),
    styles: {
        StyleGuide: {
            content: {
                'max-width': undefined
            }
        },
        Pre: {
            pre: {
                'white-space': 'pre-wrap !important'
            }
        },
        Blockquote: {
            blockquote: {
                'background-color': '#eee',
                'margin': '0',
                'padding': '0px 3px',
                'border-radius': '5px',
                'font-size': 'inherit',
                'display': 'inline-block',
                'line-height': '1.2'
            }
        },
        Heading: {
            heading: {
                'color': '#89bc55'
            }
        },
        Playground: {
            tab: {
                'position': 'relative',
                'z-index': '0'
            }
        }
    },

    showUsage: true,
    showCode: true,

    ignore: [
        '**/node_modules/**',
        '**/test/**',
        '**/readme/**',
        '**/public/**'
    ],

    skipComponentsWithoutExample: true,

    pagePerSection: process.env.NODE_ENV !== 'production',

    sections: [{
        name: 'Introduction',
        content: 'readme/Introduction.md'
    },
    {
        name: 'Components',
        description: 'All the components provided by Platform 6.',
        ignore: ['**/node_modules/**'],
        sections: [
            {
                name: 'Modules',
                components: [
                    'components/translation-field/index.tsx',
                ]
            },
        ]
    }
    ]
}
