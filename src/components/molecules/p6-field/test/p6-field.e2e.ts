import { newE2EPage } from '@stencil/core/testing';

describe('p6-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-field></p6-field>');

    const element = await page.find('p6-field');
    expect(element).toHaveClass('hydrated');
  });
});
