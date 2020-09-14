import { newSpecPage } from '@stencil/core/testing';
import { P6Field } from '../p6-field';

describe('p6-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Field],
      html: `<p6-field></p6-field>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
