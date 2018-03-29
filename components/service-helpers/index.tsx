// Modules
import uuid from 'uuid'

// Models
import {
    Id,
    Ids,
    Description,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem,
    ServiceItems,
    CompiledWordings
} from './models/ServiceHelpers'

import { ButtonsBar } from './models/ButtonsBar'
import { DataGrid } from './models/DataGrid'

// constants
import {
    ID_SEPARATOR,
    DATA_GRID_PREFIX,
    TAB_TYPE,
    CALCULATED_CONTENT_MODE
} from './constants'

// Utils
import {
    stringifyId,
    prettifyId
} from './utils'

import {
    getSelectButtonState,
    getAddButtonState,
    getImportButtonState,
    getExportButtonState,
    getDeleteButtonState
} from './typescripts/ButtonsBarGenerator'

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
    private _appKey: string = null
    private _locale: string = null
    private _permissions: string[] = []
    private _serviceName: string = null
    private _wordings: CompiledWordings = {}

    // Optional
    private _selectItems: ( ids: Ids ) => void
    private _itemToAdd: ServiceItemFacade = null
    private _addItem: ( item: ServiceItemFacade ) => void
    private _dataToImport: any = null
    private _importItems: ( data: any ) => void
    private _exportItems: ( ids: Ids ) => void
    private _deleteItems: ( ids: Ids ) => void

    constructor( appKey: string, serviceName: string, permissions: string[], locale: string ) {
        this._serviceName = serviceName
        this._appKey = appKey
        this._permissions = permissions
        this._locale = locale

        this._wordings = compileWordings( MULTILANGUAGE_WORDINGS, locale )
    }

    // Setters
    set appKey( appKey: string ) { this._appKey = appKey }
    set locale( locale: string ) {
        this._locale = locale
        this._wordings = compileWordings( MULTILANGUAGE_WORDINGS, locale )
    }
    set serviceName( serviceName: string ) { this._serviceName = serviceName }
    set permissions( permissions: string[] ) { this._permissions = permissions }
    set selectItem( selectItems: ( ids: Ids ) => Ids ) { this._selectItems = selectItems }
    set itemToAdd( itemToAdd: ServiceItemFacade ) { this._itemToAdd = itemToAdd }
    set addItem( addItem: ( item: ServiceItemFacade ) => void ) { this._addItem = addItem }
    set dataToImport( dataToImport: any ) { this._dataToImport = dataToImport }
    set importItems( importItems: ( data: any ) => void ) { this._importItems = importItems }
    set exportItems( exportItems: ( ids: Ids ) => void ) { this._exportItems = exportItems }
    set deleteItems( deleteItems: ( ids: Ids ) => void ) { this._deleteItems = deleteItems }

    // private generatePopulatedProps = ( generator: ( ...genArgs : any[] ) => any, props: any ): any => {
    //     return generator( props )
    // }

    /**
     * Return a JSON object of Tab props.
     * @param { Id } itemId
     * @param { string } mode - Can be 'add', 'edit' or 'view'.
     */
    private getPopulatedTabView( itemId: Id, mode: string ) {
        return {
            id: stringifyId( itemId, ID_SEPARATOR ),
            title: prettifyId( itemId, ID_SEPARATOR ),
            closable: true
        }
    }

    /**
     * Return default buttons bar template.
     * TODO: Add a search handler
     * @param { string } itemSelected
     * @param { ServiceItemFacades } items 
     * @param { string[] } permissions 
     * @param { boolean } [unsavedChanged] 
     * @param { boolean } [loading] 
     */
    private getPopulatedButtonsBar( itemSelected: Ids, items: ServiceItemFacades ): ButtonsBar {    
        return {
            locale: this._locale,
            btnGroups: {
                selectButton: getSelectButtonState( itemSelected, items, this._selectItems, this._wordings ),
                addButton: getAddButtonState( this._itemToAdd, this._addItem, this._wordings ),
                importButton: getImportButtonState( this._dataToImport, this._importItems, this._wordings ),
                exportButton: getExportButtonState( itemSelected, items, this._exportItems, this._wordings ),
                deleteButton: getDeleteButtonState( itemSelected, items, this._deleteItems, this._wordings )
            }
        }
    }

    // private getPopulatedDataGrid( itemSelected: Ids, items: ServiceItemFacades, loading?: boolean ): DataGrid {
    //     return {
    //         id: `${DATA_GRID_PREFIX}${uuid.v4()}`
    //     }
    // }
}