import { newSpecPage } from '@stencil/core/testing';
import { P6Checkbox } from '../p6-checkbox';

describe('p6-checkbox', () => {
  const id = '0123456789';

  it('with label only', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `<p6-checkbox name="${id}">Hello world!</p6-checkbox>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('disabled checkbox', async () => {
    const page = await newSpecPage({
      components: [P6Checkbox],
      html: `
      <p6-checkbox disabled="true" name="${id}">Disabled checkbox</p6-checkbox>
      `,
    });
    expect(page.root).toMatchSnapshot();
  });
});
