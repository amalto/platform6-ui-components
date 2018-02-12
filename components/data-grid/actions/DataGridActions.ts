

import { WebApi } from '../models/WebApi'
import { Action } from '../models/Actions'

import GlobalState from '../models/GlobalState'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { REALM } from '../constants/Config'

import NotificationModel from '../models/NotificationModel'
import { DisplayTemplate } from '../models/DisplayTemplate'
import { UserModel } from '../models/UserModel'
import { ColumnHeader } from '../models/DataGrid'

//ACTION TYPES
export const DATAGRID_DISPLAY_TEMPLATE_CHANGE = 'DATAGRID_DISPLAY_TEMPLATE_CHANGE'

export const DATAGRID_CHANGE_COLUMN_ORDER = 'DATAGRID_CHANGE_COLUMN_ORDER'
export const DATAGRID_CHANGE_COLUMN_DISPLAY = 'DATAGRID_CHANGE_COLUMN_DISPLAY'
export const DATAGRID_CHANGE_COLUMN_WIDTH = 'DATAGRID_CHANGE_COLUMN_WIDTH'
export const DATAGRID_CHANGE_COLUMN_TEXT_ALIGN = 'DATAGRID_CHANGE_COLUMN_TEXT_ALIGN'

export const DATAGRID_USER_DISPLAY_TEMPLATES_UPDATE = 'DATAGRID_USER_DISPLAY_TEMPLATES_UPDATE'

export const DATAGRID_BOOTSTRAP_TEMPLATE = 'DATAGRID_BOOTSTRAP_TEMPLATE'
export const DATAGRID_SYNCHRONISE_TEMPLATE = 'DATAGRID_SYNCHRONISE_TEMPLATE'


//ACTIONS

//fires an action to change one of the key-value pair display on a card
export function changeDisplayTemplate( displayTemplate: DisplayTemplate, dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_DISPLAY_TEMPLATE_CHANGE,
        value: { displayTemplate, dataGridId, serviceId, instanceName }
    }
}

//handle columns order change
export function changeColumnOrder( columnId: string, order: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_CHANGE_COLUMN_ORDER,
        value: { columnId, order, displayMode, dataGridId, serviceId, instanceName }
    }
}

//handle display change of column
export function changeColumnDisplay( columnId: string, display: boolean, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_CHANGE_COLUMN_DISPLAY,
        value: { columnId, display, displayMode, dataGridId, serviceId, instanceName }
    }
}

//handle column width change
export function changeColumnWidth( columnId: string, way: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_CHANGE_COLUMN_WIDTH,
        value: { columnId, way, displayMode, dataGridId, serviceId, instanceName }
    }
}

//handle column text-align change
export function changeColumnTextAlign( columnId: string, align: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_CHANGE_COLUMN_TEXT_ALIGN,
        value: { columnId, align, displayMode, dataGridId, serviceId, instanceName }
    }
}

export function saveUserDisplayTemplates(
    api: WebApi,
    updatedData: UserModel,
    receiveUserInfo: ( userInfo: UserModel ) => Action,
    displayNotification: ( notificationType?: NotificationModel.Type, notificationOptions?: NotificationModel, displayParameter?: any ) => Action,
    handleErrorDisplay: ( error: any ) => Action
): ThunkAction<void, GlobalState, any> {

    return async ( dispatch: Dispatch<GlobalState> ) => {
        dispatch( userDisplayTemplatesUpdate() )

        try {
            const data = await api.put( api.endpoints.REQUEST_USER + '/' + REALM, updatedData )

            dispatch( receiveUserInfo( data ) )
            dispatch( displayNotification( NotificationModel.Type.DETAILS_UPDATED ) )
        }
        catch ( error ) {
            dispatch( handleErrorDisplay( error ) )
        }
    }
}

export function userDisplayTemplatesUpdate(): Action {
    return {
        type: DATAGRID_USER_DISPLAY_TEMPLATES_UPDATE,
        value: undefined
    }
}

export function bootstrapDataGridTemplate( columnHeaders: ColumnHeader[], dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_BOOTSTRAP_TEMPLATE,
        value: { columnHeaders, instanceName, serviceId, dataGridId }
    }
}

export function synchroniseDataGridTemplate( columnHeaders: ColumnHeader[], dataGridId: string, serviceId: string, instanceName: string ): Action {
    return {
        type: DATAGRID_SYNCHRONISE_TEMPLATE,
        value: { columnHeaders, instanceName, serviceId, dataGridId }
    }
}