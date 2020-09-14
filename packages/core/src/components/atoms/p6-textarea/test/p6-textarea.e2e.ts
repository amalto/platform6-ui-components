import { newE2EPage } from '@stencil/core/testing';

describe('p6-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-textarea></p6-textarea>');

    const element = await page.find('p6-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('should check the validity of the value when it loses focus', async () => {
    const page = await newE2EPage({
      html: `
      <p6-textarea name="code" min="12"></p6-textarea>
      <button>ok</button>
      `,
    });

    const field = await page.find('p6-textarea >>> textarea');
    await field.focus();
    await page.keyboard.type('qwerty');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const input = await page.find('p6-textarea >>> textarea.is-danger');
    expect(input).not.toBeNull();
  });
});
