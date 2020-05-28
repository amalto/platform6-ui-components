import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { P6ButtonType } from "../p6-button";

describe("p6-button", () => {
  let page: E2EPage;
  let component: E2EElement;
  let innerButton: E2EElement;

  it("renders", async () => {
    page = await newE2EPage({ html: "<p6-button></p6-button>" });
    component = await page.find("p6-button");
    expect(component).toHaveClass("hydrated");
  });

  describe("on click", () => {
    beforeEach(async () => {
      page = await newE2EPage({ html: "<p6-button></p6-button>" });
      component = await page.find("p6-button");
      innerButton = await page.find("p6-button >>> button");
    });

    it("fires a click event", async () => {
      const clickHandler = await page.spyOnEvent("click", "document");

      expect(clickHandler.events.length).toEqual(0);
      await innerButton.click();
      expect(clickHandler.events.length).toEqual(1);
    });

    it("can call its onClick callback", async () => {
      const clickHandler = jest.fn();
      await page.exposeFunction("clickHandler", clickHandler);

      await page.$eval("p6-button", (elm: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        elm.onclick = this.clickHandler;
      });

      await page.waitForChanges();

      expect(clickHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("should not fires a click event when disabled", async () => {
    page = await newE2EPage({ html: "<p6-button disabled></p6-button>" });
    innerButton = await page.find("p6-button >>> button");
    const clickHandler = await page.spyOnEvent("click", "document");

    expect(clickHandler.events.length).toEqual(0);
    await innerButton.click();
    expect(clickHandler.events.length).toEqual(0);
  });

  it("should not call its onClick callback when disabled", async () => {
    const clickHandler = jest.fn();
    page = await newE2EPage({ html: "<p6-button disabled></p6-button>" });
    innerButton = await page.find("p6-button >>> button");
    await page.exposeFunction("clickHandler", clickHandler);

    await page.$eval("p6-button", (elm: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      elm.onclick = this.clickHandler;
    });

    await page.waitForChanges();

    expect(clickHandler).not.toHaveBeenCalled();
    await innerButton.click();
    expect(clickHandler).not.toHaveBeenCalledTimes(1);
  });

  describe("Form", () => {
    let submitHandler: jest.Mock<void, unknown[]>;
    let resetHandler: jest.Mock<void, unknown[]>;

    beforeEach(async () => {
      page = await newE2EPage({
        html:
          '<form><input type="text" name="test"><p6-button></p6-button></form>',
      });
      component = await page.find("p6-button");
      innerButton = await page.find("p6-button >>> button");

      submitHandler = jest.fn();
      resetHandler = jest.fn();

      await page.exposeFunction("submitHandler", submitHandler);
      await page.exposeFunction("resetHandler", resetHandler);

      await page.$eval("form", (elm: HTMLFormElement) => {
        const wrapHandler = (handler: jest.Mock<void, unknown[]>) => (
          e: Event
        ): void => {
          e.preventDefault();
          handler();
        };
        /* eslint-disable no-param-reassign */
        elm.onsubmit = wrapHandler(this.submitHandler);
        elm.onreset = wrapHandler(this.resetHandler);
        /* eslint-enable no-param-reassign */
      });
    });

    it('can submit a form when type is "submit"', async () => {
      await page.$eval("p6-button", (elm: Element & { type: P6ButtonType }) => {
        // eslint-disable-next-line no-param-reassign
        elm.type = "submit";
      });

      await page.waitForChanges();

      expect(submitHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(submitHandler).toHaveBeenCalledTimes(1);
    });

    it('can reset a form when type is "reset"', async () => {
      await page.$eval("p6-button", (elm: Element & { type: P6ButtonType }) => {
        // eslint-disable-next-line no-param-reassign
        elm.type = "reset";
      });

      await page.waitForChanges();

      expect(resetHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(resetHandler).toHaveBeenCalledTimes(1);
    });

    it("doesn't trigger form handlers when type is a button", async () => {
      await page.$eval("p6-button", (elm: Element & { type: P6ButtonType }) => {
        // eslint-disable-next-line no-param-reassign
        elm.type = "button";
      });

      await page.waitForChanges();

      await innerButton.click();
      expect(submitHandler).not.toHaveBeenCalled();
      expect(resetHandler).not.toHaveBeenCalled();
    });
  });
});
