import { getL10n, L10n } from './translations';

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

function getDataFromUrl(url: string): L10n | null {
  if (url.startsWith('/locales/p6-element.i18n.en.json')) {
    return { key: 'en' };
  }
  if (url.startsWith('/locales/p6-element.i18n.fr.json')) {
    return { key: 'fr' };
  }
  return null;
}

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(url => {
    const l10n = getDataFromUrl(url as string);
    if (l10n === null) {
      return Promise.reject(new Error(`No locale file found for ${url}`));
    }
    return Promise.resolve(new Response(JSON.stringify(l10n)));
  });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('getL10n', () => {
  it(`default language should be 'en'`, async () => {
    const element = document.createElement('p6-element');
    const l10n = await getL10n(element);
    expect(l10n?.key).toEqual('en');
  });

  it(`language should be 'fr'`, async () => {
    const element = document.createElement('p6-element');
    element.setAttribute('lang', 'fr');
    const l10n = await getL10n(element);
    expect(l10n?.key).toEqual('fr');
  });

  it(`fallback language should be 'en'`, async () => {
    const element = document.createElement('p6-element');
    element.setAttribute('lang', 'ru');
    const l10n = await getL10n(element);
    expect(l10n?.key).toEqual('en');
  });
});
