import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('p6-radio-group', () => {
  let page: E2EPage;
  let firstRadio: E2EElement;
  let secondRadio: E2EElement;
  let resetButton: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
    <p6-form>
        <p6-radio-group>
          <p6-radio id="radio-first" name="radio" value="first" checked></p6-radio>
          <p6-radio id="radio-second" name="radio" value="second"></p6-radio>
        </p6-radio-group>
        <p6-button mode="primary" type="reset">
          submit
        </p6-button>
      </p6-form>
    `,
    });
    firstRadio = await page.find('#radio-first');
    secondRadio = await page.find('#radio-second');
    resetButton = await page.find("p6-form p6-button[type='reset']");
  });

  it('should select only one radio', async () => {
    await secondRadio.click();
    expect(firstRadio).not.toHaveAttribute('checked');
    expect(secondRadio).toHaveAttribute('checked');

    await firstRadio.click();
    expect(firstRadio).toHaveAttribute('checked');
    expect(secondRadio).not.toHaveAttribute('checked');
  });

  it('should reset radios', async () => {
    await secondRadio.click();

    expect(firstRadio).not.toHaveAttribute('checked');
    expect(secondRadio).toHaveAttribute('checked');

    await resetButton.click();

    expect(firstRadio).toHaveAttribute('checked');
    expect(secondRadio).not.toHaveAttribute('checked');
  });
});
