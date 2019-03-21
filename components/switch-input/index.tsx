// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'
import * as uuid from 'uuid'

// Components
import Help from '@amalto/help'
import Switch from '@amalto/switch'

/**
 * Switch input used on a [redux-form](#reduxform).
 */
namespace SwitchInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Align switch input to the left. */
        alignLeft?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

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

function SwitchInput( props: SwitchInput.Props ) {
    const { name } = props

    const renderSwitch = ( field: WrappedFieldProps ) => {

        const { name, label, help, containerClass, inputClass, alignLeft, collapseErrorSpace } = props

        const { input, meta } = field

        const inputId: string = uuid.v4()

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <Switch id={`${ inputId }_${ name }`}
                    name={name}
                    value={input.value}
                    cssClass={inputClass}
                    alignLeft={alignLeft}
                    changeHandler={input.onChange as any} />

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    return name ? (

        <Field name={name} component={renderSwitch} />

    ) : null
}

export default SwitchInput