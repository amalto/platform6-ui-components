import { newSpecPage } from '@stencil/core/testing';
import { P6Waiting } from '../p6-waiting';

describe('p6-waiting', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Waiting],
      html: `<p6-waiting></p6-waiting>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('with message', async () => {
    const page = await newSpecPage({
      components: [P6Waiting],
      html: `<p6-waiting>Loading in progress</p6-waiting>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
