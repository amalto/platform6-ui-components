import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from './components/Help'

//utils
import * as classNames from 'classnames'

namespace RadioInput {
    export interface Props extends BaseFieldProps {
        name: string;
        label?: string | JSX.Element;
        options: {
            value: string;
            label?: string;
        }[];
        disabled?: boolean;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        collapseErrorSpace?: boolean;
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