import { newE2EPage } from '@stencil/core/testing';

describe('p6-waiting', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-waiting></p6-waiting>');

    const element = await page.find('p6-waiting');
    expect(element).toHaveClass('hydrated');
  });
});
