export type LanguageCode = string;

const defaultLanguage: LanguageCode = 'en';

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
const supportedLanguages: Record<LanguageCode, string> = {
  en: 'English',
  fr: 'Français',
};

export function getDefaultLanguage(): LanguageCode {
  return defaultLanguage;
}

export function isDefaultLanguage(language: LanguageCode): boolean {
  return defaultLanguage === language;
}

export function getLanguageName(language: LanguageCode): string {
  return supportedLanguages[language];
}

export function getLanguageCodes(): LanguageCode[] {
  return Object.keys(supportedLanguages);
}

function getSupportedLanguage(language: LanguageCode): LanguageCode {
  if (language in supportedLanguages) {
    return language;
  }

  return defaultLanguage;
}

/**
 * Attempts to find the closest tag with a language attribute.
 * Falls back to english if no language is found.
 * @param element The element to find a language attribute for.
 */
export function getClosestLanguage(element: HTMLElement = document.body): LanguageCode {
  const closestElement = element.closest('[lang]') as HTMLElement;
  if (closestElement !== null) {
    return getSupportedLanguage(closestElement.lang);
  }
  return getSupportedLanguage(window?.navigator?.language?.substring(0, 2)) || defaultLanguage;
}
