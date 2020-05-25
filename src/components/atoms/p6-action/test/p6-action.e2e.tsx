import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('P6-action', () => {
  let page: E2EPage;
  let component: E2EElement;
  let innerButton: any;

  it('renders', async () => {
    page = await newE2EPage({html: '<P6-action></P6-action>'});
    component = await page.find('P6-action')
    expect(component).toHaveClass('hydrated');
  });

  describe('on click', () => {
    beforeEach(async () => {
      page = await newE2EPage({html: '<P6-action></P6-action>'});
      component = await page.find('P6-action')
      innerButton = await page.find('P6-action >>> button');
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
      
      await page.$eval("P6-action", (elm: HTMLElement) => {
        elm.onclick = this.clickHandler;
      });
  
      await page.waitForChanges();
  
      expect(clickHandler).not.toHaveBeenCalled();
      await innerButton.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
