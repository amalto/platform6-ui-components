const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'Platform 6 UI components',

    // Can't be use right now because navbar and header links are not the same if used.
    // See https://github.com/styleguidist/react-styleguidist/issues/892.
    // pagePerSection: true,

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

    template: path.resolve(__dirname, './public/index.html'),
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
                'display': 'inline-block'
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
                name: 'Commons classes',
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
                name: 'Helpers',
                description: 'Methods used in several Platform 6 UI components.',
                sections: [
                    {
                        name: 'File',
                        content: 'readme/helpers/File.md'
                    },
                    {
                        name: 'ObjectManipulation',
                        content: 'readme/helpers/ObjectManipulation.md'
                    },
                    {
                        name: 'StoreManipulation',
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
