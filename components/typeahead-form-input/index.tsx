// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'
import Typeahead from '@amalto/typeahead-input'

import { isNotEmpty } from '@amalto/helpers'

/**
 * Typeahead input used on a [redux-form](#reduxform).
 */
namespace TypeaheadFormInput {
    export interface Props extends BaseFieldProps {
        /** Input's name. */
        name: string;
        /** Collection of item to be display inside the dropdown list. */
        collection: any[];
        /** Search remotely from server. More details on [RemoteConfig](#remoteconfig). */
        remote?: Typeahead.RemoteConfig;
        /** Manage the dropdown list of choices when input value is updated by user. */
        datumTokenizer?: ( datum: any ) => string[];
        /** Manage input value to be displayed. */
        display?: ( value: any ) => string;
        /** Form input label. */
        label?: string | JSX.Element;
        /** Input's placeholder. */
        placeholder?: string;
        /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }

    export interface State {

    }
}

function TypeaheadFormInput( props: TypeaheadFormInput.Props ) {

    const { name, label, help, containerClass, collection, remote, collapseErrorSpace, display, datumTokenizer, placeholder, format, normalize, parse, validate, warn } = props

    const renderInput = ( field: WrappedFieldProps ) => {

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <Typeahead id={name}
                    collection={collection}
                    remote={remote}
                    display={display}
                    value={input.value}
                    handleInputChange={input.onChange as any}
                    datumTokenizer={datumTokenizer}
                    placeholder={placeholder}
                />

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }


    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    return isNotEmpty( name ) ? (

        <Field {...baseFieldProps} component={renderInput} />

    ) : null

}


export default TypeaheadFormInput