// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Utils
import { compileWordings } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import Spinner from '@amalto/spinner'
import Switch from '@amalto/switch'
import FileInput from '@amalto/file-input'

// Models
import { WorkflowActionParam } from '../models/Workflow'
import { FileWrapper } from '@amalto/typings'

module FormInput {
    export interface Props extends React.Props<FormInput> {
        inputDef: WorkflowActionParam;
        inputValue: any;
        invalid: boolean;
        handleChange: ( inputName: string, value: string | boolean ) => void;
        fileUploadSessionToken: string;
        newFileUploadSession: () => void;
        cancelFileUploadSession: () => void;
        filesQueue: {
            [fileName: string]: FileWrapper
        };
        addFiles: ( files: File[] ) => void;
        deleteFile: ( fileName: string ) => void;

        locale: string;
    }

    export interface State {
        wordings?: { [id: string]: string };
    }
}

class FormInput extends React.Component<FormInput.Props, FormInput.State> {

    constructor( props: FormInput.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { wordings } = this.state
        const { inputDef, locale } = this.props
        let language = locale.substr( 0, 2 ).toUpperCase()

        let label = inputDef.i18nLabelMap ? inputDef.i18nLabelMap[language] : null

        let input = null

        let baseInputProps = {
            className: 'form-control',
            value: this.props.inputValue
        }

        switch ( inputDef.inputType ) {
            case 'TEXTAREA':
                {
                    input = <textarea {...baseInputProps} onChange={this.handleInput} />
                    break;
                }
            case 'SELECT':
                {
                    input = (
                        <select {...baseInputProps} onChange={this.handleInput}>
                            <option value="">{wordings['selectValue']}</option>
                            {
                                inputDef.choices.map( ( choice, idx ) => {
                                    let choiceLabel = choice.i18nLabelMap ? choice.i18nLabelMap[language] : choice.value

                                    return <option key={choice.value + idx} value={choice.value}>{choiceLabel}</option>
                                } )
                            }
                        </select>
                    )
                    break;
                }
            case 'CHECKBOX':
                {
                    input = (
                        <div>
                            {
                                inputDef.choices.map( ( choice, idx ) => {
                                    let choiceLabel = choice.i18nLabelMap ? choice.i18nLabelMap[language] : choice.value
                                    let isChecked = this.props.inputValue ? this.props.inputValue.split( ',' ).indexOf( choice.value ) !== -1 : false

                                    return (
                                        <span className="form-checkbox-wrapper right-margin" key={idx}>
                                            <input className="form-checkbox" type="checkbox"
                                                id={choice.value} name={choice.value}
                                                value={choice.value}
                                                checked={isChecked}
                                                onChange={this.handleInput}
                                            />
                                            <label className="form-checkbox-label" htmlFor={choice.value}>{choiceLabel}</label>
                                        </span>
                                    )
                                } )
                            }
                        </div>
                    )
                    break;
                }
            case 'SWITCH':
                {
                    input = <Switch id={inputDef.name} value={this.props.inputValue} changeHandler={this.handleValueChange} alignLeft={true} />
                    break;
                }
            case 'FILES':
                {
                    input = this.props.fileUploadSessionToken ? (
                        <FileInput
                            cancelSubmit={this.props.cancelFileUploadSession}
                            filesQueue={this.props.filesQueue}
                            addFilesToQueue={this.props.addFiles}
                            deleteUploadedFile={this.props.deleteFile}
                            locale={locale}
                        />
                    ) : (
                            <div>
                                <button className="btn btn-sm btn-font btn-trans" onClick={this.props.newFileUploadSession}>
                                    {wordings['addFiles']}
                                </button>
                            </div>
                        )
                    break;
                }
            case 'TEXT':
            default:
                {
                    input = <input type="text" {...baseInputProps} onChange={this.handleInput} />
                    break;
                }
        }

        let labelDisplay = label ? <label>{label}</label> : null

        return (
            <div className="col-xs-12">
                <div className={classNames( 'form-group bottom-margin', {
                    'mandatory': this.props.inputDef.mandatory,
                    'invalid': this.props.invalid
                } )}>
                    {labelDisplay}
                    {input}
                </div>
            </div>
        )

    }

    componentWillReceiveProps( nextProps: FormInput.Props ) {
        if ( this.props.inputDef.inputType === 'FILES' && this.props.fileUploadSessionToken !== nextProps.fileUploadSessionToken ) {
            let token = nextProps.fileUploadSessionToken ? nextProps.fileUploadSessionToken : ''
            this.props.handleChange( this.props.inputDef.name, token )
        }
    }

    private handleValueChange = ( value: any ) => {
        if ( this.props.inputDef.name ) {
            this.props.handleChange( this.props.inputDef.name, value )
        }
    }

    private handleInput = ( event: any ) => {
        if ( this.props.inputDef.name ) {
            if ( event.target.type === 'checkbox' ) {
                let updatedValues: string[] = this.props.inputValue ? this.props.inputValue.split( ',' ) : []

                //remove empty values
                updatedValues = updatedValues.filter( value => {
                    return !!value
                } )

                if ( event.target.checked ) {
                    updatedValues.push( event.target.value )
                } else {
                    updatedValues.splice( updatedValues.indexOf( event.target.value ), 1 )
                }

                this.props.handleChange( this.props.inputDef.name, updatedValues.join( ',' ) )
            }
            else {
                this.props.handleChange( this.props.inputDef.name, event.target.value )
            }
        }
    }

}


export default FormInput