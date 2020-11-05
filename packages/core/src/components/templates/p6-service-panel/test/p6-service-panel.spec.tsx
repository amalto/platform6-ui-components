import { newSpecPage } from '@stencil/core/testing';
import { L10n } from '../../../../utils/translations';
import l10n_en from '../locales/p6-service-panel.i18n.en.json';
import l10n_fr from '../locales/p6-service-panel.i18n.fr.json';
import { P6ServicePanel } from '../p6-service-panel';

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

function getDataFromUrl(url: string): L10n | null {
  if (url.startsWith('/locales/p6-service-panel.i18n.en.json')) {
    return l10n_en;
  }
  if (url.startsWith('/locales/p6-service-panel.i18n.fr.json')) {
    return l10n_fr;
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

describe('p6-service-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6ServicePanel],
      html: `<p6-service-panel></p6-service-panel>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
