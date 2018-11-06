// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'
import * as uuid from 'uuid'
import * as ace from 'brace'
import { AceSession, UserModel, getUserJson } from '@amalto/typings'

// Components
import Help from '@amalto/help'

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
 * Code editor inputs used on a [redux-form](#reduxform).
 */
namespace CodeEditorInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /**
         * If true don't allow user to edit content.
         * @default false
         */
        readonly?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /**
         * Editor language mode.
         * @default ace/mode/javascript
         */
        mode?: string;
        /**
         * Editor height.
         * @default 300
         */
        height?: number | string;
        /** Editor ace session. More details on [AceSession](#acesession). */
        initSession?: AceSession;
        /**
         * Force save with keyboard shortcuts <span className='quote'>Ctrl + s</span> or <span className='quote'>Cmd + s</span>.
         */
        saveEditorContent?: ( session: AceSession ) => void;
        /**
         * Force save with keyboard shortcuts <span className='quote'>Shift + Ctrl + s</span> or <span className='quote'>Shift + Cmd + s</span>.
         */
        saveMultipleContent?: ( session: AceSession ) => void;
        /** Save ace session after each update. */
        saveSession?: ( session: AceSession ) => void;
        /** Editor visual settings. More details on [Settings](#codeeditorinputsettings). */
        displaySettings?: Settings;
        /** If updated, force update of component. */
        resetTick?: number;
        /** User session informations used to get his editor preferences. More details on [UserModel](#usermodel). */
        user?: UserModel;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<any>;

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }

    export interface Settings {
        theme?: string;
        fontSize?: string;
        showInvisibles?: boolean;
        showGutter?: boolean;
        showIndent?: boolean;
        wrap?: boolean;
    }

    export interface State {

    }
}

class CodeEditorInput extends React.Component<CodeEditorInput.Props, CodeEditorInput.State> {

    constructor( props: CodeEditorInput.Props ) {
        super( props )
        this.state = {

        }
    }

    render() {

        const { format, normalize, parse, validate, warn } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return <Field {...baseFieldProps} {...this.props} component={CodeEditor} />

    }

}

namespace CodeEditor {
    export interface Props extends WrappedFieldProps<any> {
        name: string;
        label?: string;
        readonly?: boolean;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        mode?: string;
        height?: number | string;
        initSession?: AceSession;
        saveEditorContent?: ( session: AceSession ) => void;
        saveMultipleContent?: ( session: AceSession ) => void;
        saveSession?: ( session: AceSession ) => void;
        displaySettings?: CodeEditorInput.Settings;
        resetTick?: number;
        user?: UserModel;
    }

    export interface State {
        editorId?: string;
        editorInstance?: AceEditor;
    }
}

class CodeEditor extends React.Component<CodeEditor.Props, CodeEditor.State> {

    private editorCtn: HTMLDivElement;
    private aceSession: AceAjax.IEditSession = null;

    constructor( props: CodeEditor.Props ) {
        super( props )
        this.state = {
            editorId: uuid.v4()
        }
        this.editorCtn = undefined
    }

    render() {

        const { label, readonly, help, containerClass, inputClass, height, input, meta } = this.props

        const { editorId } = this.state

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div
                    id={editorId}
                    key={input.name}
                    className={classNames( 'form-control input-block', inputClass )}
                    ref={dom => this.editorCtn = dom}
                    style={height ? { height: height } : null}
                />

                {( meta.touched && !!meta.error ) && <p className="validation-error-message">{meta.error}</p>}

            </div>
        )
    }

    componentDidMount() {
        this.setState( {
            editorInstance: ace.edit( this.state.editorId )
        }, () => {

            const { mode, readonly, initSession, input, displaySettings } = this.props

            const editor = this.state.editorInstance

            editor.getSession().setUndoManager( new ( ace as any ).UndoManager() ) // Typings incomplete, needed to reset undo manager

            editor.$blockScrolling = Infinity

            if ( input.value ) {
                editor.setValue( input.value )
            }

            if ( initSession ) {
                this.restoreSession( editor, initSession )
            }

            editor.getSession().setMode( mode || 'ace/mode/javascript' )

            editor.setShowPrintMargin( false )

            editor.setReadOnly( readonly )

            this.setEditorOptions( editor )

            this.props.saveSession && this.props.saveSession( $.extend( {}, this.getAceSession(), {
                savable: this.isSessionSavable( editor )
            } ) )

            editor.commands.addCommand( {
                name: 'save',
                bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                exec: ( currentEditor ) => {
                    this.props.saveEditorContent && this.props.saveEditorContent( $.extend( {}, initSession, {
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
                    this.props.saveMultipleContent && this.props.saveMultipleContent( $.extend( {}, initSession, {
                        savable: this.isSessionSavable( currentEditor ),
                        cursorPosition: currentEditor.getCursorPosition()
                    } ) )
                }
            } )

            editor.on( 'change', this.editorOnChange )
        } )
    }

    componentDidUpdate( prevProps: CodeEditor.Props, prevState: CodeEditor.State ) {

        const { editorInstance } = this.state

        const { readonly, displaySettings, height } = this.props

        if ( editorInstance ) {
            if ( prevProps.readonly !== readonly ) {
                editorInstance.setReadOnly( readonly )
            }

            if ( prevProps.displaySettings !== displaySettings ) {
                this.setEditorOptions( editorInstance )
            }

            if ( prevProps.height !== height ) {
                this.setEditorOptions( editorInstance )
            }

            if ( prevProps.resetTick !== this.props.resetTick ) {
                editorInstance.setValue( this.props.input.value )
                editorInstance.clearSelection()
            }
        }


    }

    componentWillUnmount() {

        const { saveSession } = this.props

        const { editorInstance } = this.state

        if ( saveSession && editorInstance ) {
            saveSession( this.getAceSession() )
        }

        if ( editorInstance ) {

            ( editorInstance as any ).removeListener( 'change', this.editorOnChange );

            editorInstance.destroy();

        }

    }

    private setEditorOptions = ( editor: AceEditor ) => {

        const userJson = this.props.user ? getUserJson( this.props.user ) : {}

        const userSettings: CodeEditorInput.Settings = userJson ? userJson.codeEditorSettings || {} : {}

        const displaySettings = this.props.displaySettings || {}

        editor.setTheme( displaySettings.theme || userSettings.theme || 'ace/theme/tomorrow_night_eighties' )

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

        if ( this.props.height ) {
            editor.setOptions( {
                minLines: 1,
                maxLines: null
            } )
        }
        else {
            editor.setOptions( {
                minLines: 1,
                maxLines: 20
            } )
        }

        editor.renderer.setScrollMargin( 8, 8, 0, 0 )

        editor.clearSelection()
    }

    getAceSession = (): AceSession => {
        let session = this.state.editorInstance.session

        const filterHistory = ( deltas ) => deltas.filter( d => d.group !== "fold" )

        return {
            selection: session.selection['toJSON'](),
            value: session.getValue(),
            history: {
                undo: session['$undoManager'].$undoStack.map( filterHistory ),
                redo: session['$undoManager'].$redoStack.map( filterHistory )
            },
            scrollTop: session.getScrollTop(),
            scrollLeft: session.getScrollLeft(),
            options: session['getOptions']()
        } as AceSession
    }

    private restoreSession = ( editor: AceEditor, session: AceSession ): void => {
        const copy: any = ace.createEditSession( session.value, undefined )

        copy['$undoManager'].$doc = copy // workaround for a bug in ace
        copy['$undoManager'].$undoStack = session.history.undo
        copy['$undoManager'].$redoStack = session.history.redo
        copy.setOptions( session.options )
        copy.setScrollTop( session.scrollTop )
        copy.setScrollLeft( session.scrollLeft )

        editor.setSession( copy )
        this.setEditorOptions( editor )
        editor.$blockScrolling = Infinity
        if ( session.cursorPosition ) {
            editor.selection.moveCursorToPosition( session.cursorPosition )
        }
        editor.focus()
        editor.setShowPrintMargin( false )
    }

    private isSessionSavable = ( editor: AceEditor ): boolean => {
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

    private editorOnChange = ( e ): void => {
        const { initSession, input } = this.props
        const editor = this.state.editorInstance

        if ( initSession ) {
            initSession.cursorPosition = e.end
            initSession.value = editor.getValue()
        }

        input.onChange( editor.getValue(), undefined, undefined )
    }
}

export default CodeEditorInput