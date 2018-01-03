/**
 * Modules
 */
import React from 'react';

/**
 * Addons
 */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react'

/**
 * Components
 */
import CodeEditor from '../typescript/index'

/**
 * Datas
 */
const data = require('./data.json')

let resetTick = -1

storiesOf('CodeEditor', module)
    .addDecorator(withKnobs)
    .add('Exemple', () => {
        const codeEditorData = data.codeEditor
        const mode = select('Mode', codeEditorData.modes, codeEditorData.defaultMode)
        const theme = select('Theme', codeEditorData.themes, codeEditorData.defaultTheme)
        const fontSize = select('Font size', codeEditorData.fontSizes, codeEditorData.defaultFontSize)
        const showInvisibles = boolean('Show invisible characters', false)
        const showGutter = boolean('Show gutter', true)
        const showIndent = boolean('Show indentations', true)
        const wrap = boolean('Wrap', false)
        const readonly = boolean('Readonly', false)

        resetTick = resetTick + 1

        return <div className='mgt-10' style={{ height: 200 }}>
            <CodeEditor value={codeEditorData.value}
                mode={mode}
                loadTime={-1}
                docId='code-editor'
                readonly={readonly}
                displaySettings={{
                    theme,
                    fontSize,
                    showInvisibles,
                    showGutter,
                    showIndent,
                    wrap
                }}
                resetTick={resetTick}
            />
        </div>
    })
