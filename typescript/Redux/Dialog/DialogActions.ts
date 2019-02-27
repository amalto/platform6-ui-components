/**
 * Created by Bruno Grieder.
 */

import { ThunkAction } from 'redux-thunk'
import { Action } from '../Globals'
import GlobalState from '../GlobalState'


export const SHOW_DIALOG = "SHOW_DIALOG"
export const HIDE_DIALOG = "HIDE_DIALOG"


export function showDialog(
    title: string,
    body: React.ReactElement<any> | string,
    confirmAction?: Action | ThunkAction<void, GlobalState, any, Action>,
    cancelAction?: Action | ThunkAction<void, GlobalState, any, Action>,
    confirmLevel?: string,
    itemsList?: string[],
    modalReadyCallback?: () => void
): Action {
    return {
        type: SHOW_DIALOG,
        value: { title, body, confirmAction, cancelAction, confirmLevel, itemsList, modalReadyCallback }
    }
}


export function hideDialog(): Action {
    return {
        type: HIDE_DIALOG,
        value: undefined
    }
}







