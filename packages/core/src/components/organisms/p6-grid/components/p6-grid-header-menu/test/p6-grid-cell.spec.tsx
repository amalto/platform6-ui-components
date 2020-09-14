import { newSpecPage } from '@stencil/core/testing';
import { P6GridHeaderMenu } from '../p6-grid-header-menu';

describe('p6-grid-header-menu', () => {
  it('should render an empty cell', async () => {
    const page = await newSpecPage({
      components: [P6GridHeaderMenu],
      html: `<p6-grid-header-menu></p6-grid-header-menu>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
