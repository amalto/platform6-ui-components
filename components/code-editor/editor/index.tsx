import * as ace from 'brace'

import { AceSession, UserModel } from '@amalto/typings'
import { EditorOptions } from '../models/EditorOptions'
import { Settings } from '../models/Settings'

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

export default class Editor {

    // Editor instance
    private _editor: AceEditor = null;
    private _aceSession: AceSession = null;
    private _editorDiv: HTMLDivElement = null;
    private _options: EditorOptions = {
        readonly: false,
        mode: 'ace/mode/javascript'
    };

    // Hidden attributes
    private _firstChangeTime: number = -1;
    private _canUpdate: boolean = false;
    private _cursorLastPosition: { row: number, column: number } = { row: 0, column: 0 };

    // Attributes

    /** Code editor onchange event handler. */
    private _editorOnChange?: ( value: string, session?: AceSession ) => void;
    /** Save ace session after each update. */
    private _saveSession: ( session: AceSession ) => void;
    /** Force save with keyboard shortcuts <span className='quote'>Ctrl + s</span> or <span className='quote'>Cmd + s</span>. */
    private _saveContent?: ( session: AceSession ) => void;
    /** Force save with keyboard shortcuts <span className='quote'>Shift + Ctrl + s</span> or <span className='quote'>Shift + Cmd + s</span>. */
    private _saveMultipleContent?: ( session: AceSession ) => void;
    /** Callback executed at first load and after every reload (loadTime changes) */
    private _loadedCallback?: ( editor: ace.Editor ) => void;
    /** Editor height. */
    private _height?: number | string;
    /** Initial content of the editor. */
    private _value: string = '';
    /** Initial load time of editor. If the new loadTime is at a later date, the editor will be updated. */
    private _loadTime: number;
    /** Preferred user's displaySettings. Set on the user profile, you can provide the userJson object but shouldn't modify this value. More details on [UserModel](#usermodel). */
    private _userJson?: UserModel.JsonContent = {};
    /** Editor visual settings. More details on [Settings](#codeeditorinputsettings). */
    private _displaySettings?: Settings = {};

    constructor(
        aceSession?: AceSession,
        options?: EditorOptions,
        saveSession?: ( session: AceSession ) => void,
        saveContent?: ( session: AceSession ) => void,
        saveMultipleContent?: ( session: AceSession ) => void,
        editorOnChange?: ( value: string, session?: AceSession ) => void,
        loadedCallback?: ( editor: ace.Editor ) => void
    ) {
        if ( !!aceSession ) this._aceSession = aceSession
        if ( !!options ) this._options = options
        if ( !!saveSession ) this._saveSession = saveSession
        if ( !!editorOnChange ) this._editorOnChange = editorOnChange
        if ( !!loadedCallback ) this._loadedCallback = loadedCallback
        if ( !!saveContent ) this._saveContent = saveContent
        if ( !!saveMultipleContent ) this._saveMultipleContent = saveMultipleContent
    }

    // Getters
    get height(): number | string { return this._height }
    get value(): string { return this._value }
    get loadTime(): number { return this._loadTime }

    get mode(): string { return this._options.mode }
    get readonly(): boolean { return this._options.readonly }

    // Setters
    set editor( editor: AceEditor ) { this._editor = editor }
    set editorDiv( newEditorDiv ) { this._editorDiv = newEditorDiv }
    set aceSession( session: AceSession ) { this._aceSession = session }
    set height( newHeight: number | string ) { this._height = newHeight }
    set value( newValue: string ) { this._value = newValue }
    set loadTime( newLoadTime: number ) { this._loadTime = newLoadTime }
    set userJson( newUserJson: UserModel.JsonContent ) { this._userJson = newUserJson }
    set displaySettings( newDisplaySettings: Settings ) { this._displaySettings = newDisplaySettings }

    set mode( newMode: string ) {
        this._options.mode = newMode
        this._editor.getSession().setMode( newMode && `ace/mode/${ newMode }` )
    }

    // Initialize editor
    public initEditor = ( docId: string ) => {
        this._editor = ace.edit( docId )
        this._editor.$blockScrolling = Infinity
        this._editor.setShowPrintMargin( false )

        this.setEditorSession( this._editor )
        this.setEditorOptions( this._editor )
        this._editor.setReadOnly( this._options.readonly )
        this.setKeyboardShortcuts( this._editor )

        this.resizeEditor()
        !this._options.readonly && this.focus( this._aceSession )

        // Needed to be able to access this from editor onblur event
        const self = $.extend( {}, this )

        this._editor.on( 'blur', function ( e ) {
            const session = self.getAceSession( self._editor )

            if ( self._canUpdate ) {
                self._cursorLastPosition = e.end
                session.cursorPosition = self._cursorLastPosition
                self._saveSession && self._saveSession( session )
                self._canUpdate = false
            }
        } );
    }

    // clean and destry editor from dom
    public cleanup = () => {
        //save current session
        this._saveSession && this._saveSession( $.extend( {}, this.getAceSession( this._editor ), { cursorPosition: this._cursorLastPosition } ) )

        //destroy the editor
        this._editor && this._editor.destroy()
    }

    // Restore ace editor session.
    // Some workaround are needed for the history.
    private restoreSession( editor: AceEditor, data: AceSession ) {

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

    // Set ace session object
    private setEditorSession( editor: AceEditor ) {

        //set new session
        if ( this._aceSession ) {
            this.restoreSession( editor, this._aceSession )
            !this._options.readonly && this.focus( this._aceSession )
        }
        else {

            editor.setValue( this._value as string, -1 )
            const session = ace.createEditSession( this._value, undefined )

            editor.setSession( session )

            //make sure the store is updated with the new session
            !!this._saveSession && this._saveSession( this.getAceSession( editor ) )
        }

        editor.getSession().setMode( this._options.mode && `ace/mode/${ this._options.mode }` )

        editor.getSession().on( 'change', e => {
            if ( this._firstChangeTime <= this._loadTime ) {
                this._firstChangeTime = new Date().getTime()
            }

            this._canUpdate = true
            this._cursorLastPosition = e.end

            this._editorOnChange && setTimeout( () => {
                this._editorOnChange( this._editor.getValue(), $.extend( {}, this.getAceSession( this._editor ), { cursorPosition: e.end } ) )
            }, 0 )
        } )
        this._firstChangeTime = this._loadTime

        !!this._loadedCallback && this._loadedCallback( editor )
    }

    // Set editor options like mode, theme, is wrapped, etc...
    private setEditorOptions = ( editor: AceEditor ) => {

        const userSettings: Settings = this._userJson && this._userJson.codeEditorSettings || {}

        const displaySettings = this._displaySettings || {}

        editor.setTheme( displaySettings.theme && `ace/theme/${ displaySettings.theme }` || 'ace/theme/tomorrow_night_eighties' )

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

    // Set keyboard event handlers
    private setKeyboardShortcuts = ( editor: AceEditor ): void => {

        // Shortcut to save current ace session.
        editor.commands.addCommand( {
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: ( currentEditor ) => {
                if ( !!currentEditor ) {
                    this._saveContent && this._saveContent( $.extend( {}, this.extractAceSession( currentEditor ), {
                        savable: this.isSessionSavable( currentEditor ),
                        cursorPosition: currentEditor.getCursorPosition()
                    } ) )
                }

            }
        } )

        // Shorcut to save multiple ace session.
        editor.commands.addCommand( {
            name: 'save all',
            bindKey: { win: 'Shift-Ctrl-S', mac: 'Shift-Command-S' },
            exec: ( currentEditor ) => {
                this._saveMultipleContent && this._saveMultipleContent( $.extend( {}, this.extractAceSession( currentEditor ), {
                    savable: this.isSessionSavable( currentEditor ),
                    cursorPosition: currentEditor.getCursorPosition()
                } ) )
            }
        } )
    }

    // Focus current ace session
    private focus( session: AceSession ) {
        if ( !!session ) this._editor.moveCursorToPosition( session.cursorPosition )
        this._editor.focus()
    }

    //see http://stackoverflow.com/questions/28257566/ace-editor-save-send-session-on-server-via-post
    private getAceSession = ( editor: AceEditor ): AceSession => {
        return this.extractAceSession( editor )
    }

    // Get ace session from editor
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

    // Check if the ace session contain errors
    private isSessionSavable = ( editor: AceAjax.Editor ): boolean => {
        const annotations: AceAjax.Annotation[] = editor.getSession().getAnnotations()
        let isSavable: boolean = true

        if ( annotations.length === 0 ) { isSavable = true }
        else {
            annotations.forEach( a => {
                isSavable = a.type === 'error' ? false : isSavable
            } )
        }

        return isSavable
    }

    // Automatically resize editor component to content if no height is provided with a max height of 20 lines.
    // If height is provided set editor height.
    public resizeEditor = (): void => {

        // let h = Math.max( document.documentElement.clientHeight, window.innerHeight || 0 )

        if ( this._height ) {
            $( this._editorDiv ).height( this._height )
        }
        else {
            this._editor.setOptions( {
                minLines: 2,
                maxLines: 20
            } )
        }

        this._editor.resize( true )
    }
}