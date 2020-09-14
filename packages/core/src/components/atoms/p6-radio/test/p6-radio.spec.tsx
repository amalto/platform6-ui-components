import { newSpecPage } from '@stencil/core/testing';
import { P6Radio } from '../p6-radio';

describe('p6-radio', () => {
  const name = 'radio-input';
  const value: string = name;
  const extraClass = 'mgr-5';

  it('defaut p6-radio', async () => {
    const page = await newSpecPage({
      components: [P6Radio],
      html: `
      <p6-radio name="${name}"
        class="${extraClass}" value="${value}">
        first
      </p6-radio>
      `,
    });
    expect(page.root).toMatchSnapshot();
  });
});
