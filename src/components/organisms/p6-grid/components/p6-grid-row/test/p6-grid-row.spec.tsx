import { newSpecPage } from '@stencil/core/testing';
import { P6GridRow } from '../p6-grid-row';

describe('p6-grid-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6GridRow],
      html: `<p6-grid-row></p6-grid-row>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid-row>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid-row>
    `);
  });
});
