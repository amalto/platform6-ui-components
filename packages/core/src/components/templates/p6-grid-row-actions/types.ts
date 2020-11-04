import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { EventEmitter } from '@stencil/core';
import { Mode } from '../../../shared/types';
import { RowId } from '../../organisms/p6-grid/core/entities';

export interface ActionsOptions {
  create: { disabled: boolean; canUse: boolean };
  view: { disabled: boolean; canUse: boolean };
  edit: { disabled: boolean; canUse: boolean };
  rename: { disabled: boolean; canUse: boolean };
  delete: { disabled: boolean; canUse: boolean };
  export: { disabled: boolean; canUse: boolean };
  [action: string]: { disabled: boolean; canUse: boolean };
}

export interface Action {
  id: keyof ActionsOptions;
  title: string;
  icon: IconName;
  iconPrefix?: IconPrefix;
  mode?: Mode;
  emitter: () => EventEmitter<{ rowId: RowId }> | undefined;
}
