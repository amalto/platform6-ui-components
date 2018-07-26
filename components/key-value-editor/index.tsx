// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Utils
import { compileWordings, isValidKeyChar, downloadDataFile } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

/**
 * Map component where you can assiociate keys with texts or files.
 *
 * KeyValueEditor uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
namespace KeyValueEditor {

    export interface KeyValDef {
        [key: string]: {
            contentType: string;
            contentBytes: string;
        };
    }

    export interface KeyValStoreDef {
        [idx: string]: {
            key: string;
            contentType: string;
            contentBytes: string
        }
    }

    export interface Props extends React.ClassAttributes<KeyValueEditor> {
        /** Handle values changes. More details on [KeyValDef](#keyvaldef). */
        handleChange: ( keyValues: KeyValDef ) => void;
        /** Current keyValues data. */
        keyValues: KeyValDef
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
        /** Whether or not the editor is active. */
        readonly?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<KeyValueEditor>;
    }

    export interface State {
        wordings?: { [key: string]: string };
    }
}

declare type KeyValDef = KeyValueEditor.KeyValDef
declare type KeyValStoreDef = KeyValueEditor.KeyValStoreDef

class KeyValueEditor extends React.Component<KeyValueEditor.Props, KeyValueEditor.State> {

    constructor( props: KeyValueEditor.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { wordings } = this.state

        const { readonly } = this.props

        let keyValueStore = this.getKeyValueStore( this.props.keyValues )

        let inputs = Object.keys( keyValueStore ).map( idx => {

            let keyVal = keyValueStore[idx]

            return (
                <div className="row" key={idx}>

                    {!readonly ? <div className="form-group col-xs-2 text-center" style={{ paddingRight: 0 }}>
                        <span className="fas fa-minus-circle danger-color control-align click-pointer"
                            data-key={keyVal.key} onClick={this.removeKeyValue} />
                    </div> : null}

                    <div className="form-group col-xs-5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <input type="text" className="form-control"
                                    value={keyVal.key}
                                    disabled={readonly}
                                    onChange={this.handleKeyChange}
                                    data-idx={idx}
                                    placeholder={wordings.key}
                                />
                            ) : (
                                    <span className="control-align">
                                        {keyVal.key || wordings.selectFile}
                                    </span>
                                )
                        }
                    </div>

                    <div className="form-group col-xs-5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <textarea className="form-control"
                                    value={keyVal.contentBytes}
                                    disabled={readonly}
                                    onChange={this.handleValueChange}
                                    data-key={keyVal.key}
                                    placeholder={wordings.value}
                                />
                            ) : (
                                    keyVal.contentBytes ? (
                                        <button type="button" className="btn btn-info btn-trans" onClick={() => this.downloadFile( keyVal.key )}>
                                            <span className="fas fa-download right-spaced" />
                                            <span>{wordings.download}</span>
                                        </button>
                                    ) : (
                                            <span className="btn btn-block upload-btn btn-font btn-trans">
                                                <span className="fas fa-upload right-spaced" />
                                                <span>{wordings.uploadFile}</span>
                                                <input type="file" className="upload-input" onChange={this.handleFileUpload} data-idx={idx} data-key={keyVal.key} />
                                            </span>
                                        )
                                )
                        }
                    </div>

                </div>
            )
        } )

        return (
            <div>

                {inputs}

                {!readonly ? ( <div>
                    <button type="button" className="btn btn-trans btn-info right-margin" onClick={this.addKeyValue.bind( this )}
                        data-toggle="tooltip" data-original-title={wordings.addTextProperty}>
                        <span className="fas fa-plus right-spaced" />
                        <span className="fas fa-font" />
                    </button>
                    <button type="button" className="btn btn-trans btn-info" onClick={this.addKeyValue.bind( this, true )}
                        data-toggle="tooltip" data-original-title={wordings.addFileProperty}>
                        <span className="fas fa-plus right-spaced" />
                        <span className="far fa-file" />
                    </button>
                </div> ) : null}

            </div>
        )

    }

    private downloadFile = ( key: string ) => {
        downloadDataFile( this.props.keyValues[key].contentBytes, this.props.keyValues[key].contentType, key )
    }

    private addKeyValue = ( file?: boolean ) => {
        let keyValueStore = this.getKeyValueStore( this.props.keyValues )

        let idx = Object.keys( keyValueStore ).length

        keyValueStore[( idx + 1 ).toString()] = {
            key: '',
            contentType: file === true ? 'application/octet-stream' : 'text/plain',
            contentBytes: ''
        }

        this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
    }

    private removeKeyValue = ( event: any ) => {
        let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( this.props.keyValues ) )
        const key: string = event.currentTarget.getAttribute( 'data-key' )

        delete keyValuesUpdate[key]

        this.props.handleChange( keyValuesUpdate )
    }

    private handleKeyChange = ( event: any ) => {
        if ( isValidKeyChar( event.target.value ) || !event.target.value ) {
            let idx = event.currentTarget.getAttribute( 'data-idx' )
            let keyValueStore = this.getKeyValueStore( this.props.keyValues )

            keyValueStore[idx] = {
                key: event.target.value,
                contentType: keyValueStore[idx].contentType,
                contentBytes: keyValueStore[idx].contentBytes
            }

            this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
        }
    }

    private handleValueChange = ( event: any ) => {
        let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( this.props.keyValues ) )
        const key: string = event.currentTarget.getAttribute( 'data-key' )

        keyValuesUpdate[key].contentBytes = event.target.value

        this.props.handleChange( keyValuesUpdate )
    }

    private handleFileUpload = ( event: any ): void => {
        const key: string = event.currentTarget.getAttribute( 'data-key' )
        const idx = event.currentTarget.getAttribute( 'data-idx' )

        let reader = new FileReader()
        const file: File = event.target.files[0]
        const isTextPlain = file.type && file.type === 'text/plain'

        reader.onload = ( e: any ) => {
            try {
                const fileContent: string = reader.result
                let fileData: string = ''

                if ( isTextPlain ) {
                    fileData = fileContent
                }
                else if ( fileContent.split( ',' ).length === 2 ) {
                    fileData = fileContent.split( ',' )[1]
                }

                let keyValueStore = this.getKeyValueStore( this.props.keyValues )

                keyValueStore[idx].key = file.name || 'default_file_' + idx
                keyValueStore[idx].contentBytes = fileData

                if ( file.type ) {
                    keyValueStore[idx].contentType = file.type
                }

                this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
            }
            catch ( error ) {
                console.log( 'File reading error: ', error )
            }
        }

        if ( file ) {
            if ( isTextPlain ) {
                reader.readAsText( file )
            }
            else {
                reader.readAsDataURL( file )
            }
        }
    }

    private getKeyValueStore = ( keyValues: KeyValDef ): KeyValStoreDef => {
        let kvStore = {} as KeyValStoreDef
        let i = 0

        for ( var key in keyValues ) {
            i++
            kvStore[i] = {
                key: key,
                contentType: keyValues[key].contentType,
                contentBytes: keyValues[key].contentBytes
            }
        }

        return kvStore
    }

    private getKeyValuesObject = ( keyValueStore: KeyValStoreDef ): KeyValDef => {
        let keyValues = {} as KeyValDef

        for ( let idx in keyValueStore ) {
            let keyVal = keyValueStore[idx]

            keyValues[keyVal.key] = {
                contentType: keyVal.contentType,
                contentBytes: keyVal.contentBytes
            }
        }

        return keyValues
    }

}

export default KeyValueEditor