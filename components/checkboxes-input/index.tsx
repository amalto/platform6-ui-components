// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import { default as classNames } from 'classnames'
import * as uuid from 'uuid'

// Helpers
import { addValToArrayNoDup, removeValFromArrayNoDup } from '@amalto/helpers'

// Components
import Help from '@amalto/help'

/**
 * Checkboxes inputs used on a [redux-form](#reduxform).
 */
namespace CheckboxesInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's list. */
        options: {
            value: string;
            label?: string | JSX.Element;
        }[];
        /** Input's label. */
        label?: string | JSX.Element;
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
        ref?: React.Ref<CheckboxesInput>;

        /** redux-form props */

        /** @ignore */
        component?: any;
        /** @ignore */
        format?: any;
        /** @ignore */
        normalize?: any;
        /** @ignore */
        props?: any;
        /** @ignore */
        parse?: any;
        /** @ignore */
        validate?: any;
        /** @ignore */
        warn?: any;
        /** @ignore */
        withRef?: any;
    }
}

namespace Checkboxes {
    export interface Props extends CheckboxesInput.Props, WrappedFieldProps<any> { }
}

class Checkboxes extends React.PureComponent<Checkboxes.Props> {

    constructor(props: Checkboxes.Props) {
        super(props);
    }

    render() {

        const { label, disabled, help, containerClass, inputClass, collapseErrorSpace, options, input, meta } = this.props;

        const inputId: string = uuid.v4();

        return (
            <div className={classNames('form-group', containerClass, {
                'invalid': meta.touched && !!meta.error,
                'hidden': !options || options.length === 0
            })}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className={classNames('fieldset', {
                    'invalid': meta.touched && !!meta.error
                })}>
                    {
                        options.filter(opt => !!opt.value).map((opt, idx) => (
                            <span className={classNames('form-checkbox-wrapper', inputClass)} key={idx}>
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    disabled={disabled}
                                    id={`${inputId}_${input.name}_${idx}`}
                                    value={opt.value}
                                    onChange={(e) => this.handleChange(e)}
                                    checked={input.value.indexOf(opt.value) !== -1} />

                                <label className="form-checkbox-label" htmlFor={`${inputId}_${input.name}_${idx}`}>{opt.label || opt.value}</label>
                            </span>
                        ))
                    }
                </div>

                {(meta.touched && !!meta.error) ? <p className="validation-error-message">{meta.error}</p> : (collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p>)}

                <input type="hidden" {...input as any} />

            </div>
        );
    }

    private handleChange = (event: any) => {

        const { input } = this.props;

        const selectedValues = input.value ? input.value.filter((item: string) => !!item) : [];

        if (event.target.checked) {
            input.onChange(addValToArrayNoDup(selectedValues, event.target.value), undefined, undefined);
        }
        else {
            input.onChange(removeValFromArrayNoDup(selectedValues, event.target.value), undefined, undefined);
        }
    }

}

class CheckboxesInput extends React.Component<CheckboxesInput.Props> {

    constructor(props: CheckboxesInput.Props) {
        super(props)
    }

    render() {

        const { name, format, normalize, parse, validate, warn } = this.props;

        const baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        };

        return <Field {...baseFieldProps} {...this.props as any} component={Checkboxes} />;

    }

}


export default CheckboxesInput;