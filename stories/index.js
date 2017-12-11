import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import * as base64 from 'base-64'

import ActionButton from 'action-button'
import { Tree } from 'tree'
import { KeyValueEditor } from 'key-value-editor'

const data = require('./data.json')

storiesOf('Components', module)
    .add('ActionButton', () => {
        return (
            <div>
                <div className='form-group'>
                    <h4 className='mgt-10'>Transparent background</h4>
                    <ActionButton btnClass='btn btn-trans btn-info mgt-10 mgr-5'
                        iconClass='fa fa-info'
                        tooltipText='Info button'
                        onClick={action('transparent info button')}
                    />
                    <ActionButton btnClass='btn btn-trans btn-danger mgt-10 mgr-5'
                        iconClass='fa fa-trash'
                        onClick={action('transparent danger button')}
                        tooltipText='Danger button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-warning mgt-10 mgr-5'
                        iconClass='fa fa-exclamation'
                        onClick={action('transparent warning button')}
                        tooltipText='Warning button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-primary mgt-10 mgr-5'
                        iconClass='fa fa-check'
                        onClick={action('transparent primary button')}
                        tooltipText='Primary button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-font mgt-10 mgr-5'
                        iconClass='fa fa-shield'
                        onClick={action('transparent font button')}
                        tooltipText='Default button'
                    />
                </div>

                <div className='form-group'>
                    <h4 className='mgt-10'>Colored background</h4>
                    <ActionButton btnClass='btn btn-info mgt-10 mgr-5'
                        iconClass='fa fa-info'
                        onClick={action('colored info button')}
                        tooltipText='Info button'
                    />
                    <ActionButton btnClass='btn btn-danger mgt-10 mgr-5'
                        iconClass='fa fa-trash'
                        onClick={action('colored danger button')}
                        tooltipText='Danger button'
                    />
                    <ActionButton btnClass='btn btn-warning mgt-10 mgr-5'
                        iconClass='fa fa-exclamation'
                        onClick={action('colored warning button')}
                        tooltipText='Warning button'
                    />
                    <ActionButton btnClass='btn btn-primary mgt-10 mgr-5'
                        iconClass='fa fa-check'
                        onClick={action('colored primary button')}
                        tooltipText='Primary button'
                    />
                    <ActionButton btnClass='btn btn-font mgt-10 mgr-5'
                        iconClass='fa fa-shield'
                        onClick={action('colored font button')}
                        tooltipText='Default button'
                    />
                </div>
            </div>
        )
    })
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
                <KeyValueEditor id="treeComponentExemple" handleChange={e => action('handleChange')} keyValues={values} locale='en-US' />
            </div>
        )
    })