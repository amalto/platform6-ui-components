// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

/**
 * Checkbox input used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
namespace CheckboxInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label: string | JSX.Element;
        /** Disable input. */
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
        ref?: React.Ref<CheckboxInput>;

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

class CheckboxInput extends React.Component<CheckboxInput.Props, CheckboxInput.State> {

    constructor( props: CheckboxInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderCheckbox = ( field: WrappedFieldProps<any> ) => {

        const { label, disabled, help, containerClass, inputClass, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                <span className={classNames( 'form-checkbox-wrapper', inputClass )}>
                    <input {...input as any}
                        type="checkbox"
                        disabled={disabled}
                        id={input.name}
                        className="form-checkbox"
                        checked={input.value} />

                    <label className="form-checkbox-label" htmlFor={input.name}>{label}</label>

                    {help && <Help text={help} containerClass='pos-absolute' />}
                </span>

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    render() {

        const { name, label, format, normalize, parse, validate, warn } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return label ? (

            <Field {...baseFieldProps} component={this.renderCheckbox} />

        ) : null

    }

}


export default CheckboxInput