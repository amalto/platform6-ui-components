import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import CodeEditor from '../typescript/index'

storiesOf('CodeEditor', module)
    .add('Exemple', () => {
        return <div className='mgt-10' style={{ height: 200 }}>
            <CodeEditor value='test'
                mode='ace/mode/groovy'
                loadTime={-1}
                docId='code-editor'
            />
        </div>
    })
