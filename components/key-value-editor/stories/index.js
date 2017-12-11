import React from 'react';
import * as base64 from 'base-64'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { KeyValueEditor } from '../typescript/index'

storiesOf('KeyValueEditor', module)
    .add('Exemple', () => {
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
