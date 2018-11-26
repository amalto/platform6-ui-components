/** Import */

// Models
import {
    Id,
    Ids,
    Description,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem,
    ServiceItems,
    ServiceStatus
} from './models/ServiceHelpers'

import { BaseListConfig } from './models/BaseListConfig'

import { DynamicComponent } from './models/DynamicComponent'

// constants
import {
    ID_SEPARATOR,
    TAB_TYPE,
    CALCULATED_CONTENT_MODE,
    ICON_TYPE,
    BUTTON_TYPE
} from './constants'

// Helpers
import {
    isNotEmpty,
    compileWordings,
    handleDuplicateNameFromArray
} from '@amalto/helpers'

// Wordings
import {
    MULTILANGUAGE_WORDINGS,
    Wordings,
    CompiledWordings
} from '@amalto/wordings'

/**
 * Get the identifier of an item
 *
 * @param {ServiceItemFacade | ServiceItem} item
 * @returns {Id}
 */
export function getId( item: ServiceItemFacade | ServiceItem ): Id {
    return { name: item.name, appKey: item.appKey }
}

/**
 * Return item index from ids array
 * @param { ItemFacade } item 
 * @param { Ids } ids 
 */
export function getItemIdx( item: ServiceItemFacade, ids: Ids ): number {
    for ( let i = 0; i < ids.length; i++ ) {
        if ( ids[i].name === item.name && ids[i].appKey === item.appKey ) return i
    }
    return -1
}

/**
 * Return items indexes from a ids array.
 * @param { ItemFacades } items 
 * @param { Ids } ids 
 */
export function getItemIndexes( items: ServiceItemFacades, ids: Ids ): number[] {
    const indexes: number[] = []

    items.forEach( ( item, idx ) => {
        if ( getItemIdx( item, ids ) >= 0 ) indexes.push( idx )
    } )

    return indexes
}

/**
 * Convert a list of facades into a list of identifiers
 *
 * @param {ServiceItemFacades} facades
 * @returns {Id[]}
 */
export function toIds( facades: ServiceItemFacades ): Id[] {
    return facades.map( f => getId( f ) )
}

/**
 * Check that an identifier is not already taken
 *
 * @param {Ids} ids
 * @param {Id} id
 * @returns {boolean}
 */
export function isIdUnique( ids: Ids, id: Id ) {
    const { name } = id

    return ids.every( i => i.name !== name || ( i.name === name && i.appKey !== id.appKey ) )
}

/**
 * Prettify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
export function prettifyId( id: Id ): string {
    const { appKey } = id

    return `${ appKey && `[${ appKey }]` } ${ id.name }`
}

/**
 * Stringify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
export function stringifyId( id: Id ): string {
    const { appKey } = id

    return `${ appKey && `${ appKey }${ ID_SEPARATOR }` }${ id.name }`
}

/**
 * Increment an item's name ( Handle duplicate names, one version on @amalto/helpers )
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {string}
 */
export function incrementName( facades: ServiceItemFacades, id: Id ): string {
    const { name } = id
    let index = 1

    const facadesWithSameAppKey = facades.filter( f => f.appKey === id.appKey )

    if ( facadesWithSameAppKey.length === 0 ) return name

    while ( !facadesWithSameAppKey.every( f => f.name !== `${ name }_${ index }` ) ) index++

    return `${ name }_${ index }`
}

/**
 * Validate the new name of an item
 *
 * @param {string} value
 * @param {Id} id
 * @param {ServiceItemFacades} items
 * @returns {string}
 */
export function validateName( value: string, id: Id, items: ServiceItemFacades, locale: string ): string {
    const wordings: { [id: string]: string } = compileWordings( MULTILANGUAGE_WORDINGS, locale )

    if ( !isNotEmpty( value ) ) return wordings.fieldRequired

    if ( value !== id.name && !isIdUnique( items, { name: value, appKey: id.appKey } ) )
        return wordings.nameAlreadyExist

    if ( value.includes( '.' ) ) return wordings.nameNoDot
}

/**
 * Found a specific item in a list
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {ServiceItemFacade | undefined}
 */
export function getItem( items: ServiceItemFacades, id: Id ): ServiceItemFacade {
    const { name } = id

    return items.find( i => i.name === name && i.appKey === id.appKey )
}

/**
 * Display a date in the specified language
 *
 * @param {number} timestamp
 * @param {string} locale
 * @returns {string}
 */
export function formatDate( timestamp: number, locale: string ): string {
    const date = timestamp ? new Date( timestamp ) : new Date()

    return date.toLocaleString( locale, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' } )
}

/**
 * Get the VIEW identifier of an item (used in Tab component as ID).
 *
 * @param {ServiceItemFacade} item
 * @returns {string}
 */
export function getViewId( item: ServiceItemFacade ): string {
    const itemId = getId( item )
    return `${ TAB_TYPE.VIEW }${ stringifyId( itemId ) }`
}
/**
 * Get the EDIT identifier of an item (used in Tab component as ID).
 *
 * @param {ServiceItemFacade} item
 * @returns {string}
 */
export function getEditId( item: ServiceItemFacade ): string {
    const itemId = getId( item )
    return `${ TAB_TYPE.EDIT }${ stringifyId( itemId ) }`
}

/**
 * Get the ADD identifier (used in Tab component as ID).
 */
export function getAddId(): string {
    return `${ TAB_TYPE.ADD }new_item`
}

/**
 * Handle ServiceItemFacade duplicate name.
 * @param { Id } id - Name to duplicate. 
 * @param { ServiceItemFacades } items - All items to compare the name to.
 */
export function handleDuplicateServiceItemName( id: Id, items: ServiceItemFacades ): string {
    return handleDuplicateNameFromArray( id.name, items.filter( i => i.appKey === id.appKey ).map( i => i.name ) )
}

/** Export */
export {
    Id,
    Ids,
    Description,
    Wordings,
    CompiledWordings,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem,
    ServiceItems
}

export { BaseListConfig }

export { DynamicComponent }

export {
    ID_SEPARATOR,
    TAB_TYPE,
    CALCULATED_CONTENT_MODE,
    ICON_TYPE,
    BUTTON_TYPE
}
