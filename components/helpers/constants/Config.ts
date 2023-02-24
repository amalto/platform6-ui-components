export interface Language {
  label: string;
  locale: string;
}

export const AVAILABLE_LANGUAGES: Language[] = [
  {
    label: 'EN',
    locale: 'en-US',
  },
  {
    label: 'FR',
    locale: 'fr-FR',
  },
];
