// Components
import Tab from '@amalto/tab'

// Models
import {
    Id,
    Ids,
    Description,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem
} from './models/ServiceHelpers'

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

class ServicePropsPopulator {
    private _serviceName: string = null
    private _permissions: string[] = []

    constructor( serviceName: string, permissions: string[] ) {
        this._serviceName = serviceName
        this._permissions = permissions
    }

    // Setters
    set serviceName( serviceName: string ) { this._serviceName = serviceName }
    set permissions( permissions: string[] ) { this._permissions = permissions }

    generatePopulatedProps( generator: ( ...genArgs : any[] ) => any, useServiceName?: boolean, usePermissions?: boolean ): any {
        let args: any[] = Array.prototype.slice.call( arguments )
        let func = args[0]
    }
}

/**
 * Return a JSON object of Tab props.
 * @param { Id } itemId
 * @param { string } mode - Can be 'add', 'edit' or 'view'.
 */
export function getPopulatedTabView( itemId: Id, mode: string ): Tab.Props {
    return {
        id: stringifyId( itemId, ID_SEPARATOR ),
        title: prettifyId( itemId, ID_SEPARATOR ),
        closable: true
    }
}