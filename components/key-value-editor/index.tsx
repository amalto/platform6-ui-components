// Modules
import * as React from 'react'
import * as base64 from 'base-64'
import * as uuid from 'uuid'

// Components
import KeyInput from './components/KeyInput'

// Utils
import { getWordings, isValidKeyChar, downloadDataFile, base64Decode } from '@amalto/helpers'

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
        [idx: string]: {
            key: string;
            value: string;
            contentType: string;
            contentBytes: string;
        };
    }

    export interface KeyValStoreDef {
        [idx: string]: {
            value: string;
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
            wordings: getWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { wordings } = this.state

        const { readonly } = this.props

        let keyValueStore = this.getKeyValueStore( this.props.keyValues )

        let inputs = Object.keys( keyValueStore ).map( idx => {

            return (
                <KeyInput key={idx}
                    dataIdx={idx}
                    keyValueStore={keyValueStore}
                    readonly={readonly}
                    removeKeyValue={this.removeKeyValue}
                    handleKeyChange={this.handleKeyChange}
                    handleValueChange={this.handleValueChange}
                    handleFileUpload={this.handleFileUpload}
                    downloadFile={this.downloadFile}
                    keyAlreadyUsed={this.keyAlreadyUsed}
                    locale={this.props.locale}
                />
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

        let idx = uuid.v4()

        keyValueStore[idx] = {
            value: '',
            key: '',
            contentType: file === true ? 'application/octet-stream' : 'text/plain',
            contentBytes: ''
        }

        this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
    }

    private removeKeyValue = ( event: any ) => {
        let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( this.props.keyValues ) )
        const idx: string = event.currentTarget.getAttribute( 'data-idx' )

        delete keyValuesUpdate[idx]

        this.props.handleChange( keyValuesUpdate )
    }

    private handleKeyChange = ( event: any ) => {
        if ( isValidKeyChar( event.target.value ) || !event.target.value ) {
            let idx = event.currentTarget.getAttribute( 'data-idx' )
            let keyValueStore = this.getKeyValueStore( this.props.keyValues )

            keyValueStore[idx] = {
                value: keyValueStore[idx].value,
                key: event.target.value,
                contentType: keyValueStore[idx].contentType,
                contentBytes: keyValueStore[idx].contentBytes
            }

            this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
        }
    }

    private handleValueChange = ( event: any ) => {
        let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( this.props.keyValues ) )
        const idx: string = event.currentTarget.getAttribute( 'data-idx' )
        const value: string = event.target.value

        keyValuesUpdate[idx].value = value
        keyValuesUpdate[idx].contentBytes = base64.encode( value )

        this.props.handleChange( keyValuesUpdate )
    }

    private handleFileUpload = ( event: any ): void => {
        // const value: string = event.currentTarget.getAttribute( 'data-value' )
        const idx = event.currentTarget.getAttribute( 'data-idx' )

        let reader = new FileReader()
        const file: File = event.target.files[0]
        const isTextPlain = file.type && file.type === 'text/plain'

        reader.onload = () => {
            try {
                const fileContent: string = reader.result as string
                let fileData: string = ''

                if ( isTextPlain ) {
                    fileData = fileContent
                }
                else if ( fileContent.split( ',' ).length === 2 ) {
                    fileData = fileContent.split( ',' )[1]
                }

                let keyValueStore = this.getKeyValueStore( this.props.keyValues )

                keyValueStore[idx].value = file.name || 'default_file_' + idx
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

        for ( var key in keyValues ) {
            kvStore[key] = {
                key: keyValues[key].key,
                value: base64Decode( keyValues[key].contentBytes ),
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

            keyValues[idx] = {
                key: keyVal.key,
                value: keyValues[keyVal.key]
                    && keyValues[keyVal.key] && base64Decode( keyValues[keyVal.key].contentBytes )
                    || '',
                contentType: keyVal.contentType,
                contentBytes: keyVal.contentBytes
            }
        }

        return keyValues
    }

    // Input validation
    private keyAlreadyUsed = ( idx: string, key: string ): boolean => {
        const keyValuesWithoutCurrentKey = $.extend( {}, this.props.keyValues )

        delete keyValuesWithoutCurrentKey[idx]

        const keys: string[] = Object.keys( keyValuesWithoutCurrentKey ).map( id => (
            keyValuesWithoutCurrentKey[id].key
        ) )

        return keys.some( k => k === key )
    }

}

export default KeyValueEditor