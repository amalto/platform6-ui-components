// Models
import {
    Id,
    Ids,
    ServiceItemFacade,
    ServiceItemFacades,
	CompiledWordings
} from '../models/ServiceHelpers'

import { BtnModel } from '../models/ButtonsBar'

// Constants
import {
	ICON_TYPE,
	BUTTON_TYPE
} from '../constants/variables'

// Utils
import {
    getItem,
    toIds
} from '../utils'

/**
 * Return select button props
 * @param { Ids } itemSelected 
 * @param { ServiceItemFacades } items
 * @param { ( selectAll: boolean ) => void } action
 * @param { CompiledWordings } wordings 
 */
export function getSelectButtonState( itemSelected: Ids, items: ServiceItemFacades, action: ( ids: Ids ) => void, wordings: CompiledWordings ): BtnModel {
	const allSelected: boolean = !items.some( i => !getItem( items, i ) )

	return {
		label: allSelected ? wordings.unselectAll : wordings.selectAll,
		iconClass: allSelected ? ICON_TYPE.SQUARE : ICON_TYPE.CHECK_SQUARE,
		btnClass: BUTTON_TYPE.INFO_TRANS,
		action: () => action( allSelected ? toIds( items ): itemSelected ),
		disabled: !items || items.length === 0
	}
}

/**
 * Add an item
 * @param { ServiceItemFacade } item 
 * @param { ( item: ServiceItemFacade ) => void } action 
 * @param { CompiledWordings } wordings 
 */
export function getAddButtonState( item: ServiceItemFacade, action: ( item: ServiceItemFacade ) => void, wordings: CompiledWordings ): BtnModel {
	return {
		label: wordings.add,
		iconClass: ICON_TYPE.PLUS,
		btnClass: BUTTON_TYPE.PRIMARY_TRANS,
		action: () => action( item )
	}
}

/**
 * 
 * @param { any } data 
 * @param { ( data: any ) => void } action 
 * @param { CompiledWordings } wordings 
 */
export function getImportButtonState( data: any, action: ( data: any ) => void, wordings: CompiledWordings ): BtnModel {
	return {
		label: wordings.import,
		iconClass: ICON_TYPE.UPLOAD,
		btnClass: BUTTON_TYPE.PRIMARY_TRANS,
		action: () => { action( data ) }
	}
}

/**
 * Return export button props
 * @param { Ids } itemSelected 
 * @param { ServiceItemFacades } items 
 * @param { ( ids: Ids ) => void } action
 * @param { CompiledWordings } wordings 
 */
export function getExportButtonState( itemSelected: Ids, items: ServiceItemFacades, action: ( ids: Ids ) => void, wordings: CompiledWordings ): BtnModel {
	const allSelected: boolean = !items.some( i => !getItem( items, i ) )

	return {
		label: allSelected ? wordings.exportAll : wordings.export,
		iconClass: ICON_TYPE.DOWNLOAD,
		btnClass: BUTTON_TYPE.INFO_TRANS,
		action: () => action( allSelected ? toIds( items ): itemSelected ),
		disabled: !items || items.length === 0
	}
}

/**
 * Return delete button props
 * @param { Ids } itemSelected
 * @param { ServiceItemFacades } items
 * @param { ( ids: Ids ) => void } action
 * @param { CompiledWordings } wordings
 */
export function getDeleteButtonState( itemSelected: Ids, items: ServiceItemFacades, action: ( ids: Ids ) => void, wordings: CompiledWordings ): BtnModel {
	const allSelected: boolean = !items.some( i => !getItem( items, i ) )

	return {
		label: allSelected ? wordings.deleteAll : wordings.delete,
		iconClass: ICON_TYPE.TRASH,
		btnClass: BUTTON_TYPE.DANGER_TRANS,
		action: () => action( allSelected ? toIds( items ): itemSelected ),
		disabled: !items || items.length === 0
	}
}