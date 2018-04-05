import * as React from 'react'

// Models
import {
    Id,
    Ids,
    Description,
    Wordings,
    CompiledWordings,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem,
    ServiceItems
} from './models/ServiceHelpers'

import { DataGridPartialProps, TabPartialProps, ButtonsBarPartialProps } from './models/PartialProps'

// constants
import {
    ID_SEPARATOR,
    TAB_TYPE,
    CALCULATED_CONTENT_MODE
} from './constants'

// Utils
import {
    stringifyId,
    prettifyId
} from './utils'

import {
    getSelectButton,
    getAddButton,
    getImportExportButtons,
    getDeleteButton
} from './typescript/ButtonsBar'

import {
    getColumnHeaders,
    getDataLines
} from './typescript/DataGrid'

// Helpers
import {
    compileWordings
} from '@amalto/helpers'

// Wordings
import {
    MULTILANGUAGE_WORDINGS
} from '@amalto/wordings'


class ServiceHelpers {

    // Mandatory
    private _serviceAppKey: string
    private _serviceName: string

    private _webStorage: any;

    private _locale: string
    private _wordings: CompiledWordings

    private _readPermission: string
    private _editPermission: string
    private _deletePermission: string

    // Optional
    private _selectHandler: ( indexes: number[] ) => void
    private _importHandler: ( file: File ) => void
    private _exportHandler: () => void
    private _deleteHandler: () => void

    private _viewHandler: ( item: ServiceItemFacade ) => void
    private _openEditOrAddFormHandler: ( item?: ServiceItemFacade ) => void
    private _openRenameFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void
    private _cancelRenameHandler: ( item: ServiceItemFacade, lineIdx: number ) => void
    private _openDuplicateFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void

    constructor(
        serviceAppKey: string,
        serviceName: string,

        serviceItemsType: string,

        webStorage: any,

        customWordings: Wordings,

        readPermission: string,
        editPermission: string,
        deletePermission: string,

        selectHandler?: ( indexes: number[] ) => void,
        importHandler?: ( file: File ) => void,
        exportHandler?: ( item?: ServiceItemFacade ) => void,
        deleteHandler?: ( item?: ServiceItemFacade ) => void,

        viewHandler?: ( item: ServiceItemFacade ) => void,
        openEditOrAddFormHandler?: ( item?: ServiceItemFacade ) => void,
        openRenameFormHandler?: ( item: ServiceItemFacade, lineIdx: number ) => void,
        cancelRenameHandler?: ( item: ServiceItemFacade, lineIdx: number ) => void,
        openDuplicateFormHandler?: ( item: ServiceItemFacade, lineIdx: number ) => void
    ) {

        this._serviceAppKey = serviceAppKey
        this._serviceName = serviceName

        this._webStorage = webStorage

        this._locale = webStorage.locale
        this._wordings = compileWordings( Object.assign( {}, MULTILANGUAGE_WORDINGS, customWordings ), this._locale )

        this._readPermission = readPermission || `${ this._serviceName }=read`
        this._editPermission = editPermission || `${ this._serviceName }=edit`
        this._deletePermission = deletePermission || `${ this._serviceName }=edit`

        this._selectHandler = selectHandler || null
        this._importHandler = importHandler || null
        this._exportHandler = exportHandler || null
        this._deleteHandler = deleteHandler || null

        this._viewHandler = viewHandler || null
        this._openEditOrAddFormHandler = openEditOrAddFormHandler || null
        this._openRenameFormHandler = openRenameFormHandler || null
        this._cancelRenameHandler = cancelRenameHandler || null
        this._openDuplicateFormHandler = openDuplicateFormHandler || null

    }

    /**
     * Returns a specific subset of Tab props for a "View Tab".
     * @param { Id } itemId
     */
    public getBaseViewTabConf = ( itemId: Id ) => {
        return {
            id: TAB_TYPE.VIEW + stringifyId( itemId ),
            title: this._wordings['tabView'].replace( '{name}', prettifyId( itemId ) ),
            closable: true
        }
    }

    /**
     * Returns a specific subset of Tab props for an "Add Tab".
     * @param { Id } itemId
     */
    public getBaseAddTabConf = ( itemId: Id ) => {
        return {
            id: TAB_TYPE.ADD + stringifyId( itemId ),
            title: this._wordings['tabAdd'].replace( '{name}', prettifyId( itemId ) ),
            closable: true
        }
    }

    /**
     * Returns a specific subset of Tab props for an "Edit Tab".
     * @param { Id } itemId
     */
    public getBaseEditTabConf = ( itemId: Id ) => {
        return {
            id: TAB_TYPE.EDIT + stringifyId( itemId ),
            title: this._wordings['tabEdit'].replace( '{name}', prettifyId( itemId ) ),
            closable: true
        }
    }

    /**
     * Returns a specific subset of Tab props for the Main Tab (items list).
     * @param { ServiceItemFacades } items
     */
    public getBaseMainTabConf = ( items: ServiceItemFacades ) => {
        return {
            id: TAB_TYPE.MAIN_LIST + this._serviceName,
            title: this._wordings['tabList'].replace( '{total}', items ? items.length.toString() : '0' ),
            closable: false
        }
    }

    /**
     * Return default buttons bar template.
     
     * @param { number[] } selectedItemsIdx
     * @param { ServiceItemFacades } itemsList 
     * @param { boolean } hasUnsavedChanges
     * @param { string } [importFormId]
     */
    public getBaseButtonsBarConf = ( selectedItemsIdx: number[], itemsList: ServiceItemFacades, hasUnsavedChanges: boolean, importFormId?: string ): ButtonsBarPartialProps => {
        return {
            locale: this._locale,
            btnGroups: [
                this._selectHandler ? getSelectButton( this._wordings, this._webStorage, selectedItemsIdx, itemsList, this._selectHandler, hasUnsavedChanges, this._editPermission, this._deletePermission ) : null,
                this._openEditOrAddFormHandler ? getAddButton( this._wordings, this._webStorage, this._openEditOrAddFormHandler, this._editPermission ) : null,
                getImportExportButtons( this._wordings, this._webStorage, selectedItemsIdx, this._importHandler, this._exportHandler, hasUnsavedChanges, this._editPermission, importFormId ),
                this._deleteHandler ? getDeleteButton( this._wordings, this._webStorage, selectedItemsIdx, itemsList, this._deleteHandler, this._deletePermission ) : null,
            ].filter( btn => !!btn )
        }
    }

    public getBaseMainDataGridConf = ( itemsList: ServiceItemFacades, hasUnsavedChanges?: boolean ): DataGridPartialProps => {

        return {
            dataGridId: this._serviceName + 'List',
            noItemsMsg: this._wordings['no.data.found'],
            columnHeaders: getColumnHeaders( this._wordings ),
            dataLines: getDataLines(
                itemsList,
                this._wordings,
                this._locale,
                this._webStorage,
                this._readPermission,
                this._editPermission,
                this._deletePermission,
                this._viewHandler,
                this._openEditOrAddFormHandler,
                this._openRenameFormHandler,
                this._cancelRenameHandler,
                this._openDuplicateFormHandler,
                this._exportHandler,
                this._deleteHandler
            ),
            selectHandler: hasUnsavedChanges ? null : this._selectHandler
        }

    }

    public getSortedItems = ( column: string, direction: 'ASC' | 'DESC', items: ServiceItemFacades ): ServiceItemFacades => {

        return items.sort( ( a, b ) => {
            if ( column === 'lastModification' ) {
                const aDate = a.lastModifiedDate || 0
                const bDate = b.lastModifiedDate || 0

                return aDate - bDate
            }

            return a[column].toLowerCase().localeCompare( b[column].toLowerCase() )
        } )

    }

}