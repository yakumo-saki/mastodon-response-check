const puppeteer = require('puppeteer');

const login_url = process.env.LOGIN_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const DEBUG = process.env.DEBUG == true;

// console.log(username, password, DEBUG);


(async () => {
  const browser = await puppeteer.launch();

  const start_ms = new Date().getTime();

  const page = await browser.newPage();
  page.setViewport({width: 1024, height: 768});

  var exec = require('child_process').exec;
  await exec('rm ./screenshots/*.png');

  try {
    await page.goto(login_url, {waitUntil: "networkidle2"});
    
    await page.screenshot({path: './screenshots/login1.png'});

    await page.type('#user_email', username);
    await page.type('#user_password', password);

    await page.screenshot({path: './screenshots/finish1.png'});
    await page.click("button[type=submit]", {waitUntil: "networkidle2"});

    await new Promise(r => setTimeout(r, 500));

    var ss_count = 1;
    var loaded = false;
    while (loaded == false) {
      console.error("wait loop " + ss_count);

      await page.screenshot({path: './screenshots/wait' + ss_count + '.png'});
      if (await page.$("div.status") !== null) {
        console.error("found!");
        loaded = true;
      }

      ss_count++;

      if (ss_count > 30) {
        console.error("give up.");
        loaded = true;
      } else {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    const end_ms = new Date().getTime() - start_ms;
    console.log(end_ms);
    console.error("response time is " + end_ms + "ms");
  } finally {
    await browser.close();
  }

})();
