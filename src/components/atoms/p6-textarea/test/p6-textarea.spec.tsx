import { newSpecPage } from '@stencil/core/testing';
import { P6Textarea } from '../p6-textarea';

describe('p6-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Textarea],
      html: `<p6-textarea></p6-textarea>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('add the waiting class on the input container, not on the input', async () => {
    const page = await newSpecPage({
      components: [P6Textarea],
      html: `<p6-textarea waiting></p6-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('add the class "is-static" when the readonly props is true', async () => {
    const page = await newSpecPage({
      components: [P6Textarea],
      html: `<p6-textarea readonly></p6-input>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
