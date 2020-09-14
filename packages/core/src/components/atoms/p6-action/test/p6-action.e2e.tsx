import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('p6-action', () => {
  let page: E2EPage;
  let component: E2EElement;
  let actionButton: E2EElement;

  it('renders', async () => {
    page = await newE2EPage({ html: '<p6-action></p6-action>' });
    component = await page.find('p6-action');
    expect(component).toHaveClass('hydrated');
  });

  describe('on click', () => {
    beforeEach(async () => {
      page = await newE2EPage({ html: '<p6-action></p6-action>' });
      component = await page.find('p6-action');
      actionButton = await page.find('p6-action');
    });

    it('fires a click event', async () => {
      const clickHandler = await page.spyOnEvent('click', 'document');

      expect(clickHandler.events.length).toEqual(0);
      await actionButton.click();
      expect(clickHandler.events.length).toEqual(1);
    });

    it('can call its onClick callback', async () => {
      const clickHandler = jest.fn();
      await page.exposeFunction('clickHandler', clickHandler);

      await page.$eval('p6-action', (elm: Element) => {
        // eslint-disable-next-line no-param-reassign
        (elm as HTMLP6ActionElement).onclick = clickHandler;
      });

      await page.waitForChanges();

      expect(clickHandler).not.toHaveBeenCalled();
      await actionButton.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('should not fires a click event when disabled', async () => {
      page = await newE2EPage({ html: '<p6-action disabled></p6-action>' });
      actionButton = await page.find('p6-action');
      const clickHandler = await page.spyOnEvent('click', 'document');

      expect(clickHandler.events.length).toEqual(0);
      await actionButton.click();
      expect(clickHandler.events.length).toEqual(0);
    });

    it('should not call its onClick callback when disabled', async () => {
      const clickHandler = jest.fn();
      page = await newE2EPage({ html: '<p6-action disabled></p6-action>' });
      actionButton = await page.find('p6-action');
      await page.exposeFunction('clickHandler', clickHandler);

      await page.$eval('p6-action', (elm: Element) => {
        // eslint-disable-next-line no-param-reassign
        (elm as HTMLP6ActionElement).onclick = clickHandler;
      });

      await page.waitForChanges();

      expect(clickHandler).not.toHaveBeenCalled();
      await actionButton.click();
      expect(clickHandler).not.toHaveBeenCalledTimes(1);
    });
  });
});
