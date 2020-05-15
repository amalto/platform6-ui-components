import { newSpecPage } from '@stencil/core/testing';
import { P6Radio } from '../p6-radio';

describe('p6-radio', () => {

  const name: string = 'radio-input';
  const value: string = name;
  const extraClass: string = 'mgr-5';
  const id: string = `${name}-${value}-input`;

  it('defaut p6-radio', async () => {
    const page = await newSpecPage({
      components: [P6Radio],
      html: `
      <p6-radio name="${name}"
        class="${extraClass}" value="${value}">
        first
      </p6-radio>
      `,
    });
    expect(page.root).toEqualHtml(`
      <p6-radio name="${name}" class="${extraClass}" value="${value}">
        <input id="${id}"
          name="${name}"
          type="radio"
          value="${value}"
        />
        <label htmlFor="${id}">
          first
        </label>
      </p6-radio>
    `);
  });
});
