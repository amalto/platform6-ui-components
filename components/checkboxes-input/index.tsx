import * as React from 'react'
import * as ReactDOM from 'react-dom'

//helpers
import { addValToArrayNoDup, removeValFromArrayNoDup } from '@amalto/helpers'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'

//utils
import * as classNames from 'classnames'

namespace CheckboxesInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label: string | JSX.Element;
        /** Input's list. */
        options: {
            value: string;
            label?: string;
        }[];
        /** Disable input. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /** CheckboxInput group CSS class. */
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
        ref?: React.Ref<CheckboxesInput>;

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

namespace Checkboxes {
    export interface Props extends CheckboxesInput.Props, WrappedFieldProps<any> {
    }
}

class Checkboxes extends React.Component<Checkboxes.Props, CheckboxesInput.State> {

    constructor( props: Checkboxes.Props ) {
        super( props )
    }

    render() {

        const { label, disabled, help, containerClass, inputClass, collapseErrorSpace, options, input, meta } = this.props

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className={classNames( 'fieldset', {
                    'invalid': meta.touched && !!meta.error
                } )}>
                    {
                        options.filter( opt => !!opt.value ).map( ( opt, idx ) => (
                            <span className={classNames( 'form-checkbox-wrapper', inputClass )} key={idx}>
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    disabled={disabled}
                                    id={input.name + '_' + idx}
                                    value={opt.value}
                                    onChange={( e ) => this.handleChange( e )}
                                    checked={input.value.indexOf( opt.value ) !== -1} />

                                <label className="form-checkbox-label" htmlFor={input.name + '_' + idx}>{opt.label || opt.value}</label>
                            </span>
                        ) )
                    }
                </div>

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

                <input type="hidden" {...input as any} />

            </div>
        )
    }

    private handleChange = ( event: any ) => {

        const { input } = this.props

        const selectedValues = input.value ? input.value.filter( ( item: string ) => !!item ) : []

        if ( event.target.checked ) {
            input.onChange( addValToArrayNoDup( selectedValues, event.target.value ), undefined, undefined )
        }
        else {
            input.onChange( removeValFromArrayNoDup( selectedValues, event.target.value ), undefined, undefined )
        }
    }

}

class CheckboxesInput extends React.Component<CheckboxesInput.Props, CheckboxesInput.State> {

    constructor( props: CheckboxesInput.Props ) {
        super( props )
        this.state = {

        }
    }

    render() {

        const { name, label, options, disabled, format, normalize, parse, validate, warn } = this.props

        const baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        const props = JSON.parse( JSON.stringify( this.props ) )

        return options && options.length ? (

            <Field {...baseFieldProps} {...props} component={Checkboxes} />

        ) : null

    }

}


export default CheckboxesInput