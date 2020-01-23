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
                name: 'Page construction',
                components: [
                    'components/sidebar/index.tsx',
                    'components/menu/index.tsx',
                    'components/header-bar/index.tsx',
                    'components/container/index.tsx'
                ]
            },
            {
                name: 'Inputs',
                components: [
                    'components/checkbox-input/index.tsx',
                    'components/checkboxes-input/index.tsx',
                    'components/code-editor-input/index.tsx',
                    'components/cron-input/index.tsx',
                    'components/date-input/index.tsx',
                    'components/file-input/index.tsx',
                    'components/file-upload-input/index.tsx',
                    'components/radio-input/index.tsx',
                    'components/readonly-input/index.tsx',
                    'components/select-input/index.tsx',
                    'components/select-text-input/index.tsx',
                    'components/switch-input/index.tsx',
                    'components/text-input/index.tsx',
                    'components/textarea-input/index.tsx',
                    'components/typeahead-form-input/index.tsx',
                    'components/typeahead-input/index.tsx',
                    'components/validated-input/index.tsx'
                ]
            },
            {
                name: 'Modules',
                components: [
                    'components/action-button/index.tsx',
                    'components/buttons-bar/index.tsx',
                    'components/code-editor/index.tsx',
                    'components/color-picker/index.tsx',
                    'components/data-line/index.tsx',
                    'components/date-picker/index.tsx',
                    'components/file-importer/index.tsx',
                    'components/help/index.tsx',
                    'components/key-value-editor/index.tsx',
                    'components/language-wrapper/index.tsx',
                    'components/multi-select/index.tsx',
                    'components/paging-controls/index.tsx',
                    'components/pdf-viewer/index.tsx',
                    'components/restricted/index.tsx',
                    'components/select-text/index.tsx',
                    'components/signature/index.tsx',
                    'components/spinner/index.tsx',
                    'components/switch/index.tsx',
                    'components/tab/index.tsx',
                    'components/tabs/index.tsx',
                    'components/time-picker/index.tsx',
                    'components/toggle-panel/index.tsx',
                    // 'components/translation-field/index.tsx',
                    'components/tree/index.tsx'
                ]
            },
        ]
    },
    {
        name: 'Internal resources',
        content: 'readme/internal/Introduction.md',
        sections: [
            {
                name: 'Menu',
                content: 'readme/internal/Menu.md'
            }
        ]
    },

    {
        name: 'External resources',
        content: 'readme/platform6-ui/Introduction.md',
        sections: [
            {
                name: 'Compatibility',
                content: 'readme/platform6-ui/Compatibility.md'
            },
            {
                name: 'DataGrid',
                content: 'readme/platform6-ui/DataGrid.md'
            },
            {
                name: 'WebStorage',
                content: 'readme/platform6-ui/WebStorage.md'
            },
            {
                name: 'ReduxForm',
                content: 'readme/redux-form/Description.md'
            }
        ]
    },

    {
        name: 'Interfaces',
        content: 'readme/interfaces/Description.md',
        sections: [
            {
                name: 'AppEndpointsModel',
                content: 'readme/interfaces/AppEndpointsModel.md'
            },
            {
                name: 'BtnGroupsProps',
                content: 'readme/interfaces/BtnGroupsProps.md'
            },
            {
                name: 'ButtonProps',
                content: 'readme/interfaces/ButtonProps.md'
            },
            {
                name: 'CronValue',
                content: 'readme/interfaces/CronValue.md'
            },
            {
                name: 'CustomFormData',
                content: 'readme/interfaces/CustomFormData.md'
            },
            {
                name: 'DataGridTemplates',
                content: 'readme/interfaces/DataGridTemplates.md'
            },
            {
                name: 'DateInputEvent',
                content: 'readme/interfaces/DateInputEvent.md'
            },
            {
                name: 'DisplayTemplate',
                content: 'readme/interfaces/DisplayTemplate.md'
            },
            {
                name: 'KeyValDef',
                content: 'readme/interfaces/KeyValDef.md'
            },
            {
                name: 'PDFSource',
                content: 'readme/interfaces/PDFSource.md'
            },
            {
                name: 'PermissionDef',
                content: 'readme/interfaces/PermissionDef.md'
            },
            {
                name: 'RemoteConfig',
                content: 'readme/interfaces/RemoteConfig.md'
            },
            {
                name: 'ScopeTree',
                content: 'readme/interfaces/ScopeTree.md'
            },
            {
                name: 'ScopeValue',
                content: 'readme/interfaces/ScopeValue.md'
            },
            {
                name: 'Settings',
                content: 'readme/interfaces/CodeEditorInputSettings.md'
            },
            {
                name: 'TreeNodeDataModel',
                content: 'readme/interfaces/TreeNodeDataModel.md'
            },
            {
                name: 'TreeNodeModel',
                content: 'readme/interfaces/TreeNodeModel.md'
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
                name: 'InputValidation',
                content: 'readme/InputValidation.md',
            },
            {
                name: 'Helpers',
                content: 'readme/helpers/Description.md',
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
            },
            {
                name: 'ServiceHelpers',
                content: 'readme/service-helpers/Description.md',
                sections: [
                    {
                        name: 'Constants',
                        content: 'readme/service-helpers/Constants.md'
                    },
                    {
                        name: 'Models',
                        content: 'readme/service-helpers/Models.md'
                    },
                    {
                        name: 'BaseListConfig',
                        content: 'readme/service-helpers/BaseListConfig.md'
                    },
                    {
                        name: 'DynamicComponent',
                        content: 'readme/service-helpers/DynamicComponent.md'
                    },
                    {
                        name: 'Methods',
                        content: 'readme/service-helpers/Methods.md'
                    }
                ]
            },
            {
                name: 'Typings',
                content: 'readme/typings/Description.md',
                sections: [
                    {
                        name: 'Action',
                        content: 'readme/typings/Action.md'
                    },
                    {
                        name: 'AppEndpointsModel',
                        content: 'readme/typings/AppEndpointsModel.md'
                    },
                    {
                        name: 'AppInstanceModel',
                        content: 'readme/typings/AppInstanceModel.md'
                    },
                    {
                        name: 'AppKey',
                        content: 'readme/typings/AppKey.md'
                    },
                    {
                        name: 'AceSession',
                        content: 'readme/typings/AceSession.md'
                    },
                    {
                        name: 'BatchOperationReport',
                        content: 'readme/typings/BatchOperationReport.md'
                    },
                    {
                        name: 'CellData',
                        content: 'readme/typings/CellData.md'
                    },
                    {
                        name: 'ColumnHeader',
                        content: 'readme/typings/ColumnHeader.md'
                    },
                    {
                        name: 'DisplayTemplate',
                        content: 'readme/typings/DisplayTemplate.md'
                    },
                    {
                        name: 'EndpointsUrl',
                        content: 'readme/typings/EndpointsUrl.md'
                    },
                    {
                        name: 'FileWrapper',
                        content: 'readme/typings/FileWrapper.md'
                    },
                    {
                        name: 'NotificationModel',
                        content: 'readme/typings/NotificationModel.md'
                    },
                    {
                        name: 'Option',
                        content: 'readme/typings/Option.md'
                    },
                    {
                        name: 'OrderDataset',
                        content: 'readme/typings/OrderDataset.md'
                    },
                    {
                        name: 'ReduxProps',
                        content: 'readme/typings/ReduxProps.md'
                    },
                    {
                        name: 'Scopes',
                        content: 'readme/typings/Scopes.md'
                    },
                    {
                        name: 'Service',
                        content: 'readme/typings/Service.md'
                    },
                    {
                        name: 'UserModel',
                        content: 'readme/typings/UserModel.md'
                    },
                    {
                        name: 'WebApi',
                        content: 'readme/typings/WebApi.md'
                    }
                ]
            },
            {
                name: 'Wordings',
                description: 'This is all the global text that is displayed on the ui. You can update or create your own wordings.',
                content: 'readme/Wordings.md'
            }
        ]
    }
    ]
}
