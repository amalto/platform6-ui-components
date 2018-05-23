// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'
import * as uuid from 'uuid'


// Components
import Help from '@amalto/help'

/**
 * Radio input used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
namespace RadioInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Input's list. */
        options: {
            value: string;
            label?: string;
        }[];
        /** Whether or not the input is disabled. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <blockquote>?</blockquote> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<RadioInput>;

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

class RadioInput extends React.Component<RadioInput.Props, RadioInput.State> {

    constructor( props: RadioInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderRadio = ( field: WrappedFieldProps<{}> ) => {

        const { label, options, disabled, help, containerClass, inputClass, collapseErrorSpace } = this.props

        const { input, meta } = field
        
        const inputId: string = uuid.v4()

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>
                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                {
                    options.map( ( opt, idx ) => (
                        <span key={idx} className="form-radio-wrapper right-margin">
                            <input {...input as any}
                                key={input.name}
                                disabled={disabled}
                                type="radio"
                                id={`${inputId}_${input.name}_${idx}`}
                                value={opt.value}
                                className={classNames( 'form-radio', inputClass )}
                                checked={input.value === opt.value} />

                            <label htmlFor={`${inputId}_${input.name}_${idx}`}
                                className="form-radio-label">
                                {opt.label || opt.value}
                            </label>
                        </span>
                    ) )
                }

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}
            </div>
        )
    }

    render() {

        const { options, name, format, normalize, parse, validate, warn } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return options && options.length ? (

            <Field {...baseFieldProps} component={this.renderRadio} />

        ) : null

    }

}


export default RadioInput