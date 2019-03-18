import * as React from 'react'
import classNames from 'classnames'

import { Option } from '../models/Option'

import { removeValFromArrayNoDup, addValToArrayNoDup } from '@amalto/helpers'

import Help from '@amalto/help'

module DropdownInput {
    export interface Props {
        /** Input label name. */
        name: string;
        /** Current selection. If multiple is set to true, must be an array of string. */
        value?: string | string[];
        /** Input's label. */
        label: string | JSX.Element;
        /** Choice list. */
        options: Option[];
        optionsLabel?: string[];
        filterDisplayName: string | JSX.Element
        /** Allow multiple selection. */
        multiple?: boolean;
        fieldLineHeight?: number;
        /** Triggered when selecting an option. */
        handleChange: ( event: any ) => void;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
    }
}

function DropdownInput( props: DropdownInput.Props ) {
    const { name, value, multiple, fieldLineHeight, options, optionsLabel, handleChange, filterDisplayName, label, help, inputClass, containerClass } = props

    const dropdownCtn: React.MutableRefObject<HTMLDivElement> = React.useRef( null )

    // get the selected values as an array if it's a multi-select field
    if ( multiple ) {
        const selectValue: string[] = value as string[] || []
        let choices = ( optionsLabel as string[] ).map( ( choice, idx ) => {

            let option = choice.trim()

            return (
                <li key={idx} className={classNames( { 'active': value.indexOf( option ) !== -1 } )}>
                    <a href="#" onClick={( e ) => {
                        e.preventDefault()
                        handleChoiceSelect(
                            { name, currentSelection: selectValue, choice: option, multiple, dropdownCtn },
                            handleChange,
                            e.ctrlKey || e.metaKey
                        )
                    }}>{option}</a>
                </li>
            )
        } )

        let extendedStyle: React.CSSProperties = multiple && selectValue && !!selectValue.length ? { textAlign: 'left', paddingRight: 20 } : { textAlign: 'left' }

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

        return (
            <div className={classNames( 'form-group', containerClass )} style={{ position: 'relative' }} ref={dropdownCtn}>
                {
                    label
                        ? <label>
                            {filterDisplayName}
                            {help && <Help text={help} />}
                        </label>
                        : null
                }

                <button type="button" className={classNames( 'btn form-control dropdown-toggle rel', inputClass, {
                    'multi-select-input': multiple
                } )} data-toggle="dropdown" style={extendedStyle}>

                    {
                        multiple && selectValue && selectValue.length ? (
                            <div className="dropdown-active-tags">
                                {
                                    selectValue.map( ( value, idx ) => {

                                        return (
                                            <span key={value + idx}
                                                className="tag"
                                                onClick={_e => {
                                                    handleChoiceSelect( { name, currentSelection: selectValue, choice: value, multiple, dropdownCtn }, handleChange, false, true )
                                                }}>
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
                <ul className="dropdown-menu mgb-20" style={{ left: 'auto' }}>
                    {choices}
                </ul>
            </div>
        )

    }
    else {

        const selectValue: string = value as string || ''

        let choices = options.map( ( choice, idx ) => {
            return (
                <option value={choice.value.trim()} key={idx}>{choice.label.trim()}</option>
            )
        } )

        return (
            <div className={classNames( 'form-group', containerClass )}>
                {
                    label
                        ? <label>
                            {filterDisplayName}
                            {help && <Help text={help} />}
                        </label>
                        : null
                }
                <select multiple={multiple} className={classNames( 'form-control', inputClass )}
                    value={selectValue}
                    name={name}
                    onChange={e => { handleSelectChange( e, multiple, handleChange ) }}>
                    <option value=""></option>
                    {choices}
                </select>
            </div>
        )
    }
}

function handleSelectChange( event: React.ChangeEvent<HTMLSelectElement>, multiple: boolean, handleChange: ( event: any ) => void ): void {
    if ( multiple ) { $( event.currentTarget ).scrollTop( 0 ) }

    handleChange( event )
}

function handleChoiceSelect(
    data: {
        name: string,
        currentSelection: string[],
        choice: string,
        multiple: boolean,
        dropdownCtn: React.MutableRefObject<HTMLDivElement>
    },
    handleChange: ( event: any ) => void,
    cmdOrCtrlKeyOn?: boolean,
    disableDropdown?: boolean
): void {
    const { name, currentSelection, choice, multiple, dropdownCtn } = data

    handleChange( {
        target: {
            value: multiple ? currentSelection.indexOf( choice ) !== -1 ? removeValFromArrayNoDup( currentSelection as string[], choice ) : addValToArrayNoDup( currentSelection as string[], choice ) : choice,
            name,
            multiple
        }
    } )

    if ( !disableDropdown && cmdOrCtrlKeyOn && dropdownCtn ) {
        $( dropdownCtn.current ).removeClass( 'open' ).addClass( 'open' )
    }
}

export default DropdownInput