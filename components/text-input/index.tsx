// Modules
import * as React from 'react'
import * as uuid from 'uuid'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Help from '@amalto/help'

// Utils
import * as classNames from 'classnames'

/**
 * Text input used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
namespace TextInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Input's placeholder. */
        placeholder?: string;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Input's type. */
        type?: string;
        /** Step between each number if input is of type <span className='quote'>number</span>. */
        step?: number;
        /**
         * Focus the input after being loaded.
         * @default false
         */
        autofocus?: boolean;
        /**
         * Randomize input value as a <span className='quote'>uuid.v1()</span> string.
         * @default false
         */
        randomGenerator?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TextInput>;
    }

    export interface State {

    }
}

class TextInput extends React.Component<TextInput.Props, TextInput.State> {

    constructor( props: TextInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderText = ( field: WrappedFieldProps<any> ) => {

        const { label, disabled, autofocus, help, containerClass, inputClass, type, step, randomGenerator, placeholder, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <input
                    {...input as any}
                    key={input.name}
                    type={type || 'text'}
                    step={!type || type !== 'number' ? undefined : step}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoFocus={autofocus}
                    className={classNames( 'form-control input-block', inputClass, {
                        'btn-prefix': randomGenerator
                    } )} />

                {
                    randomGenerator ? (
                        <button type="button" className="btn btn-info input-suffix" onClick={e => this.generateClientSecret( field )}>
                            <span className="fas fa-random"></span>
                        </button>
                    ) : null
                }

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

        return <Field {...baseFieldProps} component={this.renderText} />

    }

    private generateClientSecret = ( field: WrappedFieldProps<any> ) => {
        field.input.onChange( uuid.v1(), undefined, undefined )
    }

}


export default TextInput