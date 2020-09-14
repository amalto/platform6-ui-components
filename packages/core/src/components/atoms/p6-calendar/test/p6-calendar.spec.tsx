import { newSpecPage } from '@stencil/core/testing';
import { L10n } from '../../../../utils/translations';
import { P6Empty } from '../../../templates/p6-empty/p6-empty';
import l10n_en from '../locales/p6-calendar.i18n.en.json';
import l10n_fr from '../locales/p6-calendar.i18n.fr.json';
import { P6Calendar } from '../p6-calendar';

const unmockedFetch = global.fetch;

function getDataFromUrl(url: string): L10n | null {
  if (url.startsWith('/locales/p6-calendar.i18n.en.json')) {
    return l10n_en;
  }
  if (url.startsWith('/locales/p6-calendar.i18n.fr.json')) {
    return l10n_fr;
  }
  return null;
}

beforeAll(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en',
    configurable: true,
  });

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

describe('p6-calendar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Calendar],
      html: `<p6-calendar></p6-calendar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe('translation', () => {
    const locales = ['fr', 'en'];
    it.each(locales)(`Should translate %s`, async (locale: string) => {
      const page = await newSpecPage({
        components: [P6Empty],
        html: `<div lang="${locale}"><p6-calendar></p6-calendar></div>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
