// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'
import Switch from '@amalto/switch'

/**
 * Switch input used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
namespace SwitchInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Disable input. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /** Radio group CSS class. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Align switch input to the left. */
        alignLeft?: boolean;
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
        ref?: React.Ref<SwitchInput>;

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

class SwitchInput extends React.Component<SwitchInput.Props, SwitchInput.State> {

    constructor( props: SwitchInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderSwitch = ( field: WrappedFieldProps<any> ) => {

        const { name, label, disabled, help, containerClass, inputClass, alignLeft, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <Switch id={name}
                    name={name}
                    value={input.value}
                    cssClass={inputClass}
                    alignLeft={alignLeft}
                    changeHandler={input.onChange as any} />

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    render() {

        const { name } = this.props

        return name ? (

            <Field name={name} component={this.renderSwitch} />

        ) : null

    }

}


export default SwitchInput