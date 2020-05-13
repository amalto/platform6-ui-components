import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';
import { Type } from '../p6-button';

describe('p6-button', () => {
  let page: E2EPage;
  let component: E2EElement;
  let innerButton: any;

  it('renders', async () => {
    page = await newE2EPage({html: '<p6-button></p6-button>'});
    component = await page.find('p6-button')
    expect(component).toHaveClass('hydrated');
  });

  describe('on click', () => {
    beforeEach(async () => {
      page = await newE2EPage({html: '<p6-button></p6-button>'});
      component = await page.find('p6-button')
      innerButton = await page.find('p6-button >>> button');
    });
    
    it('fires a click event', async () => {
      const spy = await page.spyOnEvent('click', 'document');
  
      expect(spy.events.length).toEqual(0);
      await innerButton.click();
      expect(spy.events.length).toEqual(1);
    });
  
    it('can call its onClick callback', async () => {
      const clickHandler = jest.fn();
      await page.exposeFunction("clickHandler", clickHandler);
      
      await page.$eval("p6-button", (elm: HTMLElement) => {
        elm.onclick = this.clickHandler;
      });
  
      await page.waitForChanges();
  
      expect(clickHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form', () => {
    let submitHandler: jest.Mock<any, any>
    let resetHandler: jest.Mock<any, any>

    beforeEach(async () => {
      page = await newE2EPage({html: '<form><input type="text" name="test"><p6-button></p6-button></form>'});
      component = await page.find('p6-button')
      innerButton = await page.find('p6-button >>> button');

      submitHandler = jest.fn();
      resetHandler = jest.fn();

      await page.exposeFunction("submitHandler", submitHandler);
      await page.exposeFunction("resetHandler", resetHandler);

      
      await page.$eval("form", (elm: HTMLFormElement) => {
        const wrapHandler = (handler: jest.Mock<any, any>) => (e: Event) => {
          e.preventDefault()
          handler()
        }

        elm.onsubmit = wrapHandler(this.submitHandler);
        elm.onreset = wrapHandler(this.resetHandler);
      });
    });

    it('can submit a form when type is "submit"', async () => {      
      await page.$eval("p6-button", (elm: Element & { type: Type}) => {
        elm.type = 'submit';
      });
  
      await page.waitForChanges();
  
      expect(submitHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(submitHandler).toHaveBeenCalledTimes(1);
    });

    it('can reset a form when type is "reset"', async () => {      
      await page.$eval("p6-button", (elm: Element & { type: Type}) => {
        elm.type = 'reset';
      });
  
      await page.waitForChanges();
  
      expect(resetHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(resetHandler).toHaveBeenCalledTimes(1);
    });

    it("doesn't trigger form handlers when type is a button", async () => {      
      await page.$eval("p6-button", (elm: Element & { type: Type}) => {
        elm.type = 'button';
      });
  
      await page.waitForChanges();
  
      await innerButton.click();
      expect(submitHandler).not.toHaveBeenCalled();
      expect(resetHandler).not.toHaveBeenCalled();
    });
  });

});
