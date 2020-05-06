import { newSpecPage } from '@stencil/core/testing';
import { P6Checkbox } from '../p6-checkbox';

describe('p6-checkbox', () => {
  it('with label only', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `<p6-checkbox label="Hello world!"></p6-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-checkbox label="Hello world!">
        <mock:shadow-root>
        <label class="checkbox">
          <input type="checkbox" />
          <span>Hello world!</span>
        </label>
        </mock:shadow-root>
      </p6-checkbox>
    `);
  });

  it('disabled checkbox', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `<p6-checkbox label="Disabled checkbox" disabled="true"></p6-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-checkbox label="Disabled checkbox" disabled="true">
        <mock:shadow-root>
        <label class="checkbox disabled">
          <input type="checkbox" disabled="" />
          <span class="has-text-grey-light">Disabled checkbox</span>
        </label>
        </mock:shadow-root>
      </p6-checkbox>
    `);
  });
});
