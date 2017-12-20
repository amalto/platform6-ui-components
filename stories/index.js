import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withReadme, withDocs } from 'storybook-readme'

import * as base64 from 'base-64'

import ActionButton from 'action-button'
import { Tree } from 'tree'
import { KeyValueEditor } from 'key-value-editor'
import { Helper } from 'helpers'

const data = require('./data.json')

/**
 * Readme files
 */
import actionButtonReadme from './documentation/ActionButton.md'

const centerDecorator = (storyFn) => (
    <div className='container-fluid'>
        {storyFn()}
    </div>
)

storiesOf('Component', module)
    .addDecorator(centerDecorator)
    .add('ActionButton', withReadme(actionButtonReadme, () => {
        return <div>
            <div className='form-group'>
                <h4 className='mgt-10'>Transparent background</h4>
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
    }))
    .add('Tree', () => {
        return (
            <div className='mgt-10'>
                <Tree id="treeComponentExemple" data={data.treeData} locale='en-US' />
            </div>
        )
    })
    .add('KeyValueEditor', () => {
        const values = {
            'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
            'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }

        }

        return (
            <div className='mgt-10'>
                <KeyValueEditor id="treeComponentExemple" handleChange={keyValues => action('handleChange')} keyValues={values} locale='en-US' />
            </div>
        )
    })
    .add('Helpers', () => {

        return (
            <div className='mgt-10'>
                <h4>Methods</h4>

            </div>
        )
    })
