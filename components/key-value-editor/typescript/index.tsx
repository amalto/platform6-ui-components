import * as React from 'react'

//utils & stores
import { compileWordings, isValidKeyChar, downloadDataFile } from 'helpers'

//components & models


//modules
import * as classNames from 'classnames'
import { Ref } from 'react';

const WORDINGS = {

    'keyvalueeditor.key': {
        'en-US': 'Key',
        'fr-FR': 'Clé'
    },
    'keyvalueeditor.value': {
        'en-US': 'Value',
        'fr-FR': 'Valeur'
    },
    'keyvalueeditor.add.text.btn': {
        'en-US': 'Add a text property',
        'fr-FR': 'Ajouter une valeur de type texte'
    },
    'keyvalueeditor.add.file.btn': {
        'en-US': 'Add a file property',
        'fr-FR': 'Ajouter un fichier'
    },
    'keyvalueeditor.select.file': {
        'en-US': 'Select a file:',
        'fr-FR': 'Ajouter un fichier :'
    },
    'keyvalueeditor.download.file': {
        'en-US': 'Download',
        'fr-FR': 'Télécharger'
    },
    'keyvalueeditor.upload.file': {
        'en-US': 'Upload a file',
        'fr-FR': 'Envoyer un fichier'
    }

}

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

namespace KeyValueEditor {
    export interface Props extends React.Props<KeyValueEditor> {
        /** Handle values changes */
        handleChange: ( keyValues: KeyValDef ) => void;
        /** Current keyValues data */
        keyValues: KeyValDef
        /** Locale to be used */
        locale: string;

        /**
         * Hide props from documentation
         */

        /** @ignore */
        children: React.ReactNode;
        /** @ignore */
        key: React.ReactText;
        /** @ignore */
        ref: Ref<KeyValueEditor>;
    }

    export interface State {
        wordings?: { [key: string]: string };
    }
}

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

                    <div className="form-group col-xs-2 text-center" style={{ paddingRight: 0 }}>
                        <span className="fa fa-minus-circle danger-color control-align click-pointer"
                            data-key={keyVal.key} onClick={this.removeKeyValue} />
                    </div>

                    <div className="form-group col-xs-5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <input type="text" className="form-control"
                                    value={keyVal.key}
                                    onChange={this.handleKeyChange}
                                    data-idx={idx}
                                    placeholder={this.state.wordings['keyvalueeditor.key']}
                                />
                            ) : (
                                    <span className="control-align">
                                        {keyVal.key || this.state.wordings['keyvalueeditor.select.file']}
                                    </span>
                                )
                        }
                    </div>

                    <div className="form-group col-xs-5">
                        {
                            keyVal.contentType === 'text/plain' ? (
                                <textarea className="form-control"
                                    value={keyVal.contentBytes}
                                    onChange={this.handleValueChange}
                                    data-key={keyVal.key}
                                    placeholder={this.state.wordings['keyvalueeditor.value']}
                                />
                            ) : (
                                    keyVal.contentBytes ? (
                                        <button className="btn btn-info btn-trans" data-key={keyVal.key} onClick={this.downloadFile}>
                                            <span className="fa fa-download right-spaced" />
                                            <span>{this.state.wordings['keyvalueeditor.download.file']}</span>
                                        </button>
                                    ) : (
                                            <span className="btn btn-block upload-btn btn-default btn-trans">
                                                <span className="fa fa-upload right-spaced" />
                                                <span>{this.state.wordings['keyvalueeditor.upload.file']}</span>
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

                <div>
                    <button className="btn btn-trans btn-info right-margin" onClick={this.addKeyValue.bind( this )}
                        data-toggle="tooltip" data-original-title={this.state.wordings['keyvalueeditor.add.text.btn']}>
                        <span className="fa fa-plus right-spaced" />
                        <span className="fa fa-font" />
                    </button>
                    <button className="btn btn-trans btn-info" onClick={this.addKeyValue.bind( this, true )}
                        data-toggle="tooltip" data-original-title={this.state.wordings['keyvalueeditor.add.file.btn']}>
                        <span className="fa fa-plus right-spaced" />
                        <span className="fa fa-file-o" />
                    </button>
                </div>

            </div>
        )

    }

    private downloadFile = ( event: any ) => {
        const key: string = event.currentTarget.getAttribute( 'data-key' )
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