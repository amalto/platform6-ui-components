import { newSpecPage } from '@stencil/core/testing';
import { P6Switch } from '../p6-switch';

describe('p6-switch', () => {

  const id: string = "0123456789";

  it('with label only', async () => {
    const page = await newSpecPage({
      components: [P6Switch],
      html: `<p6-switch name="${id}">Hello world!</p6-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-switch name="${id}">
        <input id="${id}-input" name="${id}" type="switch" />
        <label htmlFor="${id}-input">Hello world!</label>
      </p6-switch>
    `);
  });

  it('disabled switch', async () => {
    const page = await newSpecPage({
      components: [P6Switch],
      html: `
      <p6-switch disabled="true" name="${id}">Disabled switch</p6-switch>
      `,
    });
    expect(page.root).toEqualHtml(`
      <p6-switch disabled="true" name="${id}">
        <input id="${id}-input" disabled="" name="${id}" type="switch" />
        <label htmlFor="${id}-input">Disabled switch</label>
      </p6-switch>
    `);
  });
});
