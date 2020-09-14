import { getClosestLanguage, getDefaultLanguage, getLanguageCodes, getLanguageName, isDefaultLanguage } from './language';

describe('language', () => {
  it(`getLanguageCodes'`, () => {
    const codes = getLanguageCodes();
    expect(codes).toEqual(['en', 'fr']);
  });

  it(`isDefaultLanguage`, () => {
    expect(isDefaultLanguage('en')).toEqual(true);
    expect(isDefaultLanguage('fr')).toEqual(false);
  });

  it(`defaultLanguage`, () => {
    expect(getDefaultLanguage()).toEqual('en');
  });

  it(`getLanguageName`, () => {
    expect(getLanguageName('fr')).toEqual('Français');
    expect(getLanguageName('en')).toEqual('English');
    expect(getLanguageName('fake')).toEqual(undefined);
  });

  describe(`getClosestLanguage`, () => {
    it(`from element`, () => {
      const element = document.createElement('div');
      element.setAttribute('lang', 'fr');
      expect(getClosestLanguage(element)).toEqual('fr');
    });

    it(`from parent`, () => {
      const parent = document.createElement('div');
      parent.setAttribute('lang', 'fr');

      const element = document.createElement('div');
      parent.appendChild(element);

      expect(getClosestLanguage(element)).toEqual('fr');
    });
  });
});
