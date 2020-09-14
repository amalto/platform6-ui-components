import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing';

describe('p6-form', () => {
  let page: E2EPage;
  let innerButton: E2EElement;
  let submitHandler: EventSpy;
  let invalidHandler: EventSpy;
  const firstInputSelector = "p6-form p6-input[name='c-input'] >>> input";
  const secondInputSelector = "p6-form input[name='n-input']";

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
    <p6-form>
        <p6-field>
          <p6-label slot="label">Custom input</p6-label>
          <p6-input name="c-input" required />
        </p6-field>
        <p6-field>
          <p6-label slot="label">Native input</p6-label>
          <input name="n-input" required />
        </p6-field>
        <p6-button mode="primary" type="submit">
          submit
        </p6-button>
      </p6-form>
    `,
    });
    submitHandler = await page.spyOnEvent('p6Submit', 'document');
    invalidHandler = await page.spyOnEvent('p6Invalid', 'document');
    innerButton = await page.find('p6-form p6-button >>> button');
  });

  it('renders', async () => {
    const element = await page.find('p6-form');
    expect(element).toHaveClass('hydrated');
  });

  describe(`Submit`, () => {
    it('should not fire a "p6Submit" event if the form is invalid', async () => {
      await innerButton.click();

      expect(invalidHandler.length).toEqual(1);
      expect(submitHandler.length).toEqual(0);
    });

    it('should not fire a "p6Submit" event if native control are invalid', async () => {
      const firstInput = await page.find(firstInputSelector);
      firstInput.press('1');

      await innerButton.click();

      expect(invalidHandler.length).toEqual(0);
      expect(submitHandler.length).toEqual(0);
    });

    it('should not fire a "p6Submit" event if custom control are invalid', async () => {
      const secondInput = await page.find(secondInputSelector);
      secondInput.press('2');

      // await page.waitForChanges();
      await innerButton.click();

      expect(invalidHandler.length).toEqual(1);
      expect(submitHandler.length).toEqual(0);
    });

    it('should fire a "p6Submit" event when the form is valid', async () => {
      const firstInput = await page.find(firstInputSelector);
      firstInput.press('1');

      const secondInput = await page.find(secondInputSelector);
      secondInput.press('2');

      // await page.waitForChanges();
      await innerButton.click();

      expect(invalidHandler.length).toEqual(0);
      expect(submitHandler.length).toEqual(1);
    });
  });
});
