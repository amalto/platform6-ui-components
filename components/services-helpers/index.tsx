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
    getSelectButtonState
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
    private _appKey: string = null
    private _locale: string = null
    private _permissions: string[] = []
    private _serviceName: string = null

    constructor( appKey: string, serviceName: string, permissions: string[], locale: string ) {
        this._serviceName = serviceName
        this._appKey = appKey
        this._permissions = permissions
        this._locale = locale
    }

    // Setters
    set serviceName( serviceName: string ) { this._serviceName = serviceName }
    set permissions( permissions: string[] ) { this._permissions = permissions }

    private generatePopulatedProps = (
        generator: ( ...genArgs : any[] ) => any,
        props: any,
        useLocale?: boolean,
        useServiceName?: boolean,
        usePermissions?: boolean
    ): any => {
        if ( useLocale ) props.locale = this._locale
        if ( useServiceName ) props.serviceName = this._serviceName
        if ( usePermissions ) props.permissions = this._permissions

        return generator( props )
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

export function getPopulatedButtonsBar( itemSelected: Ids, items: ServiceItemFacades, permissions: string[], unsavedChanged?: boolean, loading?: boolean ): ButtonsBar {
    const wordings: CompiledWordings = compileWordings( MULTILANGUAGE_WORDINGS, this._locale )

    return {
        locale: this._locale,
        btnGroups: {
            selectButton: getSelectButtonState( itemSelected, items, wordings )
        }
    }
}