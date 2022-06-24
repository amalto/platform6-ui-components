/**
 * Created by franckmontaigne on 14/06/16.
 */

// Modules
import * as React from 'react'
import { default as classNames } from 'classnames'
import { CellData, DisplayTemplate, DisplayTemplateItem, DisplayMode, ColumnHeader } from '@amalto/typings'

// Components
import DataItem from './components/DataItem'

/**
 * DateLine shouldn't be used outside the DataGrid component else it won't be displayed correctly.
 */
export module DataLine {
    export interface Props extends React.ClassAttributes<DataLine> {
        /** Cells to be displayed. More details on [CellData](#celldata). */
        cells: CellData[];
        /** Single click event handler. */
        sgleClickHandler?: () => void;
        /** Double click event handler. */
        dbleClickHandler?: () => void;
        /** Cell input <span className='quote'>onChange</span> event. */
        cellEditHandler?: ( key: string, value: string ) => void;
        /** Triggered when cell is in edit mode and user press Enter key. */
        enterPressHandler?: () => void;
        /** Triggered when user press <span className='quote'>tab</span> key on the last cell of the line in edit mode. */
        tabOnLastCellCallback?: () => void;
        /** Triggered when right clicking on a cell. */
        displayContextMenu?: ( columnId: string, value: string, posX: number, posY: number ) => void;
        /**
         * If true, all cell will be turned into input and would be editable.
         * @default false
         */
        editMode?: boolean;
        /**
         * If true, an orange triangle will be displayed on the right bottom of each cells.
         * @default false
         */
        isNew?: boolean;
        /** CSS style applied to the line. */
        style?: React.CSSProperties;
        /** CSS class applied to the line. */
        cssClass?: string;


        /** Hide props from documentation */

        /** @ignore */
        displayMode?: DisplayMode;//this is auto added by the datagrid component
        /** @ignore */
        columnHeaders?: ColumnHeader[];//this is auto added by the datagrid component
        /** @ignore */
        displayTemplate?: DisplayTemplate;//this is auto added by the datagrid component

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<DataLine>;
    }
}

export class DataLine extends React.Component<DataLine.Props, any> {

    constructor( props: DataLine.Props ) {
        super( props )
    }

    render() {

        const { displayTemplate, cells, editMode, cellEditHandler, tabOnLastCellCallback, displayContextMenu, enterPressHandler, dbleClickHandler, displayMode, columnHeaders } = this.props

        let filteredAndSortedCells = cells

        if ( displayTemplate && displayMode !== 'mobile' ) {
            filteredAndSortedCells = cells.filter( cellData => {

                if ( displayTemplate[cellData.columnId] && displayTemplate[cellData.columnId][displayMode] ) {
                    return displayTemplate[cellData.columnId][displayMode].display !== false
                }

                return true
            } ).sort( ( cellA, cellB ) => {
                if ( displayTemplate[cellA.columnId] && displayTemplate[cellA.columnId][displayMode] && displayTemplate[cellB.columnId] && displayTemplate[cellB.columnId][displayMode] ) {
                    return displayTemplate[cellA.columnId][displayMode].order - displayTemplate[cellB.columnId][displayMode].order
                }

                return 0
            } )
        }

        let cellsDisplay = filteredAndSortedCells.map( ( cellData, idx ) => {

            let label = undefined

            if ( columnHeaders && columnHeaders.length ) {
                for ( let i = 0; i < columnHeaders.length; i++ ) {
                    const colHeader = columnHeaders[i]
                    if ( colHeader.id === cellData.columnId ) {
                        label = colHeader.label
                        break;
                    }
                }
            }

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
                    allowDisplayAsTextAreaOnReadonly={cellData.allowDisplayAsTextAreaOnReadonly}
                    isEdited={cellData.isEdited}
                    lastEditable={cellData.lastEditable}
                    options={cellData.options}
                    validate={cellData.validate}
                    tabOnLastCellCallback={tabOnLastCellCallback}
                    displayContextMenu={displayContextMenu}
                    displayMode={displayMode}
                    label={label}
                />
            )
        } )

        let additionalProps = {} as React.HTMLAttributes<any>

        if ( this.props.sgleClickHandler ) {
            additionalProps.onClick = this.props.sgleClickHandler
        }

        if ( dbleClickHandler ) {
            additionalProps.onDoubleClick = dbleClickHandler
        }

        return (
            <div style={this.props.style} className={classNames( 'card-item', this.props.cssClass, {
                "dg-new-line": this.props.isNew,
                "inline-item": displayMode !== 'mobile',
                "tile mgb-10 block-tile": displayMode === 'mobile'
            } )} {...additionalProps}>
                <div className={classNames( {
                    "card-item-content": displayMode !== 'mobile'
                } )}>
                    {cellsDisplay}
                </div>
            </div>
        )
    }

}

export { CellData }

export default DataLine