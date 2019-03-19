import * as React from 'react'
import * as classNames from 'classnames'
import { WrappedFieldProps } from 'redux-form'

import Help from '@amalto/help'

module Text {
    export interface Props {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to input. */
        inputClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;
        field: WrappedFieldProps
    }
}

function Text( props: Text.Props ) {

    const { label, help, containerClass, inputClass, collapseErrorSpace, field } = props

    const { input, meta } = field

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            <span {...input as any} className={classNames( 'form-static-input', inputClass )}>{input.value}</span>

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

        </div>
    )
}

export default Text