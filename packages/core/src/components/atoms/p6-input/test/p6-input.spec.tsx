import { newSpecPage } from '@stencil/core/testing';
import { P6Input } from '../p6-input';

describe('p6-input', () => {
  Object.defineProperty(HTMLInputElement.prototype, 'checkValidity', {
    writable: true,
    value: jest.fn().mockImplementation(() => true),
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input></p6-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('add the waiting class on the input container, not on the input', async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input waiting></p6-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('add the class "is-static" when the readonly props is true', async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input readonly></p6-input>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
