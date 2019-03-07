import * as React from 'react'
import * as classNames from 'classnames'

import KeyValueEditor from '../index'

// Wordings
import { WORDINGS } from '../constants/wordings'

// Utils
import { compileWordings } from '@amalto/helpers'

module KeyInput {
    export interface Props {
        dataIdx: string;
        keyValueStore: KeyValueEditor.KeyValStoreDef;
        readonly?: boolean;
        removeKeyValue: ( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) => void;
        handleKeyChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
        handleValueChange: ( event: React.ChangeEvent<HTMLTextAreaElement> ) => void;
        handleFileUpload: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
        downloadFile: ( key: string ) => void;
        keyAlreadyUsed: ( idx: string, key: string ) => boolean;
        locale: string;
    }
}

// Use React 16.6.x Hooks
function KeyInput( props: KeyInput.Props ) {

    const [wordings, setWordings] = React.useState( {} as any )
    const [invalidKey, setInvalidKey] = React.useState( false )

    let keyVal = props.keyValueStore[props.dataIdx]

    React.useEffect( () => {
        setWordings( compileWordings( WORDINGS, props.locale ) )
    }, [props.locale] )

    React.useEffect( () => {
        setInvalidKey( props.keyAlreadyUsed( props.dataIdx, keyVal.key ) )
    }, [keyVal.key] )

    return (
        <div className="row">

            {
                !props.readonly
                    ? <div className="form-group col-xs-2 text-center" style={{ paddingRight: 0 }}>
                        <span className="fas fa-minus-circle danger-color control-align click-pointer"
                            data-value={keyVal.key} onClick={props.removeKeyValue} />
                    </div>
                    : null
            }

            {/* Keys input */}
            <div className="form-group col-xs-5">
                {
                    keyVal.contentType === 'text/plain'
                        ? (
                            <React.Fragment>
                                <input type="text"
                                    className={classNames( 'form-control', {
                                        'invalid': invalidKey
                                    } )}
                                    value={keyVal.key}
                                    disabled={props.readonly}
                                    onChange={props.handleKeyChange}
                                    data-idx={props.dataIdx}
                                    placeholder={wordings.key}
                                />
                                {
                                    invalidKey
                                        ? <p className="validation-error-message">{wordings.keyAlreadyUsed}</p>
                                        : <p className="validation-error-message">&nbsp;</p>
                                }
                            </React.Fragment>
                        ) : (
                            <span className="control-align">
                                {keyVal.key || wordings.selectFile}
                            </span>
                        )
                }
            </div>

            {/* Value input */}
            <div className="form-group col-xs-5">
                {
                    keyVal.contentType === 'text/plain'
                        ? (
                            <textarea className="form-control"
                                value={keyVal.value}
                                disabled={props.readonly}
                                onChange={props.handleValueChange}
                                data-idx={props.dataIdx}
                                data-value={keyVal.value}
                                placeholder={wordings.value}
                            />
                        ) : (
                            keyVal.contentBytes
                                ? (
                                    <button type="button" className="btn btn-info btn-trans"
                                        onClick={() => props.downloadFile( props.dataIdx )}>
                                        <span className="fas fa-download right-spaced" />
                                        <span>{wordings.download}</span>
                                    </button>
                                ) : (
                                    <span className="btn btn-block upload-btn btn-font btn-trans">
                                        <span className="fas fa-upload right-spaced" />
                                        <span>{wordings.uploadFile}</span>
                                        <input type="file" className="upload-input"
                                            onChange={props.handleFileUpload}
                                            data-idx={props.dataIdx} data-value={keyVal.value} />
                                    </span>
                                )
                        )
                }
            </div>

        </div>
    )
}

export default KeyInput