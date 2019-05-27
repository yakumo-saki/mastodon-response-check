const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const DEBUG = process.env.DEBUG == true;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1024, height: 768});

  await page.goto('https://maoh.company/auth/sign_in', {waitUntil: "domcontentloaded"});
  
  await page.screenshot({path: 'screenshots/login1.png'});

  await page.type('#user_email', username);
  await page.type('#user_password', password);

  await page.screenshot({path: 'screenshots/login2.png'});

  await Promise.all([
    page.click("button[type=submit]"),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  await page.screenshot({path: 'screenshots/finish.png'});

  await browser.close();
})();
