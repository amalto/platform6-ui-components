/**
 * Created by franckmontaigne on 02/06/16.
 */

// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components
import HeaderItem from './HeaderItem'

// Models
import NotificationModel from '../models/NotificationModel'
import { ColumnHeader } from '../models/DataGrid'
import { DisplayTemplate, DisplayTemplateItem } from '../models/DisplayTemplate'

module HeaderLine {
    export interface Props extends React.Props<HeaderLine> {
        columnHeaders: ColumnHeader[];

        sortHandler?: ( columnId: string, sortDirection: string ) => void;
        sortColumn?: string;
        sortDirection?: string;

        preventTemplating?: boolean;

        orderHandler?: ( columnId: string, order: string ) => void;
        widthHandler?: ( columnId: string, way: string ) => void;
        textAlignHandler?: ( columnId: string, align: string ) => void;
        displayHandler?: ( columnId: string, display: boolean ) => void;
        templateChangeHandler?: ( template: DisplayTemplate ) => void

        displayContextMenu?: ( content: any, positionX?: number, positionY?: number ) => void;
        displayNotification?: ( notificationOptions?: NotificationModel ) => void;
        hideContextMenu?: () => void;

        stickyHeader?: boolean

        displayTemplate?: DisplayTemplate;

        locale: string;
    }

    export interface State {
    }
}

class HeaderLine extends React.Component<HeaderLine.Props, HeaderLine.State> {
    constructor( props: HeaderLine.Props ) {
        super( props )
    }

    render() {

        const { displayTemplate, columnHeaders, stickyHeader, locale } = this.props

        let filteredAndSortedColumnHeaders = columnHeaders

        if ( displayTemplate ) {
            filteredAndSortedColumnHeaders = columnHeaders.filter( columnHeader => {
                //FIXME
                /* hardcoded access to desktop display mode */
                if ( displayTemplate[columnHeader.id] ) {
                    return displayTemplate[columnHeader.id].desktop.display !== false
                }

                return true
            } ).sort( ( colA, colB ) => {
                if ( displayTemplate[colA.id] && displayTemplate[colA.id].desktop && displayTemplate[colB.id] && displayTemplate[colB.id].desktop ) {
                    return displayTemplate[colA.id].desktop.order - displayTemplate[colB.id].desktop.order
                }

                return 0
            } )
        }

        let columnHeadersDisplay = filteredAndSortedColumnHeaders.map( ( columnHeader, idx ) => {
            return (
                <HeaderItem key={columnHeader.id}
                    columnHeader={columnHeader}

                    sortHandler={this.props.sortHandler}
                    sortColumn={this.props.sortColumn}
                    sortDirection={this.props.sortDirection}

                    preventTemplating={this.props.preventTemplating}

                    orderHandler={this.props.orderHandler}
                    displayHandler={this.props.displayHandler}
                    widthHandler={this.props.widthHandler}
                    textAlignHandler={this.props.textAlignHandler}
                    templateChangeHandler={this.props.templateChangeHandler}

                    displayContextMenu={this.props.displayContextMenu}
                    displayNotification={this.props.displayNotification}
                    hideContextMenu={this.props.hideContextMenu}

                    displayTemplate={displayTemplate}

                    locale={locale}
                />

            )
        } )

        return (
            <div className={classNames( {
                'sticky-dg-header': stickyHeader
            } )}>
                <div className={classNames( 'dg-inline-headers', {
                    'mgb-10': !stickyHeader
                } )}>
                    {columnHeadersDisplay}
                </div>
            </div>
        )

    }


}

export default HeaderLine
