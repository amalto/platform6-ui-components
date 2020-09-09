import { newSpecPage } from '@stencil/core/testing';
import { P6GridCell } from '../p6-grid-cell';

describe('p6-grid-cell', () => {
  it('should render an empty cell', async () => {
    const page = await newSpecPage({
      components: [P6GridCell],
      html: `<p6-grid-cell></p6-grid-cell>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
