import { isNumber } from './is-utils';

export function toWidth(value: number | string, unit = 'px'): string {
  return isNumber(value) ? `${value}${unit}` : value;
}
