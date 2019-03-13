/**
 * Created by franckmontaigne on 14/06/16.
 */

// Modules
import * as React from 'react'
import * as classNames from 'classnames'
import * as CSS from 'csstype'

// Models
import { DisplayTemplate, DisplayTemplateItem, DisplayMode } from '@amalto/typings'

// constants
const STRING_MAX_LENGTH = 300

module DataItem {
    export interface Props {
        displayValue: JSX.Element | string | number;
        displayValueMaxLength?: number;
        columnId: string;
        cssClass?: string;
        editCallback?: ( key: string, value: string ) => void;
        enterPressCallback?: () => void;
        tabOnLastCellCallback?: () => void;
        displayContextMenu?: ( columnId: string, value: string, posX: number, posY: number ) => void;
        editMode?: boolean;
        readOnly?: boolean;
        isEdited?: boolean;
        lastEditable?: boolean;
        allowDisplayAsTextAreaOnReadonly?: boolean;
        options?: {
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
        validate?: ( value: string ) => any;
        displayTemplate?: DisplayTemplate;
        displayMode: DisplayMode;
        label?: JSX.Element | string;
    }
}

// Close textarea on cell
function closeTextareaDisplay( event: React.KeyboardEvent<any>, setShowAsTextarea: ( value: boolean ) => void ) {
    //detect ESC key (onKeyUp event)
    if ( event.keyCode === 27 ) {
        setShowAsTextarea( false )
    }
}

// Display textarea component on cell
function toggleTextareaDisplay( showAsTextarea: boolean, setShowAsTextarea: ( value: boolean ) => void ) {
    setShowAsTextarea( !showAsTextarea )
}

// Textarea onChange handler
function handleEdit( event: any, setTextareaValue: ( value: string ) => void ) {
    setTextareaValue( event.target.value )
}

// Check check ENTER key
function keyPressHandler( event: React.KeyboardEvent<any>, invalidMsg: string, enterPressCallback: () => void, isEdited: boolean ) {
    if ( event.charCode === 13 ) {

        event.preventDefault()

        if ( !invalidMsg && enterPressCallback && isEdited ) {
            enterPressCallback()
        }
    }
}

// Handle TAB key
function handleTabPress( event: React.KeyboardEvent<any>, tabOnLastCellCallback: () => void ) {
    if ( event.keyCode === 9 ) {
        event.preventDefault()
        tabOnLastCellCallback()
    }
}

/**
* This method allow you to get the columnId and the display value if the cell data.
* You will be able to handle truncated long display value with a context menu.
* 
* e.g: Using copy to clipboard.
*/
function internalDisplayContextMenu( e, columnId: string, displayValue: string, displayContextMenu: ( columnId: string, value: string, posX: number, posY: number ) => void ) {
    e.preventDefault()
    displayContextMenu( columnId, displayValue as string, e.clientX, e.clientY )
}

/**
 * Truncate display value inside the cell only if the displayValue is a string.
 * Note that it won't work on JSX.Element, you will have to truncate the content yourself.
 */
function truncateDisplayValue( displayValue: string | JSX.Element | number, contentTooLong: boolean, valueMaxLength: number ): string | JSX.Element | number {
    if ( !displayValue ) return '-'

    if ( typeof displayValue !== 'string' ) return displayValue

    return contentTooLong ? displayValue.substring( 0, valueMaxLength ) + '...' : displayValue

}

function DataItem( props: DataItem.Props ) {
    const {
        options,
        editCallback,
        editMode,
        readOnly,
        allowDisplayAsTextAreaOnReadonly,
        isEdited,
        lastEditable,
        tabOnLastCellCallback,
        displayContextMenu,
        displayTemplate,
        displayValue,
        columnId,
        cssClass,
        displayMode,
        label
    } = props

    // Initialize state
    const [textareaValue, setTextareaValue] = React.useState( '' )
    const [showAsTextarea, setShowAsTextarea] = React.useState( false )
    const [invalidMsg, setInvalidMsg] = React.useState( undefined )
    const [valueMaxLength, setValueMaxLength] = React.useState( props.displayValueMaxLength || STRING_MAX_LENGTH )
    const [contentTooLong, setContentTooLong] = React.useState( false )

    // Component did mount
    React.useEffect( () => {
        const displayValueLimit: number = props.displayValueMaxLength || STRING_MAX_LENGTH

        if ( typeof props.displayValue === 'string' && props.displayValue.length > displayValueLimit ) {
            setContentTooLong( true )
        }
    }, [] )

    // Component did update
    React.useEffect( () => {
        const valueMaxLength: number = props.displayValueMaxLength || STRING_MAX_LENGTH

        setContentTooLong( typeof props.displayValue === 'string' && props.displayValue.length > valueMaxLength )
        setValueMaxLength( valueMaxLength )
    }, [props.displayValueMaxLength, props.displayValue] )

    // Triggered only if textareaValue has changed
    React.useEffect( () => {
        const newInvalidMsg: string = props.validate && props.validate( textareaValue ) || undefined

        if ( newInvalidMsg !== invalidMsg ) {
            setInvalidMsg( invalidMsg )
        } else {
            props.editCallback( props.columnId, textareaValue )
        }
    }, [textareaValue] )

    // Triggered only if invalidMsg has changed ( setInvalidMsg has been triggered )
    React.useEffect( () => {
        props.editCallback( props.columnId, textareaValue )
    }, [invalidMsg] )

    const itemDisplaySettings: DisplayTemplateItem = displayTemplate ? displayTemplate[columnId] : null

    let userStyles: CSS.Properties = displayMode === 'mobile'
        ? {} as any
        : ( itemDisplaySettings && itemDisplaySettings[displayMode]
            ? {
                width: itemDisplaySettings[displayMode].width,
                textAlign: itemDisplaySettings[displayMode].textAlign as CSS.TextAlignProperty,
                color: itemDisplaySettings.color
            }
            : { width: 150 } )

    let additionalProps = {} as React.HTMLAttributes<any>

    const editable = editCallback && editMode && !readOnly

    const tabPressHandler: React.HTMLAttributes<any> = isEdited && lastEditable && tabOnLastCellCallback ? {
        onKeyDown: ( e: React.KeyboardEvent<HTMLTextAreaElement> ) => handleTabPress( e, tabOnLastCellCallback )
    } : {}

    let _displayValue = editable ? (
        ( options && options.length ? (
            <div className="form-inline">
                <select className="form-control form-control-sm" onChange={( e: React.ChangeEvent<HTMLSelectElement> ) => handleEdit( e, setTextareaValue )}>
                    {options.map( ( opt, idx ) => <option key={idx} value={opt.value} disabled={opt.disabled}>{opt.label || opt.value}</option> )}
                </select>
            </div>
        ) : (
                <div>
                    <div className="form-inline">
                        <textarea className={classNames( "form-control form-control-sm", {
                            "invalid": !!invalidMsg
                        } )}
                            value={displayValue as string || ''}
                            onChange={this.handleEdit}
                            onKeyPress={( e: React.KeyboardEvent<HTMLTextAreaElement> ) => keyPressHandler( e, invalidMsg, props.enterPressCallback, props.isEdited )}
                            {...tabPressHandler}
                        />
                    </div>
                    {!invalidMsg ? null : <span className='danger-color text-xsmall'>{invalidMsg}</span>}
                </div>
            )
        )
    ) : (
            <div onContextMenu={
                displayContextMenu
                    ? ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => internalDisplayContextMenu( e, columnId, displayValue.toString(), displayContextMenu )
                    : undefined}>
                {truncateDisplayValue( displayValue, contentTooLong, valueMaxLength )}
            </div>
        )

    if ( allowDisplayAsTextAreaOnReadonly && readOnly && typeof displayValue === 'string' ) {
        additionalProps.onDoubleClick = ( _e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => toggleTextareaDisplay( showAsTextarea, setShowAsTextarea )

        if ( showAsTextarea ) {
            _displayValue = (
                <div className="form-inline">
                    <textarea className="form-control form-control-sm" value={displayValue as string || ''} onKeyUp={e => closeTextareaDisplay( e, setShowAsTextarea )}
                        disabled={true} readOnly={true} />
                </div>
            )
        }
    }

    /* IMPORTANT - BE CAREFUL */
    /* the .dg-cell-edited is used in some files to select the first edited input of a datagrid ! */
    /* This shouldn't be modified without extra modifications on other parts of the project */

    return (
        <div className={classNames( cssClass, {
            'card-item-value inline-item-value': displayMode !== 'mobile',
            'inline-block mgb-10 mgr-20 align-top break-word': displayMode === 'mobile' && columnId !== 'actions',
            'mgt-10 mgb-10 text-center mobile-action-buttons': displayMode === 'mobile' && columnId === 'actions',
            'dg-cell-edited': isEdited
        } )} style={userStyles} {...additionalProps}>

            {displayMode === 'mobile' && columnId !== 'actions' ? <label className="dimmed">{label || columnId}</label> : null}

            {_displayValue}
        </div>
    )
}

export default DataItem