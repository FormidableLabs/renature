const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/open-source/renature/');
  await page.screenshot({
    path: `test/screenshots/index.png`,
    type: 'png',
  });
  await page.click(`[href="/open-source/renature/docs"]`);
  await page.waitFor(3000);
  await page.screenshot({
    path: `test/screenshots/docs.png`,
    type: 'png',
  });
  const article = await page.waitForSelector('article');
  if (!article) {
    throw new Error(`Docs route did not render as expected!`);
  }
  await browser.close();
})();
