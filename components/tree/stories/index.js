import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Tree } from '../typescript/index'

const data = require('./data.json')

storiesOf('Tree', module)
    .add('Exemple', () => {
        console.info('data => ', data.treeData)

        return (
            <div className='mgt-10'>
                <Tree id="treeComponentExemple" data={data.treeData} locale='en-US' />
            </div>
        )
    })
