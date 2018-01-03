import React from 'react'

/**
 * Storybook addons
 */
import { storiesOf, configure } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withDocs } from 'storybook-readme'

/**
 * External modules
 */
import * as base64 from 'base-64'
import * as classNames from 'classnames'

/**
 * Components
 */
import ActionButton from 'action-button'
import CodeEditor from 'code-editor'
import { Tree } from 'tree'
import { KeyValueEditor } from 'key-value-editor'
import { Helper } from 'helpers'

const data = require('./data.json')

/**
 * Readme files
 */
import todoReadme from './documentation/Todo.md'
import actionButtonReadme from './documentation/ActionButton.md'
import codeEditorReadme from './documentation/CodeEditor.md'
import keyValueEditorReadme from './documentation/KeyValueEditor.md'
import treeReadme from './documentation/Tree.md'
import { prototype } from 'events';

/**
 * Decorators
 */

/**
 * Wrapping Story inside the decorator
 * @param { () => void } storyFn Method rendering children added to the storybook
 */
const centerDecorator = (storyFn) => (
    <div className='container-fluid'>
        {storyFn()}
    </div>
)

const EmptyPreview = ({ children }) => {
    return null
}

/**
 * Styles
 */

// React.CSSProperties
const headerTitle = {
    borderBottom: '1px solid #eee'
}

/**
 * Stories
 */
storiesOf('Components', module)
    .addDecorator(withKnobs)
    .addDecorator(centerDecorator)
    .add('Todo', withDocs({ PreviewComponent: EmptyPreview })(todoReadme, () => <div></div>))
    .add('ActionButton', withDocs(actionButtonReadme, () => {
        const btnType = select('button type', {
            'btn-info': 'info',
            'btn-primary': 'primary',
            'btn-warning': 'warning',
            'btn-danger': 'danger',
            'btn-font': 'font',
            'btn-default': 'default'
        }, 'btn-info')
        const colorClass = select('button color', {
            '': 'none',
            'info-color': 'info',
            'primary-color': 'primary',
            'warning-color': 'warning',
            'danger-color': 'danger',
            'font-color': 'font',
            'default-color': 'default'
        }, 'none')

        return <ActionButton btnClass={classNames(`btn ${btnType} mgt-10`, {
            'btn-trans': boolean('transparent button', true)
        })}
            iconClass={text('iconClass', 'fa-info')}
            colorClass={colorClass}
            tooltipText={text('tooltipText', 'Click on me')}
            disabled={boolean('disabled', false)}
            clickAction={action('transparent info button')}
        />
    }))
    .add('CodeEditor', withDocs(codeEditorReadme, () => {
        const theme = select('theme', {
            'brace/theme/ambiance': 'ambiance',
            'brace/theme/chaos': 'chaos',
            'brace/theme/chrome': 'chrome',
            'brace/theme/clouds': 'clouds',
            'brace/theme/clouds_midnight': 'clouds_midnight',
            'brace/theme/cobalt': 'cobalt',
            'brace/theme/crimson_editor': 'crimson_editor',
            'brace/theme/dawn': 'dawn',
            'brace/theme/dracula': 'dracula',
            'brace/theme/dreamweaver': 'dreamweaver',
            'brace/theme/eclipse': 'eclipse',
            'brace/theme/github': 'github',
            'brace/theme/gob': 'gob',
            'brace/theme/gruvbox': 'gruvbox',
            'brace/theme/idle_fingers': 'idle_fingers',
            'brace/theme/iplastic': 'iplastic',
            'brace/theme/katzenmilch': 'katzenmilch',
            'brace/theme/kr_theme': 'kr_theme',
            'brace/theme/kuroir': 'kuroir',
            'brace/theme/merbivore': 'merbivore',
            'brace/theme/merbivore_soft': 'merbivore_soft',
            'brace/theme/mono_industrial': 'mono_industrial',
            'brace/theme/monokai': 'monokai',
            'brace/theme/pastel_on_dark': 'pastel_on_dark',
            'brace/theme/solarized_dark': 'solarized_dark',
            'brace/theme/solarized_light': 'solarized_light',
            'brace/theme/sqlserver': 'sqlserver',
            'brace/theme/terminal': 'terminal',
            'brace/theme/textmate': 'textmate',
            'brace/theme/tomorrow': 'tomorrow',
            'brace/theme/tomorrow_night': 'tomorrow_night',
            'brace/theme/tomorrow_night_blue': 'tomorrow_night_blue',
            'brace/theme/tomorrow_night_bright': 'tomorrow_night_bright',
            'brace/theme/tomorrow_night_eighties': 'tomorrow_night_eighties',
            'brace/theme/twilight': 'twilight',
            'brace/theme/vibrant_ink': 'vibrant_ink',
            'brace/theme/xcode': 'xcode'
        }, 'tomorrow_night_eighties')
        return <div className='mgt-10' style={{ height: 200 }}>
            <CodeEditor value='test'
                mode='ace/mode/groovy'
                loadTime={-1}
                docId='code-editor'
            />
        </div>
    }))
    .add('KeyValueEditor', withDocs(keyValueEditorReadme, () => {
        const values = {
            'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
            'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }
        }

        return <KeyValueEditor id="treeComponentExemple"
            handleChange={keyValues => action('handleChange')}
            keyValues={values}
            locale='en-US'
        />
    }))
    // .add('Tree', withDocs(treeReadme, () => {
    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Tree</h2>

    //             <p><i className='fa fa-flag-checkered warning-color mgr-5' />Work in progress<i className='fa fa-flag-checkered warning-color mgl-5' /></p>
    //             <p>Tree component has some issues and don't allow others stories to load</p>
    //             {/* <Tree id="treeComponentExemple" data={data.treeData} locale='en-US' /> */}
    //         </div>
    //     )
    // }))
    // .add('KeyValueEditor', () => {
    //     const values = {
    //         'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
    //         'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }
    //     }

    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>KeyValue Editor</h2>
    //             <div className='tile'>
    //                 <KeyValueEditor id="treeComponentExemple" handleChange={keyValues => action('handleChange')} keyValues={values} locale='en-US' />
    //             </div>
    //         </div>
    //     )
    // })
    // .add('Helpers', () => {

    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Helpers</h2>
    //             <p className='italic'><i className='fa fa-info-circle info-color mgr-5' />Helpers are method that are used in others compenents, read the README in order to get more informations.</p>

    //         </div>
    //     )
    // })
