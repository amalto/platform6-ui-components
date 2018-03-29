// Models
import {
    Ids,
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
    getItem
} from '../utils'

export function getSelectButtonState( itemSelected: Ids, items: ServiceItemFacades, wordings: CompiledWordings ): BtnModel {
	const allSelected: boolean = !items.some( i => !getItem( items, i ) )

	return {
		label: allSelected ? wordings.unselectAll : wordings.selectAll,
		iconClass: allSelected ? ICON_TYPE.SQUARE : ICON_TYPE.CHECK_SQUARE,
		btnClass: BUTTON_TYPE.INFO_TRANS,
		action: () => {},
		disabled: !items || items.length === 0
	}
}