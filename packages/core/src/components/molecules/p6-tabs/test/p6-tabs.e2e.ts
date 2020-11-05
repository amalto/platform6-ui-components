import { newE2EPage } from '@stencil/core/testing';

describe('p6-tabs', () => {
  const contentPage = `
  <p6-tabs selected="third">
    <p6-tab id="first" title="What is Lorem Ipsum?">1</p6-tab>
    <p6-tab id="second" title="Where does it come from?">2</p6-tab>
    <p6-tab id="third" title="Why do we use it?">3</p6-tab>
    <p6-tab id="fourth" title="Where can I get some?">4</p6-tab>
  </p6-tabs>
  `;

  it('fire a click event', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);
    const tab = await page.find('p6-tabs >>> a[href="#second"]');
    const clicKSpy = jest.spyOn(tab, 'click');
    expect(clicKSpy).toBeCalledTimes(0);
    await tab.click();
    expect(clicKSpy).toBeCalledTimes(1);
  });

  it('should change the active tab to second', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);

    const tab = await page.find('p6-tabs >>> a[href="#second"]');

    await tab.click();

    const tabContent = await page.find('p6-tabs p6-tab[active=""]');
    expect(tabContent.innerHTML).toBe('2');
  });
});
