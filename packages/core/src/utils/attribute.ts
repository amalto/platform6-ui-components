import { Mode, Position, Size } from '../shared/types';

export function isEmpty(value: unknown): boolean {
  return value === undefined || value === 'undefined' || value === null || value === 'null' || `${value}`.trim() === '';
}

export function toDate(value: string | undefined): Date | undefined {
  if (value === undefined || value === '') {
    return undefined;
  }
  return new Date(value);
}

export function cleanupValue<T>(value: T | undefined | null): T | undefined {
  return isEmpty(value) ? undefined : (value as T);
}

export function cleanupAttributes(attributes: { [key: string]: unknown }): { [key: string]: unknown } {
  return Object.entries(attributes)
    .filter(attr => !isEmpty(attr[1]))
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
}

export const isDefaultSize = (size: Size, defaultSize: Size = Size.normal): boolean => isEmpty(size) || Size[size] === Size[defaultSize];

export const isDefaultMode = (mode: Mode, defaultMode: Mode = Mode.default): boolean => isEmpty(mode) || Mode[mode] === Mode[defaultMode];

export const isDefaultPosition = (position: Position, defaultPosition: Position = Position.top): boolean => isEmpty(position) || Position[position] === Position[defaultPosition];
