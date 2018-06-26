// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

/**
 * Select input used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
namespace SelectInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label: string | JSX.Element;
        /** Input's list. */
        options: {
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
        /** Whether or not the input is disabled. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Hide the space where the error message should appear */
        hideEmptyOption?: boolean;
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
        ref?: React.Ref<SelectInput>;

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

class SelectInput extends React.Component<SelectInput.Props, SelectInput.State> {

    constructor( props: SelectInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderSelect = ( field: WrappedFieldProps<any> ) => {

        const { label, options, disabled, help, containerClass, inputClass, hideEmptyOption, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>
                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <select {...input as any}
                    className={classNames( 'form-control', inputClass )}
                    disabled={disabled}>

                    {hideEmptyOption ? null : <option value=""></option>}

                    {options.map( ( opt, idx ) => <option key={idx} value={opt.value} disabled={opt.disabled}>{opt.label || opt.value}</option> )}

                </select>

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}
            </div>
        )
    }

    render() {

        const { options, name, format, normalize, parse, validate, warn, containerClass, help, label, inputClass } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return options && options.length ? (
            <Field {...baseFieldProps} component={this.renderSelect} />
        ) : (
                <div className={classNames( 'form-group', containerClass )}>
                    {label ? <label>{label}{help && <Help text={help} />}</label> : null}
                    <select className={classNames( 'form-control', inputClass )}
                        disabled={true}>
                    </select>
                </div>
            )
    }

}


export default SelectInput