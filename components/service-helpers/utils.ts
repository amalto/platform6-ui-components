// Models
import {
    Id,
    Ids,
    Description,
    ServiceItemFacade,
    ServiceItemFacades,
    ServiceItem,
    ServiceItems
} from './models/ServiceHelpers'

// Constants
import {
    TAB_TYPE,
    ID_SEPARATOR
} from './constants'

// Helpers
import {
    compileWordings
} from '@amalto/helpers'

// Wordings
import {
    MULTILANGUAGE_WORDINGS
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

    return `${ appKey && `[${ appKey }]${ ID_SEPARATOR }` }${ id.name }`
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

    if ( !value || !value.trim() ) return wordings.fieldRequired

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
export function getItem( items: ServiceItemFacades, id: Id ): ServiceItemFacade | undefined {
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