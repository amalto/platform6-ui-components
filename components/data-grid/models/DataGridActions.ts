

import { WebApi } from './WebApi'
import { Action } from './Actions'

import { DisplayTemplate } from './DisplayTemplate'
import { UserModel } from './UserModel'
import { ColumnHeader } from './DataGrid'

//ACTIONS

export interface DataGridActions {
    
    //fires an action to change one of the key-value pair display on a card
    changeDisplayTemplate: ( displayTemplate: DisplayTemplate, dataGridId: string, serviceId: string, instanceName: string ) => Action,

    //handle columns order change
    changeColumnOrder: ( columnId: string, order: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ) => Action,

    //handle display change of column
    changeColumnDisplay: ( columnId: string, display: boolean, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ) => Action,

    //handle column width change
    changeColumnWidth: ( columnId: string, way: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ) => Action,

    //handle column text-align change
    changeColumnTextAlign: ( columnId: string, align: string, displayMode: string, dataGridId: string, serviceId: string, instanceName: string ) => Action,

    saveUserDisplayTemplates: ( api: WebApi, updatedData: UserModel ) => any,

    userDisplayTemplatesUpdate: () => Action,

    bootstrapDataGridTemplate: ( columnHeaders: ColumnHeader[], dataGridId: string, serviceId: string, instanceName: string ) => Action,

    synchroniseDataGridTemplate: ( columnHeaders: ColumnHeader[], dataGridId: string, serviceId: string, instanceName: string ) => Action

}