// Modules
import * as React from 'react'

// Utils
import { getWordings } from '@amalto/helpers'

// Components
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

/**
 * Modal used to confirm a file upload.
 * 
 * FileImporter uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module FileImporter {
    export interface Props {
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
    }
}

function FileImporter( props: FileImporter.Props ) {
    const [wordings, setWordings] = React.useState( getWordings( {}, props.locale ) )

    const [impFileType, setImpFileType] = React.useState( props.fileData.name.toLowerCase().indexOf( '.csv' ) !== -1 ? 'CSV' : 'EXCEL' )
    const [impFileHasHeaders, setImpFileHasHeaders] = React.useState( true )
    const [impFileOverwrite, setImpFileOverwrite] = React.useState( false )
    const [impFileEncoding, setImpFileEncoding] = React.useState( 'utf-8' )
    const [impFileSeparator, setImpFileSeparator] = React.useState( ',' )
    const [impFileQuoteChar, setImpFileQuoteChar] = React.useState( '\'' )

    // Set wordings
    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )



    return (
        <div className="form-dialog">

            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                <div className="panel panel-default">å

                    <Header processing={props.processing}
                        wordings={wordings}
                    />

                    <Body fileData={props.fileData}
                        hideControls={props.hideControls || {}}
                        impFileType={impFileType}
                        impFileHasHeaders={impFileHasHeaders}
                        impFileOverwrite={impFileOverwrite}
                        impFileEncoding={impFileEncoding}
                        impFileSeparator={impFileSeparator}
                        impFileQuoteChar={impFileQuoteChar}
                        setImpFileType={setImpFileType}
                        setImpFileHasHeaders={setImpFileHasHeaders}
                        setImpFileOverwrite={setImpFileOverwrite}
                        setImpFileEncoding={setImpFileEncoding}
                        setImpFileSeparator={setImpFileSeparator}
                        setImpFileQuoteChar={setImpFileQuoteChar}
                        wordings={wordings}
                    />

                    <Footer submitHandler={() => {
                        props.submitHandler(
                            impFileType,
                            impFileHasHeaders,
                            impFileOverwrite,
                            impFileEncoding,
                            impFileSeparator,
                            impFileQuoteChar )
                    }}
                        cancelHandler={props.cancelHandler}
                        processing={props.processing}
                        wordings={wordings}
                    />
                </div>
            </div>

        </div>
    )
}

export default FileImporter