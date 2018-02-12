/**
 * Created by franckmontaigne on 13/06/16.
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'

//utils & stores
import { hasRequiredResource, loadTooltips, unloadTooltips, compileWordings } from '@amalto/helpers'
import GlobalState from './models/GlobalState'
import { ReduxProps } from './models/ReduxProps'

import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

//components & models
import { Action } from './models/Actions'
import TogglePanel from '@amalto/toggle-panel'
import Spinner from '@amalto/spinner'
import NotificationModel from './models/NotificationModel'
import SelectablesContainer from './components/SelectablesContainer'
import { RequireResource } from './components/RequireResource'
import Restricted from '@amalto/restricted'
import ActionButton from '@amalto/action-button'
import ButtonsBar from '@amalto/button-bar'
import { ColumnHeader, CellData, DataGridTemplates } from './models/DataGrid'
import { DisplayTemplate, DisplayTemplateItem } from './models/DisplayTemplate'
import { UserModel, getUserJson } from './models/UserModel'
import HeaderLine from './components/HeaderLine'
import DataLine from '@amalto/data-line'

//modules
import { ThunkAction } from 'redux-thunk'
import { MapStateToProps, connect } from 'react-redux'
import * as classNames from 'classnames'

import * as dataGridActions from './actions/DataGridActions'
import { WebApi } from './models/WebApi';


export namespace DataGrid {

    export interface Props extends React.Props<DataGrid>, ReduxProps {

        api: WebApi;
        displayContextMenu: ( content: any, positionX?: number, positionY?: number ) => Action;
        hideContextMenu: () => Action;
        receiveUserInfo: ( userInfo: UserModel ) => Action;
        displayNotification: ( notificationType?: NotificationModel.Type, notificationOptions?: NotificationModel, displayParameter?: any ) => Action;
        handleErrorDisplay: ( error: any ) => Action;

        showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: Action | ThunkAction<void, GlobalState, any>, cancelAction?: Action | ThunkAction<void, GlobalState, any>, confirmLevel?: string, itemsList?: string[], modalReadyCallback?: () => void ) => Action;
        hideDialog: () => Action;

        //must be added to allow templating
        dataGridId?: string;

        //serviceId used if the datagrid isn't part of a service
        forcedServiceId?: string

        preventTemplating?: boolean;

        columnHeaders: ColumnHeader[];
        dataLines: JSX.Element[]//should return a DataLine component
        fetchingHeaders?: boolean;
        fetchingItems?: boolean;
        noItemsMsg?: string;
        sortHandler?: ( columnId: string, sortDirection: string ) => void;
        sortColumn?: string;
        sortDirection?: string;

        //selection props
        selectHandler?: ( selectedItemsIdx: number[] ) => void;
        selectedItems?: number[];
        selectionContextMenu?: JSX.Element;

        resetTick?: number;

        stickyHeader?: boolean;

        //auto added props
        templates?: DataGridTemplates;
        templatesChanged?: boolean;
        selectedAppInstanceName?: string;
        defaultServiceId?: string
        user?: UserModel;
        spinnerSrc?: string;
        locale: string;
    }

    export interface State {
        displayHiddenColumnsPanel?: boolean;
        templateDialogOpened?: boolean;
        wordings?: { [id: string]: string; };
    }

}

export class DataGrid extends React.Component<DataGrid.Props, DataGrid.State> {

    public static select: MapStateToProps<any, DataGrid.Props> = ( state: GlobalState ) => {

        return {
            templates: state.datagrid.templates,
            templatesChanged: state.datagrid.templatesChanged,
            selectedAppInstanceName: state.main.selectedAppInstanceName,
            defaultServiceId: state.services.serviceId,
            user: state.main.user
        } as DataGrid.Props
    }

    constructor( props: DataGrid.Props ) {
        super( props )

        this.state = {
            displayHiddenColumnsPanel: false,
            templateDialogOpened: false,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    componentWillMount() {
        this.bootstrapTemplate()
    }

    componentDidMount() {
        const { sortColumn, sortDirection, sortHandler } = this.props

        if ( sortColumn && sortDirection && sortHandler ) {
            sortHandler( sortColumn, sortDirection )
        }

        loadTooltips( ReactDOM.findDOMNode( this ) )
    }

    componentDidUpdate( prevProps: DataGrid.Props ) {
        if ( prevProps.resetTick !== this.props.resetTick || prevProps.dataGridId !== this.props.dataGridId ) {
            this.bootstrapTemplate()
        }

        if ( prevProps.templates !== this.props.templates && this.props.templatesChanged === true && !this.state.templateDialogOpened ) {
            this.setState( {
                templateDialogOpened: true
            }, () => {
                this.props.dispatch( this.props.displayNotification( null, {
                    autoDismiss: 0,
                    title: this.state.wordings['datagrid.display.settings.changed'],
                    level: 'info',
                    position: 'tr',
                    message: this.state.wordings['datagrid.save.display.settings'],
                    action: {
                        label: this.state.wordings['datagrid.save'],
                        callback: () => {
                            this.saveDataGridTemplate()
                        }
                    },
                    onRemove: () => {
                        this.setState( {
                            templateDialogOpened: false
                        } )
                    }
                } ) )
            } )
        }

        loadTooltips( ReactDOM.findDOMNode( this ) )
    }

    componentWillUnmount() {
        unloadTooltips( ReactDOM.findDOMNode( this ) )
    }

    render() {

        const { displayHiddenColumnsPanel } = this.state

        const { stickyHeader, selectHandler, selectedItems, selectionContextMenu, fetchingHeaders, preventTemplating, locale } = this.props

        const displayTemplate = this.getDisplayTemplate()

        let headerLine = (
            <HeaderLine
                columnHeaders={this.props.columnHeaders}

                sortHandler={this.props.sortHandler}
                sortColumn={this.props.sortColumn}
                sortDirection={this.props.sortDirection}

                preventTemplating={preventTemplating}

                orderHandler={this.changeColumnOrder}
                widthHandler={this.changeColumnWidth}
                textAlignHandler={this.changeColumnTextAlign}
                displayHandler={this.changeColumnDisplay}
                templateChangeHandler={this.changeTemplate}

                displayNotification={this.displayNotification}
                displayContextMenu={this.displayContextMenu}
                hideContextMenu={this.hideContextMenu}

                stickyHeader={stickyHeader}

                displayTemplate={displayTemplate}

                locale={locale}
            />
        )

        const hiddenColumnsPanel = this.getHiddenColumnsPanel()

        let templateBtns = [
            {
                btns: [{
                    clickAction: () => this.resetTemplate(),
                    cssClass: 'btn btn-danger btn-trans',
                    iconClass: 'fa-eraser',
                    tooltipText: this.state.wordings['datagrid.reset.templates']
                }],
                cssClass: 'btn-group-xs'
            }
        ]

        if ( hiddenColumnsPanel && !displayHiddenColumnsPanel ) {
            templateBtns.unshift( {
                btns: [{
                    clickAction: () => {
                        this.setState( {
                            displayHiddenColumnsPanel: !displayHiddenColumnsPanel
                        } )
                    },
                    cssClass: 'btn btn-info btn-trans',
                    iconClass: 'fa-eye-slash',
                    tooltipText: this.state.wordings['datagrid.show.hidden.columns']
                }],
                cssClass: 'btn-group-xs'
            } )
        }

        return (


            fetchingHeaders ? <div><Spinner src={this.props.spinnerSrc} /></div> : (

                <div>

                    {
                        displayTemplate && !preventTemplating ? (

                            <ButtonsBar locale={this.props.locale}
                                btnGroups={templateBtns}
                            />
                        ) : null
                    }

                    {displayHiddenColumnsPanel ? hiddenColumnsPanel : null}

                    <div style={{ marginTop: 22, position: 'relative' }}>

                        {headerLine}

                        <div className={classNames( 'cards-container row inline-items text-medium' )}>
                            <SelectablesContainer
                                orderedItems={this.getTemplateInjectedDataLines()}
                                selectedItems={selectedItems || []}
                                onSelect={selectHandler}
                                contextMenuContent={selectionContextMenu}
                                displayContextMenu={this.displayContextMenu}
                                disableContextMenu={!selectionContextMenu}
                                disableItemSelection={!selectHandler}
                            />
                        </div>

                        {
                            !this.props.fetchingItems && this.props.dataLines.length === 0 ? (
                                <div className='text-medium'>{this.props.noItemsMsg}</div>
                            ) : null
                        }

                    </div>

                </div >
            )

        )
    }

    private getTemplateInjectedDataLines = () => {
        return this.props.dataLines.map( dataLine => React.cloneElement( dataLine, { displayTemplate: this.getDisplayTemplate() } ) )
    }

    private getDisplayTemplate = (): DisplayTemplate => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId, templates } = this.props

        const _serviceId = forcedServiceId || defaultServiceId

        if ( _serviceId && dataGridId && selectedAppInstanceName ) {
            if ( templates[selectedAppInstanceName] && templates[selectedAppInstanceName][_serviceId] ) {
                return templates[selectedAppInstanceName][_serviceId][dataGridId] || null
            }
        }

        return null
    }

    private bootstrapTemplate = () => {
        const { dispatch, columnHeaders, dataGridId, defaultServiceId, forcedServiceId, selectedAppInstanceName } = this.props

        const _serviceId = forcedServiceId || defaultServiceId

        if ( dataGridId && columnHeaders && _serviceId && selectedAppInstanceName ) {
            const template = this.getDisplayTemplate()

            if ( !template ) {
                this.props.dispatch( dataGridActions.bootstrapDataGridTemplate( columnHeaders, dataGridId, _serviceId, selectedAppInstanceName ) )
            }
            else {
                this.props.dispatch( dataGridActions.synchroniseDataGridTemplate( columnHeaders, dataGridId, _serviceId, selectedAppInstanceName ) )
            }
        }
    }

    private changeColumnOrder = ( columnId: string, order: string ) => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        //FIXME
        /* hardcoded access to desktop display mode */

        this.props.dispatch( dataGridActions.changeColumnOrder( columnId, order, 'desktop', dataGridId, _serviceId, selectedAppInstanceName ) )
    }

    private changeColumnWidth = ( columnId: string, way: string ) => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        //FIXME
        /* hardcoded access to desktop display mode */

        this.props.dispatch( dataGridActions.changeColumnWidth( columnId, way, 'desktop', dataGridId, _serviceId, selectedAppInstanceName ) )
    }

    private changeColumnTextAlign = ( columnId: string, align: string ) => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        //FIXME
        /* hardcoded access to desktop display mode */

        this.props.dispatch( dataGridActions.changeColumnTextAlign( columnId, align, 'desktop', dataGridId, _serviceId, selectedAppInstanceName ) )
    }

    private changeColumnDisplay = ( columnId: string, display: boolean ) => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        //FIXME
        /* hardcoded access to desktop display mode */

        this.props.dispatch( dataGridActions.changeColumnDisplay( columnId, display, 'desktop', dataGridId, _serviceId, selectedAppInstanceName ) )

        if ( display === false ) {
            this.setState( {
                displayHiddenColumnsPanel: true
            } )
        }
    }

    private resetTemplate = () => {
        const { dispatch, columnHeaders, dataGridId, defaultServiceId, forcedServiceId, selectedAppInstanceName } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        if ( dataGridId && columnHeaders && _serviceId && selectedAppInstanceName ) {

            const thunk = dataGridActions.bootstrapDataGridTemplate( columnHeaders, dataGridId, _serviceId, selectedAppInstanceName )

            dispatch( this.props.showDialog(
                this.state.wordings['datagrid.modal.confirm'],
                this.state.wordings['datagrid.reset.confirm'],
                thunk,
                this.props.hideDialog()
            ) )
        }
    }

    private changeTemplate = ( template: DisplayTemplate ) => {
        const { selectedAppInstanceName, dataGridId, forcedServiceId, defaultServiceId } = this.props
        const _serviceId = forcedServiceId || defaultServiceId

        this.props.dispatch( dataGridActions.changeDisplayTemplate( template, dataGridId, _serviceId, selectedAppInstanceName ) )
    }

    private getHiddenColumnsPanel = () => {

        const { columnHeaders } = this.props


        const displayTemplate = this.getDisplayTemplate()

        if ( displayTemplate ) {
            const hiddenColumns = columnHeaders.filter( columnHeader => {
                //FIXME
                /* hardcoded access to desktop display mode */
                if ( displayTemplate[columnHeader.id] ) {
                    return displayTemplate[columnHeader.id].desktop.display === false
                }

                return true
            } )

            if ( hiddenColumns.length ) {
                return (
                    <div className='bordered padded mgt-10' style={{ marginBottom: 22 }}>

                        <div className='mgb-5' style={{ position: 'relative' }}>
                            <label>{this.state.wordings['datagrid.hidden.columns']}</label>
                            <span className='close-button small' onClick={() => this.setState( { displayHiddenColumnsPanel: false } )} />
                        </div>

                        <div>
                            {
                                hiddenColumns.map( ( columnHeader, idx ) => {
                                    return (
                                        <span key={columnHeader.id} className='tile inline-block padded-small text-xsmall mgr-10 click-pointer bold'
                                            onClick={() => this.changeColumnDisplay( columnHeader.id.toString(), true )}>
                                            {columnHeader.label}
                                        </span>
                                    )
                                } )
                            }
                        </div>

                    </div>
                )
            }
        }

        return null

    }

    private displayContextMenu = ( content: any, positionX?: number, positionY?: number ) => {
        this.props.dispatch( this.props.displayContextMenu( content, positionX, positionY ) )
    }

    private hideContextMenu = () => {
        this.props.dispatch( this.props.hideContextMenu() )
    }

    private displayNotification = ( notificationType?: NotificationModel.Type, notificationOptions?: NotificationModel, displayParameter?: any ): void => {
        this.props.dispatch( this.props.displayNotification( notificationType, notificationOptions, displayParameter ) )
    }

    private saveDataGridTemplate = (): void => {

        const { api, user, templates, dispatch } = this.props

        let userJson = getUserJson( user )

        userJson.dataGridTemplates = templates

        let payload: UserModel = {
            userEmail: user.userEmail,
            jsonContent: JSON.stringify( userJson )
        }

        //update user data
        dispatch( dataGridActions.saveUserDisplayTemplates(
            api,
            payload,
            this.props.receiveUserInfo,
            this.props.displayNotification,
            this.props.handleErrorDisplay
        ) )
    }

}

export default connect( DataGrid.select )( DataGrid )
