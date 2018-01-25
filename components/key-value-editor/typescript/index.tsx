import * as React from 'react'

//utils & stores
import { compileWordings, isValidKeyChar, downloadDataFile } from '@amalto/helpers'

//components & models


//modules
import * as classNames from 'classnames'

const WORDINGS = {

    'keyvalueeditor.key': {
        'enUS': 'Key',
        'frFR': 'Clé'
    },
    'keyvalueeditor.value': {
        'enUS': 'Value',
        'frFR': 'Valeur'
    },
    'keyvalueeditor.add.text.btn': {
        'enUS': 'Add a text property',
        'frFR': 'Ajouter une valeur de type texte'
    },
    'keyvalueeditor.add.file.btn': {
        'enUS': 'Add a file property',
        'frFR': 'Ajouter un fichier'
    },
    'keyvalueeditor.select.file': {
        'enUS': 'Select a file:',
        'frFR': 'Ajouter un fichier :'
    },
    'keyvalueeditor.download.file': {
        'enUS': 'Download',
        'frFR': 'Télécharger'
    },
    'keyvalueeditor.upload.file': {
        'enUS': 'Upload a file',
        'frFR': 'Envoyer un fichier'
    }

}

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
        /** Handle values changes. */
        handleChange: ( keyValues: KeyValDef ) => void;
        /** Current keyValues data. */
        keyValues: KeyValDef
        /** Locale to be used. */
        locale: string;

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

/**
 * Map component where you can assiociate keys with texts or files.
 */
class KeyValueEditor extends React.Component<KeyValueEditor.Props, KeyValueEditor.State> {

    constructor( props: KeyValueEditor.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( WORDINGS, props.locale )
        }
    }

    render() {

        let keyValueStore = this.getKeyValueStore( this.props.keyValues )

        let inputs = Object.keys( keyValueStore ).map( idx => {

            let keyVal = keyValueStore[idx]

            return (
                <div className="row" key={idx}>

                    <div className="formgroup colxs2 textcenter" style={{ paddingRight: 0 }}>
                        <span className="fa faminuscircle dangercolor controlalign clickpointer"
                            data-key={keyVal.key} onClick={this.removeKeyValue} />
                    </div>

                    <div className="formgroup colxs5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <input type="text" className="formcontrol"
                                    value={keyVal.key}
                                    onChange={this.handleKeyChange}
                                    data-idx={idx}
                                    placeholder={this.state.wordings['keyvalueeditor.key']}
                                />
                            ) : (
                                    <span className="controlalign">
                                        {keyVal.key || this.state.wordings['keyvalueeditor.select.file']}
                                    </span>
                                )
                        }
                    </div>

                    <div className="formgroup colxs5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <textarea className="formcontrol"
                                    value={keyVal.contentBytes}
                                    onChange={this.handleValueChange}
                                    data-key={keyVal.key}
                                    placeholder={this.state.wordings['keyvalueeditor.value']}
                                />
                            ) : (
                                    keyVal.contentBytes ? (
                                        <button className="btn btninfo btntrans" data-key={keyVal.key} onClick={this.downloadFile}>
                                            <span className="fa fadownload rightspaced" />
                                            <span>{this.state.wordings['keyvalueeditor.download.file']}</span>
                                        </button>
                                    ) : (
                                            <span className="btn btnblock uploadbtn btndefault btntrans">
                                                <span className="fa faupload rightspaced" />
                                                <span>{this.state.wordings['keyvalueeditor.upload.file']}</span>
                                                <input type="file" className="uploadinput" onChange={this.handleFileUpload} data-idx={idx} data-key={keyVal.key} />
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

                <div>
                    <button className="btn btntrans btninfo rightmargin" onClick={this.addKeyValue.bind( this )}
                        data-toggle="tooltip" data-original-title={this.state.wordings['keyvalueeditor.add.text.btn']}>
                        <span className="fa faplus rightspaced" />
                        <span className="fa fafont" />
                    </button>
                    <button className="btn btntrans btninfo" onClick={this.addKeyValue.bind( this, true )}
                        data-toggle="tooltip" data-original-title={this.state.wordings['keyvalueeditor.add.file.btn']}>
                        <span className="fa faplus rightspaced" />
                        <span className="fa fafileo" />
                    </button>
                </div>

            </div>
        )

    }

    private downloadFile = ( event: any ) => {
        const key: string = event.currentTarget.getAttribute( 'datakey' )
        downloadDataFile( this.props.keyValues[key].contentBytes, this.props.keyValues[key].contentType, key )
    }

    private addKeyValue = ( file?: boolean ) => {
        let keyValueStore = this.getKeyValueStore( this.props.keyValues )

        let idx = Object.keys( keyValueStore ).length

        keyValueStore[( idx + 1 ).toString()] = {
            key: '',
            contentType: file === true ? 'application/octetstream' : 'text/plain',
            contentBytes: ''
        }

        this.props.handleChange( this.getKeyValuesObject( keyValueStore ) )
    }

    private removeKeyValue = ( event: any ) => {
        let keyValuesUpdate: KeyValDef = JSON.parse( JSON.stringify( this.props.keyValues ) )
        const key: string = event.currentTarget.getAttribute( 'datakey' )

        delete keyValuesUpdate[key]

        this.props.handleChange( keyValuesUpdate )
    }

    private handleKeyChange = ( event: any ) => {
        if ( isValidKeyChar( event.target.value ) || !event.target.value ) {
            let idx = event.currentTarget.getAttribute( 'dataidx' )
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
        const key: string = event.currentTarget.getAttribute( 'datakey' )

        keyValuesUpdate[key].contentBytes = event.target.value

        this.props.handleChange( keyValuesUpdate )
    }

    private handleFileUpload = ( event: any ): void => {
        const key: string = event.currentTarget.getAttribute( 'datakey' )
        const idx = event.currentTarget.getAttribute( 'dataidx' )

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