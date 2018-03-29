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

import { Tab } from './models/Tab'
import { ButtonsBar } from './models/ButtonsBar'

// constants
import {
    ID_SEPARATOR,
    TAB_TYPE,
    CALCULATED_CONTENT_MODE
} from './constants/variables'

// Utils
import {
    stringifyId,
    prettifyId
} from './utils'

import {
    getSelectButtonState,
    getAddButtonState
} from './typescripts/ButtonsBarGenerator'

// Helpers
import {
    compileWordings
} from '@amalto/helpers'

// Wordings
import {
    MULTILANGUAGE_WORDINGS
} from '@amalto/wordings'

class ServicePropsPopulator {
    
    // Mandatory
    private _appKey: string = null
    private _locale: string = null
    private _permissions: string[] = []
    private _serviceName: string = null
    private _wordings: CompiledWordings = {}

    // Optional
    private _itemToAdd: ServiceItemFacade = null
    private _addItem: ( item: ServiceItemFacade ) => void

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
    set itemToAdd( itemToAdd: ServiceItemFacade ) { this._itemToAdd = itemToAdd }
    set addItem( addItem: ( item: ServiceItemFacade ) => void ) { this._addItem = addItem } 

    private generatePopulatedProps = ( generator: ( ...genArgs : any[] ) => any, props: any ): any => {
        return generator( props )
    }

    /**
     * Return a JSON object of Tab props.
     * @param { Id } itemId
     * @param { string } mode - Can be 'add', 'edit' or 'view'.
     */
    private getPopulatedTabView( itemId: Id, mode: string ): Tab.Props {
        return {
            id: stringifyId( itemId, ID_SEPARATOR ),
            title: prettifyId( itemId, ID_SEPARATOR ),
            closable: true
        }
    }

    /**
     * Return default buttons bar template.
     * @param { string } itemSelected
     * @param { ServiceItemFacades } items 
     * @param { string[] } permissions 
     * @param { boolean } [unsavedChanged] 
     * @param { boolean } [loading] 
     */
    private getPopulatedButtonsBar( itemSelected: Ids, items: ServiceItemFacades, permissions: string[], unsavedChanged?: boolean, loading?: boolean ): ButtonsBar {    
        return {
            locale: this._locale,
            btnGroups: {
                selectButton: getSelectButtonState( itemSelected, items, this._wordings ),
                addButton: getAddButtonState( this._itemToAdd, this._addItem, this._wordings )
            }
        }
    }
}