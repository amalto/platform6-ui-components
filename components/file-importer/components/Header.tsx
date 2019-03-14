import * as React from 'react'
import classNames from 'classnames'

import Spinner from '@amalto/spinner'

module Header {
    export interface Props {
        processing: boolean;
        wordings: {
            [id: string]: {
                [locale: string]: string;
            };
        };
    }
}

function Header( { processing, wordings } ) {
    return (
        <div className="panel-heading">
            <h3 className={classNames( 'panel-title', {
                'has-spinner': processing
            } )}>
                {wordings.importDataFromFile}
            </h3>
            {
                processing
                    ? (
                        <div className="spinner-container">
                            <Spinner />
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default Header