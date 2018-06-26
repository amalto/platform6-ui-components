// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Utils
import { compileWordings, formatFileSize } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import Switch from '@amalto/switch'
import Spinner from '@amalto/spinner'

/**
 * Modal used to confirm a file upload.
 * 
 * FileImporter uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
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
        /**
         * Is being processed, if true display the spinner.
         * @default false
         */
        processing?: boolean;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
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
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale ),
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
                                {this.state.wordings['importDataFromFile']}
                            </h3>
                            {this.props.processing && <div className="spinner-container"><Spinner /></div>}
                        </div>

                        <div className="panel-body">

                            <div className="row bottom-margin">
                                <div className="col-xs-12 text-center toggle-form">
                                    <h5 className="upper bottom-margin">{this.state.wordings['selectedFile']}</h5>

                                    <p className="bottom-spaced">
                                        <span className="label label-success text-small">{this.state.wordings['name'].toLowerCase()}</span>
                                        <br />
                                        <em>{this.props.fileData.name}</em>
                                    </p>

                                    <p className="margin-none">
                                        <span className="label label-success text-small">{this.state.wordings['size'].toLowerCase()}</span>
                                        <br />
                                        <em>{formatFileSize( this.props.fileData.size )}</em>
                                    </p>
                                </div>
                            </div>

                            <div className="row bottom-margin">

                                <div className={classNames( 'col-xs-12 col-sm-6', { 'hidden': hideControls.fileType === true } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['fileType']}</label>
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
                                        <label>{this.state.wordings['fieldsSeparator']}</label>
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
                                        <label>{this.state.wordings['quoteChar']}</label>
                                        <select className="form-control" name="impFileQuoteChar"
                                            onChange={this.handleConfigChange}
                                            value={this.state.impFileQuoteChar}
                                            disabled={this.state.impFileType === 'EXCEL'}>
                                            <option value="'">'</option>
                                            <option value='"'>"</option>
                                            <option value="">{this.state.wordings['none']}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classNames( 'col-xs-12 col-sm-6', {
                                    'hidden': this.state.impFileType === 'EXCEL' || hideControls.encoding === true
                                } )}>
                                    <div className="form-group">
                                        <label>{this.state.wordings['encoding']}</label>
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
                                        <label>{this.state.wordings['headerOnFirstRow']}</label>
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
                                        <label>{this.state.wordings['overwriteExistingData']}</label>
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
                                {this.state.wordings['cancel']}
                            </button>

                            <button type="button"
                                className="btn btn-success pull-right"
                                onClick={this.submitHandler}
                                disabled={this.props.processing}>
                                {this.state.wordings['submit']}
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