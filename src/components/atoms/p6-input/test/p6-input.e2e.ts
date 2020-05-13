import { newE2EPage } from '@stencil/core/testing';

describe('p6-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-input></p6-input>');

    const element = await page.find('p6-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should display an error message when it is initialized with an invalid value', async () => {
    const page = await newE2EPage({
      html: '<p6-input name="code" pattern="00[6|7|8|9|11]" value="0042">00 Agent</p6-input>'
    });

    const element = await page.find('p6-input');
    const message = await element.find('.help.is-danger');

    expect(message).not.toBeNull()
    expect(message.innerText.trim()).not.toEqual('')
  });

  it('should check the validity of the value when it loses focus', async () => {
    const page = await newE2EPage({
      html: `
      <p6-input name="code" pattern="00[6|7|8|9|11]">00 Agent</p6-input>
      <button>ok</button>
      `
    });

    await page.focus('p6-input input');
    await page.keyboard.type('0042');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    
    const message = await page.find('p6-input .help.is-danger');
    expect(message).not.toBeNull()
    expect(message.innerText.trim()).not.toEqual('')
  });

  it('should be a textarea when the type is "text" and multiline is true', async () => {
    const page = await newE2EPage({
      html: `<p6-input multiline value="hello">label</p6-input>`
    });

    const input = await page.find('p6-input #undefined-input')
    expect(input).toEqualHtml(`
    <textarea class="sc-p6-input textarea" id="undefined-input">
    hello
    </textarea>
    `)
  });
});