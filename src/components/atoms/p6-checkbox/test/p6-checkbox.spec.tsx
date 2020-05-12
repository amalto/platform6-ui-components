import { newSpecPage } from '@stencil/core/testing';
import { P6Checkbox } from '../p6-checkbox';

describe('p6-checkbox', () => {

  const id: string = "0123456789";

  it('with label only', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `<p6-checkbox name="${id}" label="Hello world!"></p6-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-checkbox name="${id}" label="Hello world!">
        <input id="${id}-input" name="${id}" type="checkbox" />
        <label htmlFor="${id}-input">Hello world!</label>
      </p6-checkbox>
    `);
  });

  it('disabled checkbox', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `
      <p6-checkbox disabled="true" name="${id}" label="Disabled checkbox"></p6-checkbox>
      `,
    });
    expect(page.root).toEqualHtml(`
      <p6-checkbox class="disabled" disabled="true" name="${id}" label="Disabled checkbox">
        <input id="${id}-input" disabled="" name="${id}" type="checkbox" />
        <label htmlFor="${id}-input">Disabled checkbox</label>
      </p6-checkbox>
    `);
  });
});
