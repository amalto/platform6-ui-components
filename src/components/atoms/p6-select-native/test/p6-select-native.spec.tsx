import { newSpecPage } from '@stencil/core/testing';
import { P6SelectNative } from '../p6-select-native';

describe('p6-select-native', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6SelectNative],
      html: `<p6-select-native>
      </p6-select-native>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
