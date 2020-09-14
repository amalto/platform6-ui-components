import { getAssetPath } from '@stencil/core';
import { getAppVersion, getItem, setItem } from './cache';
import { getClosestLanguage, getDefaultLanguage, LanguageCode } from './language';

const appVersion = getAppVersion();

export interface L10n {
  [key: string]: string;
}

export function interpolate(text: string | undefined, params: { [key: string]: string }): string | undefined {
  if (text === undefined) {
    return undefined;
  }
  return Object.keys(params).reduce((s, param) => {
    return s.replace(`#{${param}}`, params[param]);
  }, text);
}

function getCacheKey(componentName: string, language: LanguageCode): string {
  return `i18n.${componentName}.${appVersion}.${language}`;
}

function writeToCache(componentName: string, language: LanguageCode, data: L10n): void {
  setItem(getCacheKey(componentName, language), JSON.stringify(data));
}

function readFromCache(componentName: string, language: LanguageCode): L10n | null {
  const storageItem = getItem(getCacheKey(componentName, language));
  if (storageItem !== null) {
    try {
      const existingTranslations = JSON.parse(storageItem);
      if (existingTranslations && Object.keys(existingTranslations).length > 0) {
        return existingTranslations;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
  return null;
}

async function fetchL10n(componentName: string, language: string, languagesPath: string): Promise<L10n> {
  const i18n = readFromCache(componentName, language);
  if (i18n !== null) {
    return new Promise(resolve => resolve(i18n));
  }

  try {
    const result = await fetch(`${languagesPath}/${componentName}.i18n.${language}.json?v=${appVersion}`);
    const data = await result.json();
    writeToCache(componentName, language, data);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export function getL10n(element: HTMLElement): Promise<L10n> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getClosestLanguage(element);
  const languagesPath = getAssetPath(`./locales`);

  return fetchL10n(componentName, componentLanguage, languagesPath).catch(() => {
    // eslint-disable-next-line no-console
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default language ${getDefaultLanguage()}.`);
    return fetchL10n(componentName, getDefaultLanguage(), languagesPath);
  });
}
