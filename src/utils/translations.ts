import { getAssetPath } from "@stencil/core";
import { getAppVersion, getItem, setItem } from "~utils/cache";

export type Locale = string;
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "fr"];

const appVersion = getAppVersion();

export interface L10n {
  [key: string]: string;
}

function getKnownLanguage(locale: Locale): Locale {
  if (locales.indexOf(locale) === -1) {
    return defaultLocale;
  }
  return locale;
}

/**
 * Attempts to find the closest tag with a lang attribute.
 * Falls back to english if no language is found.
 * @param element The element to find a lang attribute for.
 */
export function getClosestLanguage(
  element: HTMLElement = document.body
): Locale {
  const closestElement = element.closest("[lang]") as HTMLElement;
  if (closestElement !== null) {
    return getKnownLanguage(closestElement.lang);
  }
  return (
    getKnownLanguage(window?.navigator?.language?.substring(0, 2)) ||
    defaultLocale
  );
}

function getCacheKey(componentName: string, locale: Locale): string {
  return `i18n.${componentName}.${appVersion}.${locale}`;
}

function writeToCache(componentName: string, locale: Locale, data: L10n): void {
  setItem(getCacheKey(componentName, locale), JSON.stringify(data));
}

function readFromCache(componentName: string, locale: Locale): L10n | null {
  const storageItem = getItem(getCacheKey(componentName, locale));
  if (storageItem !== null) {
    try {
      const existingTranslations = JSON.parse(storageItem);
      if (
        existingTranslations &&
        Object.keys(existingTranslations).length > 0
      ) {
        return existingTranslations;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
  return null;
}

async function fetchL10n(
  componentName: string,
  locale: string,
  localesPath: string
): Promise<L10n> {
  const i18n = readFromCache(componentName, locale);
  if (i18n !== null) {
    return new Promise((resolve) => resolve(i18n));
  }

  try {
    const result = await fetch(
      `${localesPath}/${componentName}.i18n.${locale}.json?v=${appVersion}`
    );
    const data = await result.json();
    writeToCache(componentName, locale, data);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export function getL10n(element: HTMLElement): Promise<L10n> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getClosestLanguage(element);
  const localesPath = getAssetPath(`./locales`);

  return fetchL10n(componentName, componentLanguage, localesPath).catch(() => {
    // eslint-disable-next-line no-console
    console.warn(
      `no locale for ${componentName} (${componentLanguage}) loading default locale ${defaultLocale}.`
    );
    return fetchL10n(componentName, defaultLocale, localesPath);
  });
}
