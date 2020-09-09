import { newSpecPage } from '@stencil/core/testing';
import { P6Form } from '../p6-form';

describe('p6-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Form],
      html: `<p6-form></p6-form>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
