import { EnumArrayEntry, enumArrayToObject } from '../../utils';
import { modes, positions, sizes } from '../types';
import { ArgSelectType, StringSelectArgType } from './types';

export const getSelectArgType = <T>(name: string, entries: EnumArrayEntry<T>[]): ArgSelectType => ({
  [name]: { control: { type: 'select', options: enumArrayToObject(entries) } },
});

export const getModeArgType = (): ArgSelectType => getSelectArgType('mode', modes);

export const getSizeArgType = (): ArgSelectType => getSelectArgType('size', sizes);

export const getPositionArgType = (): ArgSelectType => getSelectArgType('position', positions);

export const getLanguageArgType = (): ArgSelectType =>
  getSelectArgType<StringSelectArgType>('lang', [
    { key: 'Français', value: 'fr' },
    { key: 'English', value: 'en' },
    { key: 'not supported', value: 'unknown' },
  ]);
