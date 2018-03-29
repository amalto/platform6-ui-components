// Models
import {
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
 * @param { CompiledWordings } wordings 
 */
export function getSelectButtonState( itemSelected: Ids, items: ServiceItemFacades, wordings: CompiledWordings ): BtnModel {
	const allSelected: boolean = !items.some( i => !getItem( items, i ) )

	return {
		label: allSelected ? wordings.unselectAll : wordings.selectAll,
		iconClass: allSelected ? ICON_TYPE.SQUARE : ICON_TYPE.CHECK_SQUARE,
		btnClass: BUTTON_TYPE.INFO_TRANS,
		action: () => { allSelected ? toIds( items ) : [] },
		disabled: !items || items.length === 0
	}
}

/**
 * Add an item
 * @param itemSelected 
 * @param items 
 * @param wordings 
 */
export function getAddButtonState( item: ServiceItemFacade, action: ( item: ServiceItemFacade ) => void, wordings: CompiledWordings ): BtnModel {
	return {
		label: wordings.add,
		iconClass: ICON_TYPE.PLUS,
		btnClass: BUTTON_TYPE.PRIMARY_TRANS,
		action: () => { action( item ) }
	}
}