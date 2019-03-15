import * as React from 'react'

// Utils
import { formatFileSize } from '@amalto/helpers'

module InvalidFiles {
    export interface Props {
        /** Allowed mime types. */
        mimeTypeAccepted: string;
        /** Max size in bytes (by file). */
        maxBytesSize: number;
        /** Invalid files errors descriptions. */
        errors: JSX.Element[];
        // Cloe alert
        closeInvalidFilesAlert: () => void;
        wordings: { [id: string]: string };
    }
}

function InvalidFiles( props: InvalidFiles.Props ) {
    const { mimeTypeAccepted, maxBytesSize, errors, closeInvalidFilesAlert, wordings } = props

    return (
        <div className="alert alert-danger alert-dismissable top-margin text-medium">
            <button type="button" className="close" onClick={closeInvalidFilesAlert}>&times;</button>
            <div className="bottom-spaced">
                <strong className="right-spaced">{wordings.invalidFile}</strong>
                <span className="fas fa-info-circle click-pointer" data-toggle="collapse" data-target="#inputFormatInfo" />
                <div id="inputFormatInfo" className="collapse top-spaced font-color" style={{ paddingLeft: 20 }}>
                    {mimeTypeAccepted ? <div><strong className="right-spaced">{wordings.contentType}</strong><span>{mimeTypeAccepted}</span></div> : null}
                    {maxBytesSize ? <div><strong className="right-spaced">{wordings.maxSize}</strong><span>{formatFileSize( maxBytesSize )}</span></div> : null}
                </div>
            </div>
            {errors}
        </div>
    )
}

export default InvalidFiles