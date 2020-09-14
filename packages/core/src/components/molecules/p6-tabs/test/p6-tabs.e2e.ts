import { newE2EPage } from '@stencil/core/testing';

describe('p6-tabs', () => {
  const contentPage = `
  <p6-tabs selected="third">
    <div id="first" title="What is Lorem Ipsum?">1</div>
    <div id="second" title="Where does it come from?">2</div>
    <div id="third" title="Why do we use it?">3</div>
    <div id="fourth" title="Where can I get some?">4</div>
  </p6-tabs>
  `;

  it('tab-content should be 3', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);

    const element = await page.find('p6-tabs >>> .tab-content');

    expect(element.innerHTML).toBe('3');
  });

  it('third-tab should have class is-active', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);

    const element = await page.find('p6-tabs >>> #third-tab');

    expect(element).toHaveClass('is-active');
  });

  it('fire a click event', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);
    const tab = await page.find('p6-tabs >>> #second-tab');
    const clicKSpy = jest.spyOn(tab, 'click');
    expect(clicKSpy).toBeCalledTimes(0);
    await tab.click();
    expect(clicKSpy).toBeCalledTimes(1);
  });

  it('should change the active tab to second', async () => {
    const page = await newE2EPage();
    await page.setContent(contentPage);

    const tab = await page.find('p6-tabs >>> #second-tab');
    const tabContent = await page.find('p6-tabs >>> .tab-content');

    await tab.click();
    expect(tab).toHaveClass('is-active');
    expect(tabContent.innerHTML).toBe('2');
  });
});
