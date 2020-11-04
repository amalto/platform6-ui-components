import { newSpecPage } from '@stencil/core/testing';
import { P6GridRowActions } from '../p6-grid-row-actions';

describe('p6-grid-actions', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6GridRowActions],
      html: `<p6-grid-actions></p6-grid-actions>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid-actions>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid-actions>
    `);
  });
});
