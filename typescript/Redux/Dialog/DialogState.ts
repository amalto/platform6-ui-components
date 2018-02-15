/**
 * Created by Bruno Grieder.
 */

import { Action } from '../Globals'


module DialogState {

    export function getInitialState(): DialogState {

        return {
            isShowing: false
        } as DialogState
    }
}

interface DialogState {

    isShowing?: boolean
    title?: string
    body?: React.ReactElement<any> | string
    itemsList?: string[]
    confirmAction?: Action
    cancelAction?: Action
    isLarge?: boolean
    confirmButtonLevel?: string
    modalReadyCallback?: () => void;
}


export default DialogState
