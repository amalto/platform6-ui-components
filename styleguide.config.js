const path = require('path');

module.exports = {

    title: 'b2-common-components',

    assetsDir: 'public/',

    resolver: require('react-docgen').resolver.findAllComponentDefinitions,

    getComponentPathLine(componentPath) {
        // const name = path.basename(componentPath, '.tsx')
        // const dir = path.dirname(componentPath).split('/')[1]

        // return `import ${name} from '${dir}';`
        return componentPath;
    },

    // components: 'components/**/*.tsx',
    template: path.resolve(__dirname, './public/index.html'),
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    webpackConfig: require('./webpack.config.js'),

    showUsage: true,
    showCode: true,

    ignore: ['**/node_modules/**/*.*'],

    skipComponentsWithoutExample: true,

    sections: [
        {
            name: 'Introduction',
            content: 'readme/Introduction.md'
        },
        {
            name: 'Components',
            description: 'All the components provided by platform-6',
            ignore: ['components/helpers/typescript/index.tsx'],
            components: 'components/**/*.tsx',
        }
    ]
}