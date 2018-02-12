/**
 * Created by franckmontaigne on 02/06/16.
 */


import * as React from 'react'

//utils
import { isValidColorCode, compileWordings } from '@amalto/helpers'

//wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

//components & models
import ColorPicker from '@amalto/color-picker'
import NotificationModel from '../models/NotificationModel'
import { ColumnHeader } from '../models/DataGrid'
import { DisplayTemplate, DisplayTemplateItem } from '../models/DisplayTemplate'

//modules
import * as classNames from 'classnames'


module HeaderItem {
    export interface Props extends React.Props<HeaderItem> {
        columnHeader: ColumnHeader;

        sortHandler?: ( columnId: string, sortDirection: string ) => void
        sortColumn?: string;
        sortDirection?: string;

        preventTemplating?: boolean;

        orderHandler?: ( columnId: string, order: string ) => void
        widthHandler?: ( columnId: string, way: string ) => void
        textAlignHandler?: ( columnId: string, align: string ) => void
        displayHandler?: ( columnId: string, display: boolean ) => void
        templateChangeHandler?: ( template: DisplayTemplate ) => void

        displayContextMenu?: ( content: any, positionX?: number, positionY?: number ) => void
        displayNotification?: ( notificationType?: NotificationModel.Type,
            notificationOptions?: NotificationModel,
            displayParameter?: any ) => void
        hideContextMenu?: () => void

        displayTemplate?: DisplayTemplate;
        locale: string;
    }

    export interface State {
        wordings?: { [id: string]: string };
    }
}

class HeaderItem extends React.Component<HeaderItem.Props, HeaderItem.State> {
    constructor( props: HeaderItem.Props ) {
        super( props )

        //only for initialisation purpose, no duplication of props
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { columnHeader, sortColumn, sortDirection, displayTemplate, preventTemplating, sortHandler } = this.props

        const sortIcon = columnHeader.id === sortColumn ? (
            <span className={classNames( 'dark-color sort-control fa', {
                'fa-long-arrow-up': sortDirection === "ASC",
                'fa-long-arrow-down': sortDirection === "DESC"
            } )} />
        ) : null

        const itemDisplaySettings = displayTemplate ? displayTemplate[columnHeader.id] : null

        //FIXME
        /* hardcoded access to desktop display mode */

        const headerStyle: React.CSSProperties = itemDisplaySettings ? {
            width: itemDisplaySettings.desktop.width,
            textAlign: itemDisplaySettings.desktop.textAlign
        } : {
                width: 150
            }

        let align = 'left'

        if ( itemDisplaySettings ) {
            align = itemDisplaySettings.desktop.textAlign
        }

        const advancedControls = displayTemplate && !columnHeader.disableClick && !preventTemplating ? (
            <div className="hover-menu" onContextMenu={this.handleCardContextMenu}>
                <div className="hover-menu-btn-container">
                    <span className="info-color fa fa-fw fa-chevron-left" data-column-id={columnHeader.id}
                        data-order="up" onClick={this.handleOrderChange} />
                    <span className={classNames( 'fa fa-fw fa-sort', {
                        'info-color': !!sortHandler,
                        'default-color': !sortHandler
                    } )} data-column-id={columnHeader.id}
                        onClick={this.handleSortChange} />
                    <span className="info-color fa fa-fw fa-chevron-right" data-column-id={columnHeader.id}
                        data-order="down" onClick={this.handleOrderChange} />
                </div>
                <div className="hover-menu-btn-container">
                    <span className="info-color fa fa-fw fa-trash" data-column-id={columnHeader.id}
                        onClick={this.hideColumn} />
                    <span className="info-color fa fa-fw fa-minus" data-column-id={columnHeader.id}
                        data-way="down" onClick={this.handleWidthChange} />
                    <span className="info-color fa fa-fw fa-plus" data-column-id={columnHeader.id}
                        data-way="up" onClick={this.handleWidthChange} />
                </div>
                <div className="hover-menu-btn-container">
                    <span className={classNames( 'fa fa-fw fa-align-left', {
                        'info-color': align !== 'left',
                        'black-color': align === 'left'
                    } )}
                        data-column-id={columnHeader.id}
                        data-align="left" onClick={this.handleTextAlignChange} />
                    <span className={classNames( 'fa fa-fw fa-align-center', {
                        'info-color': align !== 'center',
                        'black-color': align === 'center'
                    } )}
                        data-column-id={columnHeader.id}
                        data-align="center" onClick={this.handleTextAlignChange} />
                    <span className={classNames( 'fa fa-fw fa-align-right', {
                        'info-color': align !== 'right',
                        'black-color': align === 'right'
                    } )}
                        data-column-id={columnHeader.id}
                        data-align="right" onClick={this.handleTextAlignChange} />
                </div>
            </div>
        ) : null

        let additionalProps: React.HTMLAttributes<any> = this.props.displayTemplate ? {
            onMouseEnter: this.handleMenuEnter,
            onMouseLeave: this.handleMenuLeave
        } :
            (
                this.props.sortHandler ? {
                    onClick: this.handleSortChange
                } : {}
            )

        if ( this.props.columnHeader.disableClick ) {
            additionalProps = {}
        }

        return (
            <div key={columnHeader.id} style={headerStyle}
                className={classNames( 'dg-inline-header-item', {
                    'sorted-by': sortIcon ? true : false,
                    'click-pointer': this.props.sortHandler && !this.props.columnHeader.disableClick
                } )}
                data-column-id={columnHeader.id} {...additionalProps}>

                <div className="overflow-wrapper">
                    {sortIcon}
                    <span>{columnHeader.label}</span>
                </div>

                {advancedControls}

            </div>
        )
    }

    private handleCardContextMenu = ( event: any ): void => {
        event.preventDefault()
        this.updateContextMenu( event.clientX, event.clientY )
    }

    private updateContextMenu = ( positionX?: number, positionY?: number ): void => {

        const { displayTemplate, columnHeader, displayContextMenu } = this.props
        const itemDisplaySettings = displayTemplate ? displayTemplate[columnHeader.id] : null

        const contextMenuContent = (
            <div className="padded">

                <div className="bottom-margin top-margin">
                    <label>{this.state.wordings['headeritem.font.color']}</label>
                    <ColorPicker color={itemDisplaySettings.color} handleColorChange={this.handleColorChange} />
                </div>

                <div>
                    <button type="button" className="btn btn-sm btn-info btn-trans btn-block margin-none" onClick={this.closeContextMenu}>OK</button>
                </div>
            </div>
        )

        displayContextMenu( contextMenuContent, positionX, positionY )
    }

    private handleColorChange = ( color: string ): void => {

        const { columnHeader, templateChangeHandler } = this.props

        if ( isValidColorCode( color ) ) {

            let template: DisplayTemplate = {}
            template[columnHeader.id] = {
                color
            }

            templateChangeHandler( template )

            window.setTimeout( this.updateContextMenu, 250 )
        }
        else {
            this.props.displayNotification( NotificationModel.Type.INVALID_COLOR_CODE )
        }
    }

    private closeContextMenu = ( event: any ): void => {
        this.props.hideContextMenu()
    }

    private handleMenuEnter = ( event: any ) => {
        $( event.currentTarget ).addClass( 'on-mouse-over' )
    }

    private handleMenuLeave = ( event: any ) => {
        $( event.currentTarget ).removeClass( 'on-mouse-over' )
    }

    private handleOrderChange = ( event: any ) => {
        event.preventDefault()
        let columnId = event.currentTarget.getAttribute( 'data-column-id' )
        let order = event.currentTarget.getAttribute( 'data-order' )

        if ( columnId && order ) {
            this.props.orderHandler( columnId, order )
        }
    }

    private hideColumn = ( event: any ) => {
        event.preventDefault()
        let columnId = event.currentTarget.getAttribute( 'data-column-id' )

        if ( columnId ) {
            this.props.displayHandler( columnId, false )
        }
    }

    private handleSortChange = ( event: any ) => {
        event.preventDefault()
        let columnId = event.currentTarget.getAttribute( 'data-column-id' )

        const { columnHeader, sortColumn, sortDirection, sortHandler } = this.props

        if ( columnId !== undefined && columnId !== null ) {
            const newSortDirection = columnHeader.id === sortColumn ? ( sortDirection === 'ASC' ? 'DESC' : 'ASC' ) : sortDirection
            sortHandler( columnId, newSortDirection )
        }
    }

    private handleWidthChange = ( event: any ) => {
        event.preventDefault()
        let columnId = event.currentTarget.getAttribute( 'data-column-id' )
        let way = event.currentTarget.getAttribute( 'data-way' )

        if ( columnId && way ) {
            this.props.widthHandler( columnId, way )
        }
    }

    private handleTextAlignChange = ( event: any ) => {
        event.preventDefault()
        let columnId = event.currentTarget.getAttribute( 'data-column-id' )
        let align = event.currentTarget.getAttribute( 'data-align' )

        if ( columnId && align ) {
            this.props.textAlignHandler( columnId, align )
        }
    }
}

export default HeaderItem
