/**
 * Created by Bruno Grieder.
 */

import { Reducer } from 'redux';
import DialogState from './DialogState';
import * as DialogActions from './DialogActions';
import { Action } from '../Globals';
import { ThunkAction } from 'redux-thunk';

const reducer = (initialState: DialogState): Reducer<DialogState> => {
  return (state: DialogState, action: Action): DialogState => {
    if (!state) {
      return initialState;
    }

    try {
      switch (action.type) {
        case DialogActions.SHOW_DIALOG: {
          const {
            title,
            body,
            confirmAction,
            cancelAction,
            confirmLevel,
            itemsList,
            modalReadyCallback,
          } = action.value as {
            title: string;
            body: string;
            confirmAction?: Action | ThunkAction<void, DialogState, any>;
            cancelAction?: Action | ThunkAction<void, DialogState, any>;
            confirmLevel: string;
            itemsList?: string[];
            modalReadyCallback?: () => void;
          };
          return {
            ...state,
            isShowing: true,
            title,
            body,
            confirmAction,
            cancelAction,
            confirmButtonLevel: confirmLevel || 'danger',
            itemsList: itemsList || [],
            modalReadyCallback,
          };
        }

        case DialogActions.HIDE_DIALOG: {
          return { ...state, isShowing: false };
        }
      }
    } catch (e) {
      console.log('Unexpected error in reducer:', e);
      return state;
    }

    return state;
  };
};

export default reducer;
