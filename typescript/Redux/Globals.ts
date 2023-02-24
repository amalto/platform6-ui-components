import { Dispatch } from 'redux';

export interface Action {
  type: string;
  value: any;
}

export interface ReduxProps {
  dispatch?: Dispatch<any>;
}
