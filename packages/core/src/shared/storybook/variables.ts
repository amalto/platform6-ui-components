import { EnumType } from '../../utils';
import { Mode, Position, Size } from '../types';
import { getModeArgType, getPositionArgType, getSizeArgType } from './argType';
import { ArgSelectType } from './types';

export const enumsConfig = new Map<string, { type: EnumType; argType: ArgSelectType }>([
  ['size', { type: Size, argType: getSizeArgType() }],
  ['mode', { type: Mode, argType: getModeArgType() }],
  ['position', { type: Position, argType: getPositionArgType() }],
]);
