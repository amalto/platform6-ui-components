// Modules
import * as React from 'react'
import * as classNames from 'classnames'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//utils & stores
import { removeValFromArrayNoDup, addValToArrayNoDup, isNotEmpty } from '@amalto/helpers'

//components & models
import Help from '@amalto/help'
import { Option } from './models/Option'

module MultiSelectInput {
    export interface Props extends BaseFieldProps {

        /** Input label name. */
        name: string;

        /** Input's label. */
        label: string | JSX.Element;

        /** Choice list. */
        options: Option[];

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

        fieldLineHeight?: number;

        /** Allow multiple selection. */
        multiple?: boolean;

        /** Triggered when selecting an option. */
        handleChange: ( event: any ) => void;

        /**
         * If set to true, it removes the empty option (option without label and value is an empty string) from the select dropdown.
         * @default false
         */
        hideEmptyOption?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default 'en-US'
         */
        locale?: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<MultiSelectInput>;

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
        locale?: string;
    }
}

class MultiSelectInput extends React.Component<MultiSelectInput.Props, MultiSelectInput.State> {

    private textArea: HTMLTextAreaElement = null
    private dropdownCtn: HTMLDivElement;

    constructor( props: MultiSelectInput.Props ) {
        super( props )

        this.state = {
            locale: props.locale || 'en-US'
        }

        this.dropdownCtn = undefined
    }

    //handles display of a search criteria input
    render() {
        const { name, format, normalize, parse, validate, warn } = this.props
        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return <Field {...baseFieldProps} component={this.renderMultiSelectInput} />
    }

    /** Components */

    private renderMultiSelectInput = ( field: WrappedFieldProps<any> ) => {
        const { label, options, disabled, help, containerClass, inputClass, collapseErrorSpace, fieldLineHeight } = this.props

        const { input, meta } = field

        const extendedStyle: React.CSSProperties = this.getExtendedStyle( fieldLineHeight, input.value )

        const selectValue: string[] = isNotEmpty( input.value ) ? ( input.value as string ).split( ',' ) : []



        console.info( 'input => ', input )
        console.info( 'selectValue => ', selectValue )

        let choices = options.map( ( choice, idx ) => {

            let option = choice.label.trim()

            return (
                <li key={idx} className={classNames( { 'active': selectValue.findIndex( v => v.trim() === option ) !== -1 } )}>
                    <a href="#" onClick={( e ) => this.selectOption( e, field, selectValue, option )}>
                        {option}
                    </a>
                </li>
            )
        } )

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}
                style={{ position: 'relative' }}
                ref={div => this.dropdownCtn = div}>
                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <button type="button" className={classNames( 'btn form-control dropdown-toggle multi-select-input rel', inputClass )} data-toggle="dropdown" style={extendedStyle}>

                    {
                        selectValue && selectValue.length > 0 ? (
                            <div className="dropdown-active-tags">
                                {
                                    selectValue.map( ( value, idx ) => {

                                        return (
                                            <span key={value + idx} className="tag" onClick={() => this.handleChoiceSelect( field, selectValue, value )}>
                                                <span>{value}</span>
                                                <span className="close-tag-btn">
                                                    <span className="fas fa-times" />
                                                </span>
                                            </span>
                                        )
                                    } )
                                }
                            </div>
                        ) : null
                    }

                    <span className="caret abs" style={{ top: 12, right: 4 }} />

                </button>

                {
                    ( meta.touched && !!meta.error )
                        ? <p className="validation-error-message">{meta.error}</p>
                        : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )
                }

                <ul className="dropdown-menu mgb-20" style={{ left: 'auto' }}>
                    {choices}
                </ul>

                <textarea
                    {...input as any}
                    ref={dom => this.textArea = dom}
                    key={input.name}
                    disabled={disabled}
                    className='hidden' />
            </div>
        )
    }

    /** Utils */

    private getExtendedStyle = ( fieldLineHeight: number, value: string ): React.CSSProperties => {
        let extendedStyle: React.CSSProperties = value && !!value.length ? { textAlign: 'left', paddingRight: 20 } : { textAlign: 'left' }

        if ( fieldLineHeight === 1 ) {
            extendedStyle.height = 32 //perfect align with one line fields (same height as a basif form-control)
        }
        else if ( fieldLineHeight === 1.5 ) {
            extendedStyle.height = 48 //no align possible in that case, can be used to reduce space of input
        }
        else if ( fieldLineHeight === 2 ) {
            extendedStyle.height = 64 //no align possible in that case, can be used to reduce space of input
        }
        else {
            extendedStyle.height = 91 //allows two "one line fields to stack"
        }

        return extendedStyle
    }

    private selectOption = ( event: any, field: WrappedFieldProps<any>, selectValue: string[], option: string ) => {
        event.preventDefault()
        this.handleChoiceSelect( field, selectValue, option, event.ctrlKey || event.metaKey )
    }

    private handleChoiceSelect = ( field: WrappedFieldProps<any>, currentSelection: string[], choice: string, cmdOrCtrlKeyOn?: boolean ) => {

        const newSelection: string[] = currentSelection.indexOf( choice ) !== -1
            ? removeValFromArrayNoDup( currentSelection as string[], choice )
            : addValToArrayNoDup( currentSelection as string[], choice )

        this.props.handleChange( {
            target: {
                value: currentSelection.indexOf( choice ) !== -1
                    ? removeValFromArrayNoDup( currentSelection as string[], choice )
                    : addValToArrayNoDup( currentSelection as string[], choice ),
                name: this.props.name
            }
        } )

        if ( cmdOrCtrlKeyOn && this.dropdownCtn ) {
            $( this.dropdownCtn ).removeClass( 'open' ).addClass( 'open' )
        } else {
            $( event.currentTarget ).scrollTop( 0 )
        }

        field.input.onChange( newSelection.join( ',' ), undefined, undefined )
    }

}

export { MultiSelectInput }