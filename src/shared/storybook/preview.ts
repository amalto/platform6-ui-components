/* eslint-disable import/no-extraneous-dependencies */
import { html as beautify } from 'js-beautify';
import { TemplateResult } from 'lit-html';
/* eslint-enable import/no-extraneous-dependencies */
import { Preview } from './types';
import { capitalize, htmlElementToArray, isTemplateResult } from './utils';
import { enumsConfig } from './variables';

const getHTMLElementPropertiesPreview = (name: string, value: unknown, jsx: boolean): string | null => {
  const jsxFormat = (v: unknown) => (jsx ? `{${v}}` : v);

  if (value === true) {
    return `${name}`;
  }
  if (typeof value === 'string') {
    return `${name}=${jsxFormat(JSON.stringify(String(value)))}`;
  }
  if (typeof value === 'number') {
    if (jsx) {
      const enumConfig = enumsConfig.get(name);
      if (enumConfig !== undefined) {
        return `${name}={${capitalize(name)}.${enumConfig.type[value]}}`;
      }
      return `${name}={${value}}`;
    }
    return `${name}=${JSON.stringify(String(value))}`;
  }
  if (typeof value === 'object') {
    return `${name}=${jsxFormat(`"${JSON.stringify(value)}"`)}`;
  }
  return null;
};

const getHTMLElementPreview = (element: HTMLElement, jsx: boolean): string => {
  const tagName = element.tagName.toLowerCase();

  const allPropertiesAndAttributes = Object.keys(element)
    // eslint-disable-next-line no-prototype-builtins
    .filter(key => element.hasOwnProperty(key))
    .map(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return [key, element[key]];
    })
    .map(([name, value]): string | null => getHTMLElementPropertiesPreview(name, value, jsx))
    .filter(a => a != null);

  const attrsAndProps = allPropertiesAndAttributes.length > 0 ? ` ${allPropertiesAndAttributes.join(' ')}` : '';

  const innerHTML = Array.from(element.childNodes)
    .map(child => {
      if (child.nodeType === 1) {
        return getHTMLElementPreview(child as HTMLElement, jsx);
      }
      if (child.nodeType === 3) {
        return child.textContent;
      }
      return '';
    })
    .join('');

  return `<${tagName}${attrsAndProps}>${innerHTML}</${tagName}>`;
};

export const getPreview = (code: string): Preview => {
  return {
    docs: { source: { code: beautify(code) } },
  };
};

export const buildStoryPreview = (preview: TemplateResult | HTMLElement | HTMLElement[]): string => {
  if (isTemplateResult(preview)) {
    return preview.getHTML();
  }

  const elements = htmlElementToArray(preview);

  const htmlPreview = elements.map(e => getHTMLElementPreview(e, false)).join('');

  const jsxPreview = elements.map(e => getHTMLElementPreview(e, true)).join('');

  return `
        <!-- HTML -->
        ${htmlPreview}

        <!-- JSX -->
        ${jsxPreview}
    `;
};
