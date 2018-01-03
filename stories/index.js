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
        }, '')

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
        const codeEditorData = data.codeEditor

        const theme = select('theme', codeEditorData.themes, codeEditorData.defaultTheme)
        const mode = select('mode', codeEditorData.modes, codeEditorData.defaultMode)

        return <div style={{ height: 200 }}>
            <CodeEditor value='test'
                mode={mode}
                loadTime={-1}
                docId='code-editor'
                displaySettings={{
                    theme
                }}
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
