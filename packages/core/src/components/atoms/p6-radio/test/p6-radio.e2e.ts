import { newE2EPage } from '@stencil/core/testing';

describe('p6-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-radio></p6-radio>');

    const element = await page.find('p6-radio');
    expect(element).toHaveClass('hydrated');
  });
});
