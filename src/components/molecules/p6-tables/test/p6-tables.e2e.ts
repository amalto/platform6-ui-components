import { newE2EPage } from '@stencil/core/testing';

describe('p6-tables', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-tables></p6-tables>');

    const element = await page.find('p6-tables');
    expect(element).toHaveClass('hydrated');
  });
});
