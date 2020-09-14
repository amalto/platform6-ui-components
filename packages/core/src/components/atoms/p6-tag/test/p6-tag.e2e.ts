import { newE2EPage } from '@stencil/core/testing';

describe('p6-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-tag></p6-tag>');

    const element = await page.find('p6-tag');
    expect(element).toHaveClass('hydrated');
  });
});
