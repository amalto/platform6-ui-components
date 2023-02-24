/**
 * Created by Bruno Grieder.
 */

import { ThunkAction } from 'redux-thunk';
import { Action } from '../Globals';

module DialogState {
  export function getInitialState(): DialogState {
    return {
      isShowing: false,
    } as DialogState;
  }
}

interface DialogState {
  isShowing?: boolean;
  title?: string;
  body?: React.ReactElement<any> | string;
  itemsList?: string[];
  confirmAction?: Action | ThunkAction<void, DialogState, any>;
  cancelAction?: Action | ThunkAction<void, DialogState, any>;
  isLarge?: boolean;
  confirmButtonLevel?: string;
  modalReadyCallback?: () => void;
}

export default DialogState;
