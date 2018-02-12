/**
 * Created by franckmontaigne on 14/06/16.
 */


import * as React from 'react'

import { DisplayTemplate, DisplayTemplateItem } from '../models/DisplayTemplate'

//modules
import * as classNames from 'classnames'

module DataItem {
    export interface Props extends React.Props<DataItem> {
        displayValue: JSX.Element | string;
        columnId: string;
        cssClass?: string;
        editCallback?: ( key: string, value: string ) => void;
        enterPressCallback?: () => void;
        tabOnLastCellCallback?: () => void;
        editMode?: boolean;
        readOnly?: boolean;
        isEdited?: boolean;
        lastEditable?: boolean;
        options?: {
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
        validate?: ( value: string ) => any;
        displayTemplate?: DisplayTemplate;
    }

    export interface State {
        showAsTextarea?: boolean;
        invalidMsg?: string;
    }
}

class DataItem extends React.Component<DataItem.Props, DataItem.State> {
    constructor( props: DataItem.Props ) {
        super( props )
        this.state = {
            showAsTextarea: false,
            invalidMsg: undefined
        }
    }

    render() {

        const { options, editCallback, editMode, readOnly, isEdited, lastEditable, tabOnLastCellCallback, displayTemplate, displayValue, columnId, cssClass } = this.props

        const itemDisplaySettings: DisplayTemplateItem = displayTemplate ? displayTemplate[columnId] : null

        //FIXME
        /* hardcoded access to desktop display mode */

        let userStyles: React.CSSProperties = itemDisplaySettings ? {
            width: itemDisplaySettings.desktop.width,
            textAlign: itemDisplaySettings.desktop.textAlign,
            color: itemDisplaySettings.color
        } : {
                width: 150
            }

        let additionalProps = {} as React.HTMLAttributes<any>

        const editable = editCallback && editMode && !readOnly

        const tabPressHandler: React.HTMLAttributes<any> = isEdited && lastEditable && tabOnLastCellCallback ? {
            onKeyDown: this.handleTabPress
        } : {}

        let _displayValue = editable ? (
            ( options && options.length ? (
                <div className="form-inline">
                    <select className="form-control form-control-sm" onChange={this.handleEdit}>
                        {options.map( ( opt, idx ) => <option key={idx} value={opt.value} disabled={opt.disabled}>{opt.label || opt.value}</option> )}
                    </select>
                </div>
            ) : (
                    <div>
                        <div className="form-inline">
                            <textarea className={classNames( "form-control form-control-sm", {
                                "invalid": !!this.state.invalidMsg
                            } )}
                                value={displayValue as string || ''}
                                onChange={this.handleEdit}
                                onKeyPress={this.keyPressHandler} {...tabPressHandler}
                            />
                        </div>
                        {!this.state.invalidMsg ? null : <span className='danger-color text-xsmall'>{this.state.invalidMsg}</span>}
                    </div>
                )
            )
        ) : <div>{displayValue || '-'}</div>

        if ( readOnly && typeof displayValue === 'string' ) {
            additionalProps.onDoubleClick = this.toggleTextareaDisplay

            if ( this.state.showAsTextarea ) {
                _displayValue = (
                    <div className="form-inline">
                        <textarea className="form-control form-control-sm" value={displayValue as string || ''} onKeyUp={this.closeTextareaDisplay}
                            disabled={true} readOnly={true} />
                    </div>
                )
            }
        }

        /* IMPORTANT - BE CAREFUL */
        /* the .dg-cell-edited is used in some files to select the first edited input of a datagrid ! */
        /* This shouldn't be modified without extra modifications on other parts of the project */

        return (
            <div className={classNames( 'card-item-value inline-item-value', cssClass, {
                'dg-cell-edited': isEdited
            } )} style={userStyles} {...additionalProps}>
                {_displayValue}
            </div>
        )
    }

    private closeTextareaDisplay = ( event: React.KeyboardEvent<any> ) => {
        //detect ESC key (onKeyUp event)
        if ( event.keyCode === 27 ) {
            this.setState( {
                showAsTextarea: false
            } )
        }
    }

    private toggleTextareaDisplay = () => {
        this.setState( { showAsTextarea: !this.state.showAsTextarea } )
    }

    private handleEdit = ( event: any ) => {
        const value: string = event.target.value
        const invalidMsg: string = this.props.validate && this.props.validate( value ) || undefined

        if ( invalidMsg !== this.state.invalidMsg ) {
            this.setState( { invalidMsg } as DataItem.State, () => this.props.editCallback( this.props.columnId, value ) )
        } else {
            this.props.editCallback( this.props.columnId, value )
        }

    }

    private keyPressHandler = ( event: React.KeyboardEvent<any> ) => {
        if ( event.charCode === 13 ) {

            event.preventDefault()

            if ( !this.state.invalidMsg && this.props.enterPressCallback && this.props.isEdited ) {
                this.props.enterPressCallback()
            }
        }
    }

    private handleTabPress = ( event: React.KeyboardEvent<any> ) => {
        if ( event.keyCode === 9 ) {
            event.preventDefault()
            this.props.tabOnLastCellCallback()
        }
    }

}

export default DataItem