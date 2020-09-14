import { Mode, Position, Size } from '../shared/types';
import { isDefaultMode, isDefaultPosition, isDefaultSize } from './attribute';

export function getModeClass(mode: Mode, defaultMode: Mode = Mode.default): { [key: string]: boolean } {
  return {
    [`is-${Mode[mode]}`]: !isDefaultMode(mode, defaultMode),
  };
}

export function getSizeClass(size: Size, defaultSize: Size = Size.normal, prefix = 'is'): { [key: string]: boolean } {
  return {
    [`${prefix}-${Size[size]}`]: !isDefaultSize(size, defaultSize),
  };
}

export function getPositionClass(position: Position, defaultPosition: Position = Position.top): { [key: string]: boolean } {
  return {
    [`is-${Position[position]}`]: !isDefaultPosition(position, defaultPosition),
  };
}
