import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'

//utils
import * as classNames from 'classnames'

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
        /** Disable input. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /** Radio group CSS class. */
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

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>
                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                {
                    options.map( ( opt, idx ) => (
                        <span key={idx} className="form-radio-wrapper right-margin">
                            <input {...input as any}
                                disabled={disabled}
                                type="radio"
                                id={input.name + '_' + idx}
                                value={opt.value}
                                className={classNames( 'form-radio', inputClass )}
                                checked={input.value === opt.value} />

                            <label htmlFor={input.name + '_' + idx}
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