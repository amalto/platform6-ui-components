const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'platform6-ui-components',

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
        const name = changeCase.pascalCase(componentName)
        const dir = componentName

        return type === 'components' ? `import ${name} from '@amalto/${dir}';` : null
    },

    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.md')
    },

    template: path.resolve(__dirname, './public/index.html'),
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    webpackConfig: require('./webpack.config.js'),

    // Will be remove when editorConfig.theme property is fixed for all theme except default one 
    highlightTheme: 'tomorrow-night-eighties',

    // editorConfig: {
    //     theme: 'base16-light' // should be tomorrow-night-eighties, but not working for now
    // },

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
        description: 'All the components provided by platform6',
        ignore: ['**/node_modules/**'],
        components: 'components/**/index.tsx'
    },
    {
        name: 'Interfaces',
        description: 'Interfaces used by platform6-ui-components',
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
                name: 'BtnGroupsProps',
                content: 'readme/BtnGroupsProps.md'
            },
            {
                name: 'ButtonProps',
                content: 'readme/ButtonProps.md'
            },
            {
                name: 'CronValue',
                content: 'readme/CronValue.md'
            },
            {
                name: 'DateInputEvent',
                content: 'readme/DateInputEvent.md'
            },
            {
                name: 'DisplayTemplate',
                content: 'readme/DisplayTemplate.md'
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
            }
        ]
    },
    {
        name: 'Utils',
        description: 'Utils used by b2-common-components',
        showCode: false,
        sections: [
            {
                name: 'FontAwesome',
                content: 'readme/Icons.md',
            },
            {
                name: 'Helpers',
                content: 'readme/Helpers.md',
            }
        ]
    },
    {
        name: 'Todo',
        description: 'Todo list of what\'s left to be done',
        content: 'readme/Todo.md'
    }
    ]
}
