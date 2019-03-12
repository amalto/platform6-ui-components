/**
 *  Created by Christopher VUONG
 *  Extend from XmlEditor
 */

// Modules
import * as React from 'react'
import * as ace from 'brace'
import { AceSession, UserModel } from '@amalto/typings'

import { EditorOptions } from './models/EditorOptions'
import { Settings } from './models/Settings'

import Editor from './editor'

/**
 * CodeEditor used outside a form.
 */
module CodeEditor {

    /**
     * CodeEditor properties
     */
    export interface Props {
        /** Editor height. */
        height?: number | string;
        /** Initial content of the editor. */
        value: string;
        /**
         * Editor language mode.
         * @default javascript
         */
        mode: string;
        /** Move the editor and cursor to end of file after updating. */
        moveToEndOfFile?: boolean;
        /**
         * If true don't allow user to edit content.
         * @default false
         */
        readonly?: boolean;
        /** Editor visual settings. More details on [Settings](#codeeditorinputsettings). */
        displaySettings?: Settings;
        /** Initial load time of editor. If the new loadTime is at a later date, the editor will be updated. */
        loadTime: number;
        /** Force use of saveSession props. */
        forceSave?: boolean;
        /** @deprecated loadTime property will be used instead in next release. */
        resetTick?: number;
        /** Editor ace session. More details on [AceSession](#acesession). */
        aceSession?: AceSession;
        /** Unique editor id. */
        docId: string;
        /** Preferred user's displaySettings. Set on the user profile, you can provide the userJson object but shouldn't modify this value. More details on [UserModel](#usermodel). */
        userJson?: UserModel.JsonContent;
        /** Code editor onchange event handler. */
        editorOnChange?: ( value: string, session?: AceSession ) => void;
        /** Save ace session after each update. */
        saveSession?: ( session: AceSession ) => void;
        /**
         * Force save with keyboard shortcuts <span className='quote'>Ctrl + s</span> or <span className='quote'>Cmd + s</span>.
         */
        saveContent?: ( session: AceSession ) => void;
        /**
         * Force save with keyboard shortcuts <span className='quote'>Shift + Ctrl + s</span> or <span className='quote'>Shift + Cmd + s</span>.
         */
        saveMultipleContent?: ( session: AceSession ) => void;
        /**
         * Callback executed at first load and after every reload (loadTime changes)
         */
        loadedCallback?: ( editor: ace.Editor ) => void;
    }
}

/**
 * Editor used outside a form. Principally used to display readable only exemple,
 * but can also keep current editor state if needed.
 */
function CodeEditor( props: CodeEditor.Props ) {
    const style: React.CSSProperties = { width: '100%', position: 'relative' }
    const [editor, setEditor] = React.useState( null )
    const editorDiv = React.useRef( null )

    // Construct editor
    React.useEffect( () => {
        const options: EditorOptions = {
            readonly: props.readonly,
            mode: props.mode
        }

        const newEditor: Editor = new Editor(
            props.aceSession, options,
            props.saveSession, props.saveContent, props.saveMultipleContent,
            props.editorOnChange, props.loadedCallback
        )

        newEditor.height = props.height
        newEditor.value = props.value
        newEditor.loadTime = props.loadTime
        newEditor.userJson = props.userJson
        newEditor.displaySettings = props.displaySettings

        newEditor.initEditor( props.docId )
        window.addEventListener( 'resize', () => newEditor.resizeEditor() )
        setEditor( newEditor )

        return function cleanup() {
            window.removeEventListener( 'resize', () => newEditor.resizeEditor() )
            newEditor.cleanup()
        }
    }, [] )

    // Component did update
    React.useEffect( () => {
        if ( !!editor ) {
            !!props.readonly && editor.focus()
            editor.editorDiv = editorDiv
        }

    } )

    // Update editor mode
    React.useEffect( () => {
        if ( !!editor ) { editor.mode = props.mode }
    }, [props.mode] )

    // Set container height if provided
    if ( !!props.height ) { style.height = props.height }

    return (
        <div style={style}
            id={props.docId}
            ref={editorDiv}>
        </div>
    )
}

export default CodeEditor
