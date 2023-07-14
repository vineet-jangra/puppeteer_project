import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 1000
  });
  await page.goto('https://swap.defillama.com/');

  // Function that takes in a selector and click on it.
  const clickOn = async (selector) => {
    await page.click(selector);
  }
  // Function that takes in a selectora and focuses on it.
  const focusOn = async (selector) => {
    await page.focus(selector);
  }
  // Applying click action on "chain" field to open a dropdown.
  await clickOn('.css-tlfecz-indicatorContainer');

  // Getting the id of required element("Arbitrum One").
  const element = await page.$eval('.css-19gfrvq-menu', async (e) => {
     return `#${e.children[0].children[4].id}`;
  });
  // Applying click action on returned id 
  await clickOn(element);

  //Focusing on input text element, then clearing and inserting values to get required value.
  await focusOn('.css-lv0ed5');
  page.keyboard.press('Backspace');
  page.keyboard.type('2');
  
  // 1. Applying click action on both "select token" buttons
  // 2. Focusing on text input element.
  // 3. Entering the required text.
  // 4. Selecting that option.

  const elements = await page.$$('.css-qjhap');
  const names = ['wbtc', 'usdc'];

  const perform = async (element, name) => {
    const indexValue = (name === 'wbtc' ?  0 : 1);
    await element.click();
    await focusOn('.css-s1d1f4');
    await page.keyboard.type(name);
    await page.waitForTimeout(1000);
    const ele = await page.$$('.sc-b49748d5-3');
    await ele[indexValue].click();
  }
  for(let i = 0; i < elements.length; i++) {
    await perform(elements[i], names[i]);
  }

  // Selecting the second option from "Select a route to perform a swap" section.
  try {
    await page.waitForNetworkIdle({timeout: 30 * 1000});
    const newBar = await page.$$('.sc-18d0abec-0');
    await newBar[1].click();
  } catch (error) {
    console.log(error);
  }
})();