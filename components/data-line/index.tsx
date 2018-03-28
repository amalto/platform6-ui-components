/**
 * Created by franckmontaigne on 14/06/16.
 */

// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components 
import DataItem from './components/DataItem'

// Models
import { CellData } from './models/DataGrid'
import { DisplayTemplate, DisplayTemplateItem } from './models/DisplayTemplate'

/**
 * DateLine shouldn't be used outside the DataGrid component else it won't be displayed correctly.
 */
module DataLine {
    export interface Props extends React.Props<DataLine> {
        /** Cells to be displayed. More details on [CellData](#celldata). */
        cells: CellData[];
        /** Single click event handler. */
        sgleClickHandler?: () => void;
        /** Double click event handler. */
        dbleClickHandler?: () => void;
        /** Cell input onchange event. */
        cellEditHandler?: ( key: string, value: string ) => void;
        /** Triggered when cell is in edit mode and user press Enter key. */
        enterPressHandler?: () => void;
        /** Triggered when user press Tab key on the last cell of the line in edit mode. */
        tabOnLastCellCallback?: () => void;
        /** If true, all cell will be turned into input and would be editable. */
        editMode?: boolean;
        /** If true, an orange triangle will be displayed on the right bottom of each cells. */
        isNew?: boolean;
        /** CSS style applied to the line. */
        style?: React.CSSProperties;
        /** CSS class applied to the line. */
        cssClass?: string;

        /** Handle cells width, aligment, color, order and display mode (desktop, laptop or mobile). More details on [DisplayTemplate](#displaytemplate). */
        displayTemplate?: DisplayTemplate;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<DataLine>;
    }
}

class DataLine extends React.Component<DataLine.Props, any> {

    constructor( props: DataLine.Props ) {
        super( props )
    }

    render() {

        const { displayTemplate, cells, editMode, cellEditHandler, tabOnLastCellCallback, enterPressHandler } = this.props

        let filteredAndSortedCells = cells

        if ( displayTemplate ) {
            filteredAndSortedCells = cells.filter( cellData => {
                //FIXME
                /* hardcoded access to desktop display mode */
                if ( displayTemplate[cellData.columnId] ) {
                    return displayTemplate[cellData.columnId].desktop.display !== false
                }

                return true
            } ).sort( ( cellA, cellB ) => {
                if ( displayTemplate[cellA.columnId] && displayTemplate[cellA.columnId].desktop && displayTemplate[cellB.columnId] && displayTemplate[cellB.columnId].desktop ) {
                    return displayTemplate[cellA.columnId].desktop.order - displayTemplate[cellB.columnId].desktop.order
                }

                return 0
            } )
        }

        let cellsDisplay = filteredAndSortedCells.map( ( cellData, idx ) => {
            return (
                <DataItem key={idx}
                    columnId={cellData.columnId}
                    displayValue={cellData.displayValue}
                    cssClass={cellData.cssClass}
                    displayTemplate={displayTemplate}
                    editCallback={cellEditHandler}
                    enterPressCallback={enterPressHandler}
                    editMode={editMode}
                    readOnly={cellData.readOnly}
                    isEdited={cellData.isEdited}
                    lastEditable={cellData.lastEditable}
                    options={cellData.options}
                    validate={cellData.validate}
                    tabOnLastCellCallback={tabOnLastCellCallback} />
            )
        } )

        let additionalProps = {} as React.HTMLAttributes<any>

        if ( this.props.sgleClickHandler ) {
            additionalProps.onClick = this.props.sgleClickHandler
        }

        if ( this.props.dbleClickHandler ) {
            additionalProps.onDoubleClick = this.props.dbleClickHandler
        }

        return (
            <div style={this.props.style} className={classNames( this.props.cssClass, 'card-item inline-item', {
                'dg-new-line': this.props.isNew
            } )} {...additionalProps}>
                <div className='card-item-content'>
                    {cellsDisplay}
                </div>
            </div>
        )
    }

}

export default DataLine