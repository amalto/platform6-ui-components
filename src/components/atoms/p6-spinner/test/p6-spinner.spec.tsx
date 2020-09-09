import { newSpecPage } from '@stencil/core/testing';
import { P6Spinner } from '../p6-spinner';

describe('p6-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Spinner],
      html: `<p6-spinner></p6-spinner>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
