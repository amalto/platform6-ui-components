import * as React from 'react'

module Footer {
    export interface Props {
        submitHandler: () => void;
        cancelHandler: () => void;
        processing: boolean;
        wordings: {
            [id: string]: {
                [locale: string]: string;
            };
        };
    }
}

function Footer( { submitHandler, cancelHandler, processing, wordings } ) {
    return (
        <div className="panel-footer">
            <button type="button" className="btn btn-font btn-trans"
                onClick={cancelHandler}>
                {wordings.cancel}
            </button>

            <button type="button"
                className="btn btn-success pull-right"
                onClick={submitHandler}
                disabled={processing}>
                {wordings.submit}
            </button>
        </div>
    )
}

export default Footer