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

import { BtnModel } from './models/ButtonsBar'

// Constants
import {
	TAB_TYPE,
	DATA_GRID_PREFIX
} from './constants/variables'

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
export function getId (item: ServiceItemFacade | ServiceItem): Id {
	return { name: item.name, appKey: item.appKey }
}

/**
 * Convert a list of facades into a list of identifiers
 *
 * @param {ServiceItemFacades} facades
 * @returns {Id[]}
 */
export function toIds (facades: ServiceItemFacades): Id[] {
	return facades.map(f => getId(f))
}

/**
 * Check that an identifier is not already taken
 *
 * @param {Ids} ids
 * @param {Id} id
 * @returns {boolean}
 */
export function isIdUnique (ids: Ids, id: Id) {
	const { name } = id

	return ids.every(i => i.name !== name || (i.name === name && i.appKey !== id.appKey))
}

export function getTabNameByType( itemId: string, mode: string ): string {
    const tabPreffix: { [mode: string]: string } = {
        'add': TAB_TYPE.ADD_TAB_ID,
        'edit': TAB_TYPE.EDIT_TAB_ID,
        'view': TAB_TYPE.VIEW_TAB_ID
    }

    return `${tabPreffix[mode]}${itemId}`
}

/**
 * Parse an identifier
 *
 * @param {string} id
 * @returns {Id}
 */
export function parseId (id: string, separator: string): Id {
	const { length } = id

	if (!id.includes(separator)) {
		return {
			appKey: '',
			name: id.substring(5, length)
		}
	}

	const separatorIndex = id.indexOf(separator)
	return {
		appKey: id.substring(5, separatorIndex),
		name: id.substring(separatorIndex + 2, length)
	}
}

/**
 * Prettify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
export function prettifyId (id: Id, separator: string): string {
	const { appKey } = id

    return `${appKey && `[${appKey}]${separator}`}${id.name}`
}

/**
 * Stringify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
export function stringifyId (id: Id, separator: string): string {
	const { appKey } = id

	return `${appKey && `${appKey}${separator}`}${id.name}`
}

/**
 * Increment an item's name ( Handle duplicate names, one version on @amalto/helpers )
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {string}
 */
export function incrementName (facades: ServiceItemFacades, id: Id): string {
	const { name } = id
	let index = 1

	const facadesWithSameAppKey = facades.filter(f => f.appKey === id.appKey)

	if (facadesWithSameAppKey.length === 0) return name

	while (!facadesWithSameAppKey.every(f => f.name !== `${name}_${index}`)) index++

	return `${name}_${index}`
}

/**
 * Validate the new name of an item
 *
 * @param {string} value
 * @param {Id} id
 * @param {ServiceItemFacades} items
 * @returns {string}
 */
export function validateName (value: string, id: Id, items: ServiceItemFacades, locale: string): string {
    const wordings: { [id: string]: string } = compileWordings( MULTILANGUAGE_WORDINGS, locale )

	if (!value || !value.trim()) return wordings.fieldRequired

	if (value !== id.name && !isIdUnique(items, { name: value, appKey: id.appKey }))
		return wordings.nameAlreadyExist

	if (value.includes('.')) return wordings.nameNoDot
}

/**
 * Found a specific item in a list
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {ServiceItemFacade | undefined}
 */
export function getItem (items: ServiceItemFacades, id: Id): ServiceItemFacade | undefined {
	const { name } = id

	return items.find(i => i.name === name && i.appKey === id.appKey)
}