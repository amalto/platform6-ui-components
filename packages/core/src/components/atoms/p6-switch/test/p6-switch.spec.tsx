import { newSpecPage } from '@stencil/core/testing';
import { P6Switch } from '../p6-switch';

describe('p6-switch', () => {
  const id = '0123456789';

  it('with label only', async () => {
    const page = await newSpecPage({
      components: [P6Switch],
      html: `<p6-switch name="${id}">Hello world!</p6-switch>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('disabled switch', async () => {
    const page = await newSpecPage({
      components: [P6Switch],
      html: `
      <p6-switch disabled="true" name="${id}">Disabled switch</p6-switch>
      `,
    });
    expect(page.root).toMatchSnapshot();
  });
});
