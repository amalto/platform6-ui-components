import { newSpecPage } from '@stencil/core/testing';
import { P6Select } from '../p6-select';

describe('p6-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Select],
      html: `<p6-select><option>value</option></p6-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('multiple', async () => {
    const page = await newSpecPage({
      components: [P6Select],
      html: `<p6-select multiple><option>value</option></p6-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [P6Select],
      html: `<p6-select disabled><option>value</option></p6-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
