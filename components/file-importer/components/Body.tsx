import * as React from 'react'
import classNames from 'classnames'

// Utils
import { formatFileSize } from '@amalto/helpers'

// Components
import Switch from '@amalto/switch'

module Body {
    export interface Props {
        /** File to be imported. */
        fileData: File;
        /** Display file's specifications. */
        hideControls?: {
            fileType?: boolean;
            separator?: boolean;
            quoteChar?: boolean;
            encoding?: boolean;
            headers?: boolean;
            overwrite?: boolean;
        };

        /** File options */
        impFileType: string;
        impFileHasHeaders?: boolean;
        impFileOverwrite?: boolean;
        impFileEncoding?: string;
        impFileSeparator?: string;
        impFileQuoteChar?: string;

        /** File handlers */
        setImpFileType: ( type: string ) => void;
        setImpFileHasHeaders: ( hasHeader: boolean ) => void;
        setImpFileOverwrite: ( override: boolean ) => void;
        setImpFileEncoding: ( encoding: string ) => void;
        setImpFileSeparator: ( separator: string ) => void;
        setImpFileQuoteChar: ( quoteChar: string ) => void;


        /** Wordings already formatted by local */
        wordings: {
            [id: string]: string;
        };
    }
}

function Body( props: Body.Props ) {

    const { hideControls, fileData, wordings } = props

    return !!wordings ? (
        <div className="panel-body">

            <div className="row bottom-margin">
                <div className="col-xs-12 text-center toggle-form">
                    <h5 className="upper bottom-margin">{wordings.selectedFile}</h5>

                    <p className="bottom-spaced">
                        <span className="label label-success text-small">{wordings.name.toLowerCase()}</span>
                        <br />
                        <em>{fileData.name}</em>
                    </p>

                    <p className="margin-none">
                        <span className="label label-success text-small">{wordings.size.toLowerCase()}</span>
                        <br />
                        <em>{formatFileSize( props.fileData.size )}</em>
                    </p>
                </div>
            </div>

            <div className="row bottom-margin">

                <div className={classNames(
                    'col-xs-12 col-sm-6',
                    { 'hidden': hideControls.fileType === true }
                )}>
                    <div className="form-group">
                        <label>{wordings.fileType}</label>
                        <select className="form-control"
                            name="impFileType"
                            onChange={( e: React.ChangeEvent<HTMLSelectElement> ) => {
                                handleConfigChange( e, props.setImpFileType )
                            }}
                            value={props.impFileType}>
                            <option value="CSV">CSV</option>
                            <option value="EXCEL">Excel</option>
                        </select>
                    </div>
                </div>

                <div className={classNames( 'col-xs-12 col-sm-6', {
                    'hidden': props.impFileType === 'EXCEL' || hideControls.separator === true
                } )}>
                    <div className="form-group">
                        <label>{wordings.fieldsSeparator}</label>
                        <select className="form-control" name="impFileSeparator"
                            onChange={( e: React.ChangeEvent<HTMLSelectElement> ) => {
                                handleConfigChange( e, props.setImpFileSeparator )
                            }}
                            value={props.impFileSeparator}
                            disabled={props.impFileType === 'EXCEL'}>
                            <option value=",">,</option>
                            <option value=";">;</option>
                        </select>
                    </div>
                </div>

                <div className={classNames( 'col-xs-12 col-sm-6', {
                    'hidden': props.impFileType === 'EXCEL' || hideControls.quoteChar === true
                } )}>
                    <div className="form-group">
                        <label>{wordings.quoteChar}</label>
                        <select className="form-control" name="impFileQuoteChar"
                            onChange={( e: React.ChangeEvent<HTMLSelectElement> ) => {
                                handleConfigChange( e, props.setImpFileQuoteChar )
                            }}
                            value={props.impFileQuoteChar}
                            disabled={props.impFileType === 'EXCEL'}>
                            <option value="'">'</option>
                            <option value='"'>"</option>
                            <option value="">{wordings.none}</option>
                        </select>
                    </div>
                </div>

                <div className={classNames( 'col-xs-12 col-sm-6', {
                    'hidden': props.impFileType === 'EXCEL' || hideControls.encoding === true
                } )}>
                    <div className="form-group">
                        <label>{wordings.encoding}</label>
                        <select className="form-control" name="impFileEncoding"
                            onChange={( e: React.ChangeEvent<HTMLSelectElement> ) => {
                                handleConfigChange( e, props.setImpFileEncoding )
                            }}
                            value={props.impFileEncoding}
                            disabled={props.impFileType === 'EXCEL'}>
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
                        <label>{wordings.headerOnFirstRow}</label>
                        <Switch id="fileImporterHasHeaders"
                            value={props.impFileHasHeaders}
                            name="impFileHasHeaders"
                            alignLeft={true}
                            changeHandler={( value ) => {
                                handleConfigSwitchChange( value, props.setImpFileHasHeaders )
                            }} />
                    </div>
                </div>

                <div className={classNames( 'col-xs-12 col-sm-6', {
                    'hidden': hideControls.overwrite === true
                } )}>
                    <div className="form-group">
                        <label>{wordings.overwriteExistingData}</label>
                        <Switch id="fileImporterOverwrite"
                            value={props.impFileOverwrite}
                            name="impFileOverwrite"
                            alignLeft={true}
                            changeHandler={( value ) => {
                                handleConfigSwitchChange( value, props.setImpFileOverwrite )
                            }} />
                    </div>
                </div>

            </div>

        </div>
    ) : null
}

function handleConfigChange(
    event: any,
    setConfig: ( config: any ) => void
) {
    setConfig( event.target.value )
}

function handleConfigSwitchChange(
    switchValue: boolean,
    setConfig: ( config: any ) => void
) {
    setConfig( switchValue )
}

export default Body