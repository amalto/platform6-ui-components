import { newE2EPage } from '@stencil/core/testing';

describe('p6-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-checkbox></p6-checkbox>');

    const element = await page.find('p6-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
