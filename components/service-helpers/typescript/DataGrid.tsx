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
    BUTTON_TYPE,
    CALCULATED_CONTENT_MODE
} from '../constants'

import { validateName, formatDate } from '../utils'

import { DataGridPartialProps } from '../models/PartialProps'

import { hasPermission } from '@amalto/scope-helpers'

import * as React from 'react'

import * as classNames from 'classnames'

import DataLine from '@amalto/data-line'
import ActionButton from '@amalto/action-button'

export function getColumnHeaders( wordings: CompiledWordings ) {
    return [
        {
            id: 'actions',
            label: wordings.actions,
            textAlign: 'center',
            disableClick: true,
            width: 155,
            order: -1
        },
        {
            id: 'appKey',
            label: wordings.appKey,
            width: 110
        },
        {
            id: 'name',
            label: wordings.name,
            width: 140
        },
        {
            id: 'description',
            label: wordings.description,
            width: 140
        },
        {
            id: 'lastModification',
            label: wordings.lastModification,
            width: 200
        }

    ]
}

export function getDataLines(
    items: ServiceItemFacades,
    wordings: CompiledWordings,
    locale: string,
    webStorage: any,
    readPermission: string,
    editPermission: string,
    deletePermission: string,
    viewHandler: ( item: ServiceItemFacade ) => void,
    openEditOrAddFormHandler: ( item?: ServiceItemFacade ) => void,
    openRenameFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    cancelRenameHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    openDuplicateFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    exportHandler: ( item: ServiceItemFacade ) => void,
    deleteHandler: ( item: ServiceItemFacade ) => void
): JSX.Element[] {

    return items.map( ( item, idx ) => {
        return <DataLine
            key={idx}
            cells={
                getDataLineCells(
                    item,
                    idx,
                    items,
                    wordings,
                    locale,
                    webStorage,
                    readPermission,
                    editPermission,
                    deletePermission,
                    viewHandler,
                    openEditOrAddFormHandler,
                    openRenameFormHandler,
                    cancelRenameHandler,
                    openDuplicateFormHandler,
                    exportHandler,
                    deleteHandler
                )
            }
            dbleClickHandler={() => { viewHandler && canReadItem( item, webStorage, readPermission, editPermission, deletePermission ) ? viewHandler( item ) : null }}
        />
    } )

    /*
        TODO

        editMode={DUPLICATE || RENAME}
        cellEditHandler
        enterPressHandler

    */

}

function getDataLineCells(
    item: ServiceItemFacade,
    lineIdx: number,
    itemsList: ServiceItemFacades,
    wordings: CompiledWordings,
    locale: string,
    webStorage: any,
    readPermission: string,
    editPermission: string,
    deletePermission: string,
    viewHandler: ( item: ServiceItemFacade ) => void,
    openEditOrAddFormHandler: ( item?: ServiceItemFacade ) => void,
    openRenameFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    cancelRenameHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    openDuplicateFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    exportHandler: ( item: ServiceItemFacade ) => void,
    deleteHandler: ( item: ServiceItemFacade ) => void ) {

    return [
        {
            columnId: 'actions',
            cssClass: 'dg-item-data-value',
            displayValue: getItemActions(
                item,
                lineIdx,
                wordings,
                locale,
                webStorage,
                readPermission,
                editPermission,
                deletePermission,
                viewHandler,
                openEditOrAddFormHandler,
                openRenameFormHandler,
                cancelRenameHandler,
                openDuplicateFormHandler,
                exportHandler,
                deleteHandler
            ),
            readOnly: true
        },
        {
            columnId: 'appKey',
            cssClass: 'dg-item-data-value',
            displayValue: item.appKey,
            readOnly: true
        },
        {
            columnId: 'name',
            cssClass: 'dg-item-data-value',
            displayValue: item.name,
            //TODO isEdited: item.DUPLICATE || ( item.RENAME && item.ORIGINAL_NAME !== item.name ),
            validate: value => validateName( value, { name: item.name, appKey: item.appKey }, itemsList, locale )
        },
        {
            columnId: 'description',
            cssClass: 'dg-item-data-value',
            displayValue: item.description as string,
            readOnly: true
        },
        {
            columnId: 'lastModification',
            cssClass: 'dg-item-data-value',
            displayValue: renderModification( item, wordings, locale ),
            readOnly: true
        }

    ]
}

function renderModification( item: ServiceItemFacade, wordings: CompiledWordings, locale: string ): JSX.Element {
    const { lastModifiedDate, lastModifiedBy } = item

    return (
        <div>
            {
                lastModifiedDate && lastModifiedBy ? (
                    <div>
                        <div>{formatDate( lastModifiedDate, locale )}</div>
                        <div>{wordings.by} {lastModifiedBy}</div>
                    </div>
                ) : <div>-</div>
            }
        </div>
    )
}

function getItemActions(
    item: ServiceItemFacade,
    lineIdx: number,
    wordings: CompiledWordings,
    locale: string,
    webStorage: any,
    readPermission: string,
    editPermission: string,
    deletePermission: string,
    viewHandler: ( item: ServiceItemFacade ) => void,
    openEditOrAddFormHandler: ( item?: ServiceItemFacade ) => void,
    openRenameFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    cancelRenameHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    openDuplicateFormHandler: ( item: ServiceItemFacade, lineIdx: number ) => void,
    exportHandler: ( item: ServiceItemFacade ) => void,
    deleteHandler: ( item: ServiceItemFacade ) => void
): JSX.Element {

    const viewButtonProps = {
        iconClass: ICON_TYPE.VIEW,
        tooltipText: wordings.view,
        colorClass: 'info-color',
        clickAction: () => viewHandler( item )
    }

    const editButtonProps = {
        iconClass: ICON_TYPE.EDIT,
        tooltipText: wordings.edit,
        colorClass: 'warning-color',
        clickAction: () => openEditOrAddFormHandler( item )
    }

    const renameButtonProps = {
        iconClass: ICON_TYPE.RENAME,
        tooltipText: wordings.rename,
        colorClass: 'warning-color',
        clickAction: () => openRenameFormHandler( item, lineIdx )
    }

    const cancelButtonProps = {
        iconClass: ICON_TYPE.UNDO,
        tooltipText: wordings.cancel,
        clickAction: () => cancelRenameHandler( item, lineIdx )
    }

    const duplicateButtonProps = {
        iconClass: ICON_TYPE.COPY,
        tooltipText: wordings.duplicate,
        colorClass: 'primary-color',
        clickAction: () => openDuplicateFormHandler( item, lineIdx )
    }

    const exportButtonProps = {
        iconClass: ICON_TYPE.DOWNLOAD,
        tooltipText: wordings.export,
        colorClass: 'info-color',
        clickAction: () => exportHandler( item )
    }

    const deleteButtonProps = {
        iconClass: ICON_TYPE.DELETE,
        tooltipText: wordings.delete,
        colorClass: 'danger-color',
        clickAction: () => deleteHandler( item )
    }

    return (
        <div className="action-buttons-container">

            {
                //TODO item.DUPLICATE || item.RENAME ? <ActionButton {...cancelButtonProps} /> : (
                <div>
                    {viewHandler && canReadItem( item, webStorage, readPermission, editPermission, deletePermission ) ? <ActionButton {...viewButtonProps} /> : null}
                    {openEditOrAddFormHandler && canEditItem( item, webStorage, editPermission ) ? <ActionButton {...editButtonProps} /> : null}
                    {openRenameFormHandler && canEditItem( item, webStorage, editPermission ) ? <ActionButton {...renameButtonProps} /> : null}
                    {openDuplicateFormHandler && canEditItem( item, webStorage, editPermission ) ? <ActionButton {...duplicateButtonProps} /> : null}
                    {exportHandler && canExportItem( item, webStorage, readPermission, editPermission, deletePermission ) ? <ActionButton {...exportButtonProps} /> : null}
                    {deleteHandler && canDeleteItem( item, webStorage, deletePermission ) ? <ActionButton {...deleteButtonProps} /> : null}
                </div>
                //)
            }

        </div>
    )
}

function canEditItem( item: ServiceItemFacade, webStorage: any, editPermission: string ) {
    return ( item.calculatedContentMode === CALCULATED_CONTENT_MODE.EDITABLE ) && hasPermission( webStorage, editPermission )
}

function canExportItem( item: ServiceItemFacade, webStorage: any, readPermission: string, editPermission: string, deletePermission: string ) {
    return canReadItem( item, webStorage, readPermission, editPermission, deletePermission ) && hasPermission( webStorage, editPermission )
}

function canReadItem( item: ServiceItemFacade, webStorage: any, readPermission: string, editPermission: string, deletePermission: string ) {
    if ( item.calculatedContentMode === CALCULATED_CONTENT_MODE.READABLE || item.calculatedContentMode === CALCULATED_CONTENT_MODE.EDITABLE ) {
        if ( hasPermission( webStorage, readPermission )
            || hasPermission( webStorage, editPermission )
            || hasPermission( webStorage, deletePermission )
        ) {
            return true
        }
    }
    return false
}

function canDeleteItem( item: ServiceItemFacade, webStorage: any, deletePermission: string ) {
    return ( item.calculatedContentMode === CALCULATED_CONTENT_MODE.EDITABLE ) && ( hasPermission( webStorage, deletePermission ) )
}