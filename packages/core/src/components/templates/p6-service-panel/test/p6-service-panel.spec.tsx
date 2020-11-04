import { newSpecPage } from '@stencil/core/testing';
import { P6ServicePanel } from '../p6-service-panel';

describe('p6-service-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6ServicePanel],
      html: `<p6-service-panel></p6-service-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-service-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-service-panel>
    `);
  });
});
