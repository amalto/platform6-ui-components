import * as React from 'react'
import * as ace from 'brace'

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

module CodePreview {

    export interface Props extends React.Props<CodePreview> {
        id: string;
        mode?: string;
        theme?: string;
        value: string;
    }
}

class CodePreview extends React.Component<CodePreview.Props, any> {

    private _editorPanel: HTMLDivElement
    private _editor: AceEditor

    constructor( props: CodePreview.Props ) {
        super( props )
    }

    render() {
        return (
            <div className='mgb-20' style={{ width: '100%', position: 'relative' }}
                id={this.props.id}
                ref={( c ) => this._editorPanel = c}>
            </div>
        )
    }

    componentDidMount() {

        this._editor = ace.edit( this.props.id )
        this._editor.$blockScrolling = Infinity
        this._editor.setShowPrintMargin( false )

        this._editor.setValue( this.props.value )
        this._editor.clearSelection()
        this.setEditorSession( this._editor, this.props )
        this.setEditorOptions( this._editor, this.props )
        this._editor.setReadOnly( true )
    }

    componentWillUnmount() {
        //destroy the editor
        this._editor && this._editor.destroy()
    }

    private setEditorSession( editor: AceEditor, props: CodePreview.Props ) {
        editor.getSession().setMode( props.mode && `ace/mode/${ props.mode }` || 'ace/mode/javascript' )
    }

    private setEditorOptions = ( editor: AceEditor, props: CodePreview.Props ) => {

        editor.setTheme( props.theme || 'ace/theme/tomorrow_night_eighties' )
        editor.renderer.setShowGutter( false )
        editor.getSession().setUseWrapMode( false )
        editor['setDisplayIndentGuides']( true )
        editor.renderer['$cursorLayer'].element.style.display = "none"
        editor.setHighlightActiveLine( false )
        editor.setOption( 'maxLines', Infinity )
    }
}

export default CodePreview