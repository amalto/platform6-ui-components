const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'b2-common-components',

    assetsDir: 'public/',

    require: [
        path.resolve(__dirname, 'public/sass/main.scss')
    ],

    resolver: require('react-docgen').resolver.findExportedComponentDefinition,

    getComponentPathLine(componentPath) {
        const type = componentPath.split('/')[0]
        const componentName = componentPath.split('/')[1]
        const name = changeCase.pascalCase(componentName)
        const dir = componentName

        return type === 'components' ? `import ${name} from '${dir}';` : null
    },

    template: path.resolve(__dirname, './public/index.html'),
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    webpackConfig: require('./webpack.config.js'),

    showUsage: true,
    showCode: true,

    ignore: ['**/node_modules/**/*.*', 'components/helpers/**/*.*'],

    skipComponentsWithoutExample: true,

    sections: [
        {
            name: 'Introduction',
            content: 'readme/Introduction.md'
        },
        {
            name: 'Components',
            description: 'All the components provided by platform-6',
            components: 'components/**/*.tsx'
        },
        {
            name: 'Interfaces',
            description: 'Interfaces used by b2-common-components',
            components: 'readme/**/*.tsx',
            showCode: false
        },
        {
            name: 'Utils',
            description: 'Utils used by b2-common-components',
            showCode: false,
            sections: [
                {
                    name: 'Helpers',
                    content: 'readme/Helpers/Helpers.md',
                }
            ]
        }
    ]
}