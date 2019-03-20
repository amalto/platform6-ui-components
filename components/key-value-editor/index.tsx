// Modules
import * as React from 'react'
import * as base64 from 'base-64'
import * as uuid from 'uuid'

// Components
import KeyInput from './components/KeyInput'

// Utils
import { getWordings, isValidKeyChar, downloadDataFile, base64Decode } from '@amalto/helpers'

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

    export interface Props {
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
    }

    export interface State {
        wordings?: { [key: string]: string };
    }
}

declare type KeyValDef = KeyValueEditor.KeyValDef
declare type KeyValStoreDef = KeyValueEditor.KeyValStoreDef

function KeyValueEditor( props: KeyValueEditor.Props ) {
    const [wordings, setWordings] = React.useState( {} as any )

    const { keyValues, handleChange, readonly, locale } = props

    // Set wordings
    React.useEffect( () => {
        setWordings( getWordings( {}, locale ) )
    }, [locale] )

    let keyValueStore = getKeyValueStore( keyValues )

    let inputs = Object.keys( keyValueStore ).map( idx => {

        return (
            <KeyInput key={idx}
                dataIdx={idx}
                keyValueStore={keyValueStore}
                readonly={readonly}
                removeKeyValue={e => { removeKeyValue( e, keyValues, handleChange ) }}
                handleKeyChange={e => { handleKeyChange( e, keyValues, handleChange ) }}
                handleValueChange={e => { handleValueChange( e, keyValues, handleChange ) }}
                handleFileUpload={e => { handleFileUpload( e, keyValues, handleChange ) }}
                downloadFile={key => { downloadFile( key, keyValues ) }}
                keyAlreadyUsed={( id, key ) => keyAlreadyUsed( id, key, keyValues )}
                wordings={wordings}
            />
        )
    } )

    return (
        <div>

            {inputs}

            {
                !readonly
                    ? (
                        <React.Fragment>
                            <button type="button" className="btn btn-trans btn-info right-margin" onClick={_e => addKeyValue( keyValues, handleChange )}
                                data-toggle="tooltip" data-original-title={wordings.addTextProperty}>
                                <span className="fas fa-plus right-spaced" />
                                <span className="fas fa-font" />
                            </button>
                            <button type="button" className="btn btn-trans btn-info" onClick={_e => addKeyValue( keyValues, handleChange, true )}
                                data-toggle="tooltip" data-original-title={wordings.addFileProperty}>
                                <span className="fas fa-plus right-spaced" />
                                <span className="far fa-file" />
                            </button>
                        </React.Fragment>
                    )
                    : null
            }

        </div>
    )
}

function downloadFile( key: string, keyValues: KeyValueEditor.KeyValDef ): void {
    downloadDataFile( keyValues[key].contentBytes, keyValues[key].contentType, key )
}

function addKeyValue( keyValues: KeyValueEditor.KeyValDef, handleChange: ( keyValues: KeyValDef ) => void, file?: boolean ): void {
    let keyValueStore = getKeyValueStore( keyValues )

    let idx = uuid.v4()

    keyValueStore[idx] = {
        value: '',
        key: '',
        contentType: file === true ? 'application/octet-stream' : 'text/plain',
        contentBytes: ''
    }

    handleChange( getKeyValuesObject( keyValueStore ) )
}

function removeKeyValue( event: React.MouseEvent<HTMLSpanElement, MouseEvent>, keyValues: KeyValueEditor.KeyValDef, handleChange: ( keyValues: KeyValDef ) => void ): void {
    let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( keyValues ) )
    const idx: string = event.currentTarget.getAttribute( 'data-idx' )

    delete keyValuesUpdate[idx]

    handleChange( keyValuesUpdate )
}

function handleKeyChange( event: React.ChangeEvent<HTMLInputElement>, keyValues: KeyValueEditor.KeyValDef, handleChange: ( keyValues: KeyValDef ) => void ): void {
    if ( isValidKeyChar( event.target.value ) || !event.target.value ) {
        let idx = event.currentTarget.getAttribute( 'data-idx' )
        let keyValueStore = getKeyValueStore( keyValues )

        keyValueStore[idx] = {
            value: keyValueStore[idx].value,
            key: event.target.value,
            contentType: keyValueStore[idx].contentType,
            contentBytes: keyValueStore[idx].contentBytes
        }

        handleChange( getKeyValuesObject( keyValueStore ) )
    }
}

function handleValueChange( event: React.ChangeEvent<HTMLTextAreaElement>, keyValues: KeyValueEditor.KeyValDef, handleChange: ( keyValues: KeyValDef ) => void ): void {
    let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( keyValues ) )
    const idx: string = event.currentTarget.getAttribute( 'data-idx' )
    const value: string = event.target.value

    keyValuesUpdate[idx].value = value
    keyValuesUpdate[idx].contentBytes = base64.encode( value )

    handleChange( keyValuesUpdate )
}

function handleFileUpload( event: React.ChangeEvent<HTMLInputElement>, keyValues: KeyValueEditor.KeyValDef, handleChange: ( keyValues: KeyValDef ) => void ): void {
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

            let keyValueStore = getKeyValueStore( keyValues )

            keyValueStore[idx].value = file.name || 'default_file_' + idx
            keyValueStore[idx].contentBytes = fileData

            if ( file.type ) {
                keyValueStore[idx].contentType = file.type
            }

            handleChange( getKeyValuesObject( keyValueStore ) )
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

function getKeyValueStore( keyValues: KeyValDef ): KeyValStoreDef {
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

function getKeyValuesObject( keyValueStore: KeyValStoreDef ): KeyValDef {
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
function keyAlreadyUsed( idx: string, key: string, keyValues: KeyValDef ): boolean {
    const keyValuesWithoutCurrentKey = $.extend( {}, keyValues )

    delete keyValuesWithoutCurrentKey[idx]

    const keys: string[] = Object.keys( keyValuesWithoutCurrentKey ).map( id => (
        keyValuesWithoutCurrentKey[id].key
    ) )

    return keys.some( k => k === key )
}

export default KeyValueEditor