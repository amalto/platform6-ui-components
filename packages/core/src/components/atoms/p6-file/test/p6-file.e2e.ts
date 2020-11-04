import { newE2EPage } from '@stencil/core/testing';

describe('p6-file', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-file></p6-file>');

    const element = await page.find('p6-file');
    expect(element).toHaveClass('hydrated');
  });
});
