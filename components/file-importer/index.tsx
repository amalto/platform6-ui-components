import * as React from 'react'

//utils & stores
import { compileWordings, formatFileSize } from '@amalto/helpers'

//components
import Switch from '@amalto/switch'
import Spinner from '@amalto/spinner'

//modules
import * as classNames from 'classnames'

const WORDINGS = {


    'fileimporter.title': {
        'en-US': 'Import data from a file',
        'fr-FR': 'Importer des données depuis un fichier'
    },
    'fileimporter.sub.title': {
        'en-US': 'Selected file',
        'fr-FR': 'Fichier sélectionné'
    },
    'fileimporter.file.name': {
        'en-US': 'name',
        'fr-FR': 'nom'
    },
    'fileimporter.file.size': {
        'en-US': 'size',
        'fr-FR': 'taille'
    },
    'fileimporter.button.cancel': {
        'en-US': 'Cancel',
        'fr-FR': 'Annuler'
    },
    'fileimporter.button.submit': {
        'en-US': 'Submit',
        'fr-FR': 'Valider'
    },
    'fileimporter.file.type': {
        'en-US': 'File type',
        'fr-FR': 'Type du fichier'
    },
    'fileimporter.select.value': {
        'en-US': 'Select a value',
        'fr-FR': 'Sélectionner une valeur'
    },
    'fileimporter.file.fields.separator': {
        'en-US': 'Fields separator',
        'fr-FR': 'Séparateur de colonnes'
    },
    'fileimporter.file.encoding': {
        'en-US': 'Encoding',
        'fr-FR': 'Encodage'
    },
    'fileimporter.file.quote.char': {
        'en-US': 'Quote character',
        'fr-FR': 'Caractère de guillemet'
    },
    'fileimporter.file.has.headers': {
        'en-US': 'Headers on first row',
        'fr-FR': 'Entêtes sur la première ligne'
    },
    'fileimporter.file.overwrite.existing': {
        'en-US': 'Overwrite existing data',
        'fr-FR': 'Écraser les données existantes'
    },
    'fileimporter.none': {
        'en-US': 'None',
        'fr-FR': 'Aucun'
    }

}

module FileImporter {
    export interface Props extends React.Props<FileImporter> {
        /** File to be imported. */
        fileData: File;
        /** Close the modal. */
        cancelHandler: () => void;
        /** Submit your file. */
        submitHandler: ( fileType: string, hasHeaders: boolean, overwrite: boolean, fileEncoding: string, fileSeparator: string, fileQuoteChar: string ) => void;
        /** Display file's specifications. */
        hideControls?: {
            fileType?: boolean;
            separator?: boolean;
            quoteChar?: boolean;
            encoding?: boolean;
            headers?: boolean;
            overwrite?: boolean;
        }
        /** Is being processed, if true display the spinner. */
        processing?: boolean;
        /** Spinner image's source. */
        spinnerSrc: string;
        /** Locale to be used. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<FileImporter>;
    }

    export interface State {
        wordings?: { [key: string]: string };
        impFileType?: string;
        impFileHasHeaders?: boolean;
        impFileOverwrite?: boolean;
        impFileEncoding?: string;
        impFileSeparator?: string;
        impFileQuoteChar?: string;
    }
}

class FileImporter extends React.Component<FileImporter.Props, FileImporter.State> {

    constructor( props: FileImporter.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( WORDINGS, props.locale ),
            impFileType: this.props.fileData.name.toLowerCase().indexOf( '.csv' ) !== -1 ? 'CSV' : 'EXCEL',
            impFileHasHeaders: true,
            impFileOverwrite: false,
            impFileEncoding: 'utf-8',
            impFileSeparator: ',',
            impFileQuoteChar: '\''
        }
    }

    render() {

        const hideControls = this.props.hideControls || {}

        return (
            <div className="form-dialog">

                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className={classNames( 'panel-title', {
                                'has-spinner': this.props.processing
                            } )}>
                                {this.state.wordings['fileimporter.title']}
                            </h3>
                            {this.props.processing && <div className="spinner-container"><Spinner src={this.props.spinnerSrc} /></div>}
                        </div>

                        <div className="panel-body">

                            <div className="row bottom-margin">
                                <div className="col-xs-12 text-center toggle-form">
                                    <h5 className="upper bottom-margin">{this.state.wordings['fileimporter.sub.title']}</h5>

                                    <p className="bottom-spaced">
                                        <span className="label label-success text-small">{this.state.wordings['fileimporter.file.name']}</span>
                                        <br />
                                        <em>{this.props.fileData.name}</em>
                                    </p>

                                    <p className="margin-none">
                                        <span className="label label-success text-small">{this.state.wordings['fileimporter.file.size']}</span>
                                        <br />
                                        <em>{formatFileSize( this.props.fileData.size )}</em>
                                    </p>
                                </div>
                            </div>

                            <div className="row bottom-margin">

                                <div className={classNames( 'col-xs-12 col-sm-6', { 'hidden': hideControls.fileType === true } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.type']}</label>
                                        <select className="form-control" name="impFileType"
                                            onChange={this.handleConfigChange}
                                            value={this.state.impFileType}>
                                            <option value="CSV">CSV</option>
                                            <option value="EXCEL">Excel</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': this.state.impFileType === 'EXCEL' || hideControls.separator === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.fields.separator']}</label>
                                        <select className="form-control" name="impFileSeparator"
                                            onChange={this.handleConfigChange}
                                            value={this.state.impFileSeparator}
                                            disabled={this.state.impFileType === 'EXCEL'}>
                                            <option value=",">,</option>
                                            <option value=";">;</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': this.state.impFileType === 'EXCEL' || hideControls.quoteChar === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.quote.char']}</label>
                                        <select className="form-control" name="impFileQuoteChar"
                                            onChange={this.handleConfigChange}
                                            value={this.state.impFileQuoteChar}
                                            disabled={this.state.impFileType === 'EXCEL'}>
                                            <option value="'">'</option>
                                            <option value='"'>"</option>
                                            <option value="">{this.state.wordings['fileimporter.none']}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': this.state.impFileType === 'EXCEL' || hideControls.encoding === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.encoding']}</label>
                                        <select className="form-control" name="impFileEncoding"
                                            onChange={this.handleConfigChange}
                                            value={this.state.impFileEncoding}
                                            disabled={this.state.impFileType === 'EXCEL'}>
                                            <option value="utf-8">utf-8</option>
                                            <option value="iso8859-1">iso8859-1</option>
                                            <option value="cp-1252">cp-1252</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': hideControls.headers === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.has.headers']}</label>
                                        <Switch id="fileImporterHasHeaders"
                                            value={this.state.impFileHasHeaders}
                                            name="impFileHasHeaders"
                                            alignLeft={true}
                                            changeHandler={this.handleConfigSwitchChange} />
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': hideControls.overwrite === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileimporter.file.overwrite.existing']}</label>
                                        <Switch id="fileImporterOverwrite"
                                            value={this.state.impFileOverwrite}
                                            name="impFileOverwrite"
                                            alignLeft={true}
                                            changeHandler={this.handleConfigSwitchChange} />
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="panel-footer">
                            <button type="button" className="btn btn-font btn-trans" onClick={this.props.cancelHandler}>
                                {this.state.wordings['fileimporter.button.cancel']}
                            </button>

                            <button type="button"
                                className="btn btn-success pull-right"
                                onClick={this.submitHandler}
                                disabled={this.props.processing}>
                                {this.state.wordings['fileimporter.button.submit']}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )

    }

    private submitHandler = () => {
        const data = this.state
        this.props.submitHandler(
            data.impFileType,
            data.impFileHasHeaders,
            data.impFileOverwrite,
            data.impFileEncoding,
            data.impFileSeparator,
            data.impFileQuoteChar
        )
    }

    private handleConfigChange = ( event: any ) => {
        let stateUpdate: FileImporter.State = {}
        stateUpdate[event.target.name] = event.target.value
        this.setState( stateUpdate )
    }

    private handleConfigSwitchChange = ( switchValue: boolean, configKey: string ) => {
        let stateUpdate: FileImporter.State = {}
        stateUpdate[configKey] = switchValue
        this.setState( stateUpdate )
    }

}


export default FileImporter