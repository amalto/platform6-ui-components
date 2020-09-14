import { newE2EPage } from '@stencil/core/testing';

describe('p6-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-spinner></p6-spinner>');

    const element = await page.find('p6-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
