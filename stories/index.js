import React from 'react';

/**
 * Storybook addons
 */
import { storiesOf, configure } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withReadme, withDocs } from 'storybook-readme'

/**
 * External modules
 */
import * as base64 from 'base-64'

/**
 * Components
 */
import ActionButton from 'action-button'
import { Tree } from 'tree'
import { KeyValueEditor } from 'key-value-editor'
import { Helper } from 'helpers'

const data = require('./data.json')

/**
 * Readme files
 */
import actionButtonReadme from './documentation/ActionButton.md'
import treeReadme from './documentation/Tree.md'

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
storiesOf('Component', module)
    .addDecorator(centerDecorator)
    .addDecorator(withReadme(actionButtonReadme))
    .add('ActionButton', () => {
        return <div>
            <div className='form-group'>
                <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>ActionButton</h2>
                <h4>Transparent background</h4>
                <ActionButton btnClass='btn btn-trans btn-info mgt-10 mgr-5'
                    iconClass='fa fa-info'
                    tooltipText='Info button'
                    clickAction={action('transparent info button')}
                />
                <ActionButton btnClass='btn btn-trans btn-danger mgt-10 mgr-5'
                    iconClass='fa fa-trash'
                    clickAction={action('transparent danger button')}
                    tooltipText='Danger button'
                />
                <ActionButton btnClass='btn btn-trans btn-warning mgt-10 mgr-5'
                    iconClass='fa fa-exclamation'
                    clickAction={action('transparent warning button')}
                    tooltipText='Warning button'
                />
                <ActionButton btnClass='btn btn-trans btn-primary mgt-10 mgr-5'
                    iconClass='fa fa-check'
                    clickAction={action('transparent primary button')}
                    tooltipText='Primary button'
                />
                <ActionButton btnClass='btn btn-trans btn-font mgt-10 mgr-5'
                    iconClass='fa fa-shield'
                    clickAction={action('transparent font button')}
                    tooltipText='Default button'
                />
            </div>

            <div className='form-group'>
                <h4 className='mgt-10'>Colored background</h4>
                <ActionButton btnClass='btn btn-info mgt-10 mgr-5'
                    iconClass='fa fa-info'
                    clickAction={action('colored info button')}
                    tooltipText='Info button'
                />
                <ActionButton btnClass='btn btn-danger mgt-10 mgr-5'
                    iconClass='fa fa-trash'
                    clickAction={action('colored danger button')}
                    tooltipText='Danger button'
                />
                <ActionButton btnClass='btn btn-warning mgt-10 mgr-5'
                    iconClass='fa fa-exclamation'
                    clickAction={action('colored warning button')}
                    tooltipText='Warning button'
                />
                <ActionButton btnClass='btn btn-primary mgt-10 mgr-5'
                    iconClass='fa fa-check'
                    clickAction={action('colored primary button')}
                    tooltipText='Primary button'
                />
                <ActionButton btnClass='btn btn-font mgt-10 mgr-5'
                    iconClass='fa fa-shield'
                    clickAction={action('colored font button')}
                    tooltipText='Default button'
                />
            </div>
        </div>
    })
    .add('Tree', withReadme(treeReadme, () => {
        return (
            <div className='mgt-10'>
                <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Tree</h2>

                <p><i className='fa fa-flag-checkered warning-color mgr-5' />Work in progress<i className='fa fa-flag-checkered warning-color mgl-5' /></p>
                <p>Tree component has some issues and don't allow others stories to load</p>
                {/* <Tree id="treeComponentExemple" data={data.treeData} locale='en-US' /> */}
            </div>
        )
    }))
    .add('KeyValueEditor', () => {
        const values = {
            'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
            'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }
        }

        return (
            <div className='mgt-10'>
                <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>KeyValue Editor</h2>
                <div className='tile'>
                    <KeyValueEditor id="treeComponentExemple" handleChange={keyValues => action('handleChange')} keyValues={values} locale='en-US' />
                </div>
            </div>
        )
    })
    .add('Helpers', () => {

        return (
            <div className='mgt-10'>
                <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Helpers</h2>
                <p className='italic'><i className='fa fa-info-circle info-color mgr-5' />Helpers are method that are used in others compenents, read the README in order to get more informations.</p>

            </div>
        )
    })
