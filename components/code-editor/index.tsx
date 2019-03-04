/**
 *  Created by Christopher VUONG
 *  Extend from XmlEditor
 */

// Modules
import * as React from 'react'
import * as ace from 'brace'
import { AceSession, UserModel } from '@amalto/typings'

/**
 * Ace Editor modules
 */
import 'brace/ext/searchbox'

/**
 * Ace editor mode
 */
import 'brace/mode/csharp'
import 'brace/mode/dockerfile'
import 'brace/mode/groovy'
import 'brace/mode/html'
import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/typescript'
import 'brace/mode/tsx'
import 'brace/mode/xml'
import 'brace/mode/sql'

/**
 * Ace editor theme
 */
import 'brace/theme/ambiance'
import 'brace/theme/chaos'
import 'brace/theme/chrome'
import 'brace/theme/clouds'
import 'brace/theme/clouds_midnight'
import 'brace/theme/cobalt'
import 'brace/theme/crimson_editor'
import 'brace/theme/dawn'
import 'brace/theme/dracula'
import 'brace/theme/dreamweaver'
import 'brace/theme/eclipse'
import 'brace/theme/github'
import 'brace/theme/gob'
import 'brace/theme/gruvbox'
import 'brace/theme/idle_fingers'
import 'brace/theme/iplastic'
import 'brace/theme/katzenmilch'
import 'brace/theme/kr_theme'
import 'brace/theme/kuroir'
import 'brace/theme/merbivore'
import 'brace/theme/merbivore_soft'
import 'brace/theme/mono_industrial'
import 'brace/theme/monokai'
import 'brace/theme/pastel_on_dark'
import 'brace/theme/solarized_dark'
import 'brace/theme/solarized_light'
import 'brace/theme/sqlserver'
import 'brace/theme/terminal'
import 'brace/theme/textmate'
import 'brace/theme/tomorrow'
import 'brace/theme/tomorrow_night'
import 'brace/theme/tomorrow_night_blue'
import 'brace/theme/tomorrow_night_bright'
import 'brace/theme/tomorrow_night_eighties'
import 'brace/theme/twilight'
import 'brace/theme/vibrant_ink'
import 'brace/theme/xcode'

type AceEditor = ace.Editor

/**
 * CodeEditor used outside a form.
 */
module CodeEditor {

    /**
     * CodeEditor properties
     */
    export interface Props extends React.Props<CodeEditor> {
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

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<CodeEditor>;
    }

    export interface Settings {
        theme?: string;
        fontSize?: string;
        fontFamily?: string;
        showInvisibles?: boolean;
        showGutter?: boolean;
        showIndent?: boolean;
        wrap?: boolean;
        highlight?: boolean;
        marker?: Marker;
    }

    export interface Marker {
        row: number;
        column: number;
    }
}

/**
 * Editor used outside a form. Principally used to display readable only exemple,
 * but can also keep current editor state if needed.
 */
class CodeEditor extends React.Component<CodeEditor.Props, any> {
    private _markerId: number = null
    private _firstChangeTime: number
    private _editorPanel: HTMLDivElement
    private _editor: AceEditor

    private _canUpdate: boolean = false
    private _cursorLastPosition: { row: number, column: number } = { row: 0, column: 0 }

    constructor( props: CodeEditor.Props ) {
        super( props )
        this._firstChangeTime = -1

        window.addEventListener( 'resize', () => this.resizeEditor() )
        this._markerId && this._editor.getSession().removeMarker( this._markerId )
    }

    render() {
        const height: number | string = this.props.height

        let style: React.CSSProperties = {
            width: '100%',
            position: 'relative'
        }

        if ( height ) { style.height = height }

        return (
            <div style={style}
                id={this.props.docId}
                ref={dom => this._editorPanel = dom}>
            </div>
        )
    }

    componentDidMount() {

        this._editor = ace.edit( this.props.docId )
        this._editor.$blockScrolling = Infinity
        this._editor.setShowPrintMargin( false )

        this.setEditorSession( this._editor, this.props )
        this.setEditorOptions( this._editor, this.props )
        this._editor.setReadOnly( this.props.readonly )
        this.setKeyboardShortcuts( this._editor, this.props )

        this.resizeEditor()
        !this.props.readonly && this.focus( this.props.aceSession )

        // Needed to be able to access this from editor onblur event
        const self = this

        this._editor.on( 'blur', function ( e ) {
            const session = self.getAceSession( self._editor )

            if ( self._canUpdate ) {
                self._cursorLastPosition = e.end
                session.cursorPosition = self._cursorLastPosition
                self.props.saveSession && self.props.saveSession( session )
                self._canUpdate = false
            }
        } );
    }

    componentWillUnmount() {
        window.removeEventListener( 'resize', () => this.resizeEditor() )

        //save current session
        this.props.saveSession && this.props.saveSession( $.extend( {}, this.getAceSession( this._editor ), { cursorPosition: this._cursorLastPosition } ) )

        //destroy the editor
        this._editor && this._editor.destroy()
    }

    shouldComponentUpdate( nextProps: CodeEditor.Props ) {
        const newDoc = nextProps.docId !== this.props.docId

        if ( this.props.mode !== nextProps.mode && nextProps.mode ) {
            this._editor.getSession().setMode( nextProps.mode && `ace/mode/${ nextProps.mode }` )
        }

        if ( this.props.saveSession && newDoc ) {
            //save previous ACE Session
            this.props.saveSession( this.getAceSession( this._editor ) )
        }

        // const displaySettingsChanged: boolean = this.props.displaySettings !== nextProps.displaySettings
        const doUpdate = ( newDoc || nextProps.loadTime > this._firstChangeTime )

        this._editor.setReadOnly( nextProps.readonly )
        if ( doUpdate ) {

            if ( this.props.height ) {
                $( this._editorPanel ).height( this.props.height )
                this._editor.setOptions( {
                    minLines: 1,
                    maxLines: null
                } )
            }
            else {
                this._editor.setOptions( {
                    minLines: 1,
                    maxLines: 20
                } )
            }

            this._editor.resize( true )
            !nextProps.readonly && this.focus( nextProps.aceSession )
            this.setEditorSession( this._editor, nextProps )
        }
        doUpdate && this.setEditorSession( this._editor, nextProps )
        this._markerId && this._editor.getSession().removeMarker( this._markerId )
        this.setEditorOptions( this._editor, nextProps )

        if ( nextProps.moveToEndOfFile ) {
            this._editor.getSelection().moveCursorFileEnd()
            this._editor.scrollToLine( this._editor.getSession().getLength(), false, true, () => this._editor.scrollPageDown() )
        }

        if ( this.props.forceSave !== nextProps.forceSave && nextProps.forceSave ) {
            this.props.saveSession( this.getAceSession( this._editor ) )
        }

        return doUpdate
    }

    componentDidUpdate() {
        !this.props.readonly && this.focus( this.props.aceSession )
    }

    focus( session: AceSession ) {
        session && this._editor.moveCursorToPosition( session.cursorPosition )
        this._editor.focus()
    }

    private resizeEditor = (): void => {

        let h = Math.max( document.documentElement.clientHeight, window.innerHeight || 0 )

        if ( this.props.height ) {
            $( this._editorPanel ).height( this.props.height )
        }
        else {
            this._editor.setOptions( {
                minLines: 2,
                maxLines: 20
            } )
        }

        this._editor.resize( true )
    }

    private setEditorSession( editor: AceEditor, props: CodeEditor.Props ) {

        //set new session
        if ( props.aceSession ) {
            CodeEditor.restoreSession( editor, props.aceSession )
            !props.readonly && this.focus( props.aceSession )
        }
        else {
            //editor.setValue( props.value as string, -1 )
            const session = ace.createEditSession( props.value, undefined )

            editor.setSession( session )
            //make sure the store is updated with the new session
            props.saveSession && props.saveSession( this.getAceSession( editor ) )
        }

        editor.getSession().setMode( props.mode && `ace/mode/${ props.mode }` || 'ace/mode/javascript' )

        editor.getSession().on( 'change', e => {
            if ( this._firstChangeTime <= props.loadTime ) {
                this._firstChangeTime = new Date().getTime()
            }

            this._canUpdate = true
            this._cursorLastPosition = e.end

            this.props.editorOnChange && setTimeout( () => {
                this.props.editorOnChange( this._editor.getValue(), $.extend( {}, this.getAceSession( this._editor ), { cursorPosition: e.end } ) )
            }, 0 )
        } )
        this._firstChangeTime = props.loadTime

        if ( this.props.loadedCallback ) {
            this.props.loadedCallback( editor )
        }
    }

    //see http://stackoverflow.com/questions/28257566/ace-editor-save-send-session-on-server-via-post
    private getAceSession = ( editor: AceEditor ): AceSession => {
        return this.extractAceSession( editor )
    }

    private extractAceSession = ( editor: AceEditor ): AceSession => {
        let session = editor.getSession()
        const filterHistory = ( deltas ) => deltas.filter( d => d.group !== "fold" )

        return {
            cursorPosition: session.getSelection().getCursor(),
            selection: session.selection['toJSON'](),
            value: session.getValue(),
            history: {
                undo: session['$undoManager'].$undoStack.map( filterHistory ),
                redo: session['$undoManager'].$redoStack.map( filterHistory )
            },
            scrollTop: session.getScrollTop(),
            scrollLeft: session.getScrollLeft(),
            options: session['getOptions'](),
            firstChangeTime: this._firstChangeTime
        } as AceSession
    }

    private static restoreSession( editor: AceEditor, data: AceSession ) {

        const session = ace.createEditSession( data.value, undefined )

        session['$undoManager'].$doc = session // workaround for a bug in ace
        session['setOptions']( data.options )
        session['$undoManager'].$undoStack = data.history.undo
        session['$undoManager'].$redoStack = data.history.redo
        session.selection['fromJSON']( data.selection )
        session.setScrollTop( data.scrollTop );

        //Workaround: INCORRECT TYPINGS FOR ACE @types node_module (22 nov. 2016)
        ( session as any ).setScrollLeft( data.scrollLeft )

        editor.setSession( session )
    }

    private setEditorOptions = ( editor: AceEditor, props: CodeEditor.Props ) => {

        const userJson = props.userJson || {}

        const userSettings: CodeEditor.Settings = userJson ? userJson.codeEditorSettings || {} : {}

        const displaySettings = props.displaySettings || {}

        editor.setTheme( displaySettings.theme && `ace/theme/${ displaySettings.theme }` || userSettings.theme || 'ace/theme/tomorrow_night_eighties' )

        editor.setFontSize( displaySettings.fontSize || userSettings.fontSize || '12px' )

        let showInvisibles = false

        if ( displaySettings.showInvisibles !== undefined ) {
            showInvisibles = displaySettings.showInvisibles
        }
        else if ( userSettings.showInvisibles !== undefined ) {
            showInvisibles = userSettings.showInvisibles
        }

        editor.setShowInvisibles( showInvisibles )

        let showGutter = true

        if ( displaySettings.showGutter !== undefined ) {
            showGutter = displaySettings.showGutter
        }
        else if ( userSettings.showGutter !== undefined ) {
            showGutter = userSettings.showGutter
        }

        editor.renderer.setShowGutter( showGutter )

        let wrap = false

        if ( displaySettings.wrap !== undefined ) {
            wrap = displaySettings.wrap
        }
        else if ( userSettings.wrap !== undefined ) {
            wrap = userSettings.wrap
        }

        editor.getSession().setUseWrapMode( wrap )

        let showIndent = false

        if ( displaySettings.showIndent !== undefined ) {
            showIndent = displaySettings.showIndent
        }
        else if ( userSettings.showIndent !== undefined ) {
            showIndent = userSettings.showIndent
        }

        ( editor as any ).setDisplayIndentGuides( showIndent )

        // Not save in user settings
        editor.setHighlightActiveLine( displaySettings.highlight || true )
        displaySettings.fontFamily && editor.setOption( 'fontFamily', displaySettings.fontFamily )

        editor.renderer.setScrollMargin( 8, 8, 0, 0 )
    }

    private isSessionSavable = ( editor: AceAjax.Editor ): boolean => {
        const annotations: AceAjax.Annotation[] = editor.getSession().getAnnotations()
        let isSavable: boolean = true

        if ( annotations.length === 0 ) {
            isSavable = true
        } else {
            annotations.forEach( a => {
                isSavable = a.type === 'error' ? false : isSavable
            } )
        }

        return isSavable
    }

    private setKeyboardShortcuts = ( editor: AceEditor, props: CodeEditor.Props ): void => {

        // Shortcut to save current ace session.
        editor.commands.addCommand( {
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: ( currentEditor ) => {
                props.saveContent && props.saveContent( $.extend( {}, this.extractAceSession( currentEditor ), {
                    savable: this.isSessionSavable( currentEditor ),
                    cursorPosition: currentEditor.getCursorPosition()
                } ) )
            }
        } )

        // Shorcut to save multiple ace session.
        editor.commands.addCommand( {
            name: 'save all',
            bindKey: { win: 'Shift-Ctrl-S', mac: 'Shift-Command-S' },
            exec: ( currentEditor ) => {
                props.saveMultipleContent && props.saveMultipleContent( $.extend( {}, this.extractAceSession( currentEditor ), {
                    savable: this.isSessionSavable( currentEditor ),
                    cursorPosition: currentEditor.getCursorPosition()
                } ) )
            }
        } )
    }
}

export default CodeEditor
