const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'Platform 6 UI components',

    assetsDir: 'public/',

    require: [
        path.resolve(__dirname, 'public/sass/main.scss')
    ],

    styleguideComponents: {
        Wrapper: path.join(__dirname, 'typescript/Wrapper')
    },

    getComponentPathLine(componentPath) {
        const type = componentPath.split('/')[0]
        const componentName = componentPath.split('/')[1]
        // const name = changeCase.pascalCase(componentName)
        const dir = componentName

        return type === 'components' ? `npm install --save @amalto/${dir}` : null
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
        }
    },

    editorConfig: {
        theme: 'tomorrow-night-eighties'
    },

    theme: {
        color: {
            sidebarBackground: '#F0F3F3'
        },
        sidebarWidth: 300
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

    sections: [{
        name: 'Introduction',
        content: 'readme/Introduction.md'
    },
    {
        name: 'Components',
        description: 'All the components provided by Platform 6.',
        ignore: ['**/node_modules/**'],
        components: 'components/**/index.tsx'
    },
    {
        name: 'Interfaces',
        description: 'Interfaces used by the Platform 6 UI components.',
        sections: [
            {
                name: 'AceSession',
                content: 'readme/AceSession.md'
            },
            {
                name: 'Action',
                content: 'readme/Action.md'
            },
            {
                name: 'AppEndpointsModel',
                content: 'readme/AppEndpointsModel.md'
            },
            {
                name: 'AppKey',
                content: 'readme/AppKey.md'
            },
            {
                name: 'Auth',
                content: 'readme/Auth.md'
            },
            {
                name: 'BatchOperationReport',
                content: 'readme/BatchOperationReport.md'
            },
            {
                name: 'BtnGroupsProps',
                content: 'readme/BtnGroupsProps.md'
            },
            {
                name: 'ButtonProps',
                content: 'readme/ButtonProps.md'
            },
            {
                name: 'CellData',
                content: 'readme/CellData.md'
            },
            {
                name: 'ColumnHeader',
                content: 'readme/ColumnHeader.md'
            },
            {
                name: 'CronValue',
                content: 'readme/CronValue.md'
            },
            {
                name: 'CustomFormData',
                content: 'readme/CustomFormData.md'
            },
            {
                name: 'DateInputEvent',
                content: 'readme/DateInputEvent.md'
            },
            {
                name: 'DataGridTemplates',
                content: 'readme/DataGridTemplates.md'
            },
            {
                name: 'DisplayTemplate',
                content: 'readme/DisplayTemplate.md'
            },
            {
                name: 'DynamicComponent',
                content: 'readme/DynamicComponent.md'
            },
            {
                name: 'EndpointsUrl',
                content: 'readme/EndpointsUrl.md'
            },
            {
                name: 'FileWrapper',
                content: 'readme/FileWrapper.md'
            },
            {
                name: 'KeyValDef',
                content: 'readme/KeyValDef.md'
            },
            {
                name: 'Marker',
                content: 'readme/Marker.md'
            },
            {
                name: 'NotificationModel',
                content: 'readme/NotificationModel.md'
            },
            {
                name: 'OrderDataset',
                content: 'readme/OrderDataset.md'
            },
            {
                name: 'PDFSource',
                content: 'readme/PDFSource.md'
            },
            {
                name: 'PermissionDef',
                content: 'readme/PermissionDef.md'
            },
            {
                name: 'RemoteConfig',
                content: 'readme/RemoteConfig.md'
            },
            {
                name: 'ScopeTree',
                content: 'readme/ScopeTree.md'
            },
            {
                name: 'ScopeValue',
                content: 'readme/ScopeValue.md'
            },
            {
                name: 'Settings',
                content: 'readme/Settings.md'
            },
            {
                name: 'TreeNodeDataModel',
                content: 'readme/TreeNodeDataModel.md'
            },
            {
                name: 'TreeNodeModel',
                content: 'readme/TreeNodeModel.md'
            },
            {
                name: 'UserModel',
                content: 'readme/UserModel.md'
            },
            {
                name: 'WebApi',
                content: 'readme/WebApi.md'
            },
            {
                name: 'WebStorage',
                content: 'readme/WebStorage.md'
            }
        ]
    },
    {
        name: 'Utils',
        description: 'Externals resources and commons methods used in several Platform 6 UI components. You should take a look at the resources provided here before any implementation to avoid duplicate code.',
        showCode: false,
        sections: [
            {
                name: 'Font Awesome',
                content: 'readme/Icons.md',
            },
            {
                name: 'Common classes',
                description: 'All the custom classes provided with Platform 6 UI components.',
                sections: [
                    {
                        name: 'Text',
                        content: 'readme/commons-classes/Text.md'
                    },
                    {
                        name: 'Colors',
                        content: 'readme/commons-classes/Colors.md'
                    },
                    {
                        name: 'Margins',
                        content: 'readme/commons-classes/Margins.md'
                    },
                    {
                        name: 'Paddings',
                        content: 'readme/commons-classes/Paddings.md'
                    },
                    {
                        name: 'Buttons',
                        content: 'readme/commons-classes/Buttons.md'
                    }
                ]
            },
            {
                name: 'ScopeHelpers',
                content: 'readme/ScopeHelpers.md',
            },
            {
                name: 'Locale',
                description: 'List available locales on Platform 6 UI Components.',
                content: 'readme/Locale.md',
            },
            {
                name: 'Helpers',
                description: 'Methods used in several Platform 6 UI components.',
                sections: [
                    {
                        name: 'File',
                        content: 'readme/helpers/File.md'
                    },
                    {
                        name: 'Object manipulation',
                        content: 'readme/helpers/ObjectManipulation.md'
                    },
                    {
                        name: 'Store manipulation',
                        content: 'readme/helpers/StoreManipulation.md'
                    },
                    {
                        name: 'Strings',
                        content: 'readme/helpers/Strings.md'
                    },
                    {
                        name: 'Uri',
                        content: 'readme/helpers/Uri.md'
                    },
                    {
                        name: 'Validation',
                        content: 'readme/helpers/Validation.md'
                    }
                ]
            }
        ]
    }
    ]
}
