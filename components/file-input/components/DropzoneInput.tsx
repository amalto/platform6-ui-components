import * as React from 'react'
import Dropzone from 'react-dropzone'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Utils
import { compileWordings } from '@amalto/helpers'

module DropzoneInput {
    export interface Props {
        disabled?: boolean;
        mimeTypeAccepted?: string;
        maxBytesSize?: number;
        onDrop: ( files: File[], rejectedFiles: File[] ) => void;
        locale: string;
    }
}

// Use React 16.6.x Hooks
function DropzoneInput( props: DropzoneInput.Props ) {

    const [wordings, setWordings] = React.useState( {} as any )

    React.useEffect( () => {
        setWordings( compileWordings( MULTILANGUAGE_WORDINGS, props.locale ) )
    }, [MULTILANGUAGE_WORDINGS] )

    return (
        <Dropzone onDrop={props.onDrop}
            disabled={props.disabled}
            accept={props.mimeTypeAccepted} maxSize={props.maxBytesSize}>
            {
                ( { getRootProps, getInputProps } ) => (
                    <div className="col-xs-12 file-drop-zone">
                        <div className='drop-zone-title' {...getRootProps()}>
                            <span>{wordings.dropZoneTitle}</span><br />
                            <span className="subtitle">{wordings.dropZoneSubtitle}</span>
                            <input {...getInputProps()} />
                        </div>
                    </div>
                )
            }
        </Dropzone>
    )
}

export default DropzoneInput