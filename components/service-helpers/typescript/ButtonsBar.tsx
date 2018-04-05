// Models
import {
    Id,
    Ids,
    ServiceItemFacade,
    ServiceItemFacades,
    CompiledWordings
} from '../models/ServiceHelpers'

// Constants
import {
    ICON_TYPE,
    BUTTON_TYPE
} from '../constants'

import { BtnGroupsProps } from '../models/PartialProps'

import { hasPermission } from '@amalto/scope-helpers'

import * as React from 'react'
import * as classNames from 'classnames'


export function getSelectButton( wordings: CompiledWordings, webStorage: any, selectedItemsIdx: number[], itemsList: ServiceItemFacades, selectHandler: ( indexes: number[] ) => void, hasUnsavedChanges: boolean, editPermission: string, deletePermission: string ): BtnGroupsProps {

    const allSelected = selectedItemsIdx.length === itemsList.length

    return hasPermission( webStorage, editPermission ) || hasPermission( webStorage, deletePermission ) ? {
        btns: [{
            clickAction: () => { allSelected ? selectHandler( [] ) : selectHandler( itemsList.map( ( item, idx ) => idx ) ) },
            cssClass: BUTTON_TYPE.INFO_TRANS,
            iconClass: allSelected ? ICON_TYPE.UNSELECTED : ICON_TYPE.SELECTED,
            text: allSelected ? wordings.unselectAll : wordings.selectAll,
            disabled: !itemsList || itemsList.length === 0 || hasUnsavedChanges
        }]
    } : null
}


export function getAddButton( wordings: CompiledWordings, webStorage: any, openAddForm: () => void, editPermission: string ): BtnGroupsProps {

    return hasPermission( webStorage, editPermission ) ? {
        btns: [{
            clickAction: openAddForm,
            cssClass: BUTTON_TYPE.PRIMARY_TRANS,
            iconClass: ICON_TYPE.ADD,
            text: wordings.add,
            //TODO disabled: loading
        }]
    } : null
}


export function getImportExportButtons( wordings: CompiledWordings, webStorage: any, selectedItemsIdx: number[], importHandler: ( file: File ) => void, exportHandler: () => void, hasUnsavedChanges: boolean, editPermission: string, importFormId: string ): BtnGroupsProps {

    return hasPermission( webStorage, editPermission ) ? {
        btns: [
            importHandler ? {
                cssClass: classNames( 'upload-btn', BUTTON_TYPE.PRIMARY_TRANS ),
                btnContent: (
                    <div>
                        <span className={ICON_TYPE.UPLOAD} />
                        <span style={{ marginLeft: 4 }}>{wordings.import}</span>
                        <form id={importFormId}>
                            <input type="file" className="upload-input" onChange={( event ) => importHandler( event.target.files[0] )} />
                        </form>
                    </div>
                ),
                disabled: hasUnsavedChanges// || TODO importing loading
            } : null,
            exportHandler ? {
                iconClass: ICON_TYPE.DOWNLOAD,
                cssClass: BUTTON_TYPE.INFO_TRANS,
                clickAction: exportHandler,
                text: selectedItemsIdx.length !== 0 ? wordings.export : wordings.exportAll,
                disabled: hasUnsavedChanges// || TODO exporting loading
            } : null
        ].filter( btn => !!btn )
    } : null

}

export function getDeleteButton( wordings: CompiledWordings, webStorage: any, selectedItemsIdx: number[], itemsList: ServiceItemFacades, deleteHandler: () => void, deletePermission: string ): BtnGroupsProps {

    return hasPermission( webStorage, deletePermission ) ? {
        btns: [{
            clickAction: deleteHandler,
            cssClass: BUTTON_TYPE.DANGER_TRANS,
            iconClass: ICON_TYPE.DELETE,
            text: selectedItemsIdx.length !== 0 ? wordings.delete : wordings.deleteAll,
            disabled: itemsList.length === 0// TODO || deleting loading || loading
        }]
    } : null
}