const { connect } = require("puppeteer-real-browser");
const puppeteer = require('puppeteer');

async function modifyCookies (cookies1) {
  try {
    // 连接到现有浏览器实例
    const browserURL = 'http://192.168.2.130:19222'; // 浏览器的调试地址
    const browser = await puppeteer.connect({ browserURL });

    await browser.setCookie(...cookies1);
    await browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function autoLoginPoe2 () {
  try {
    const { browser, page } = await connect({
      headless: false,
      args: [],
      // headless: true,
      // args: ['--no-sandbox', '--disable-gpu'],
      customConfig: {},
      turnstile: true,
      connectOption: {
      },
      disableXvfb: false,
      ignoreAllFlags: false
    });

    // const page = await browser.newPage();
    await page.goto('https://www.pathofexile.com/login', { waitUntil: 'networkidle2' });

    let login = false;

    const checkAndLogin = async () => {
      const emailInput = await page.$('input[name="login_email"]');
      console.log(emailInput);
      if (emailInput && !login) {
        await page.type('input[name="login_email"]', '710421059@qq.com');
        await page.type('input[name="login_password"]', 'hhz987412365');
        await page.click('.sign-in__submit');
        login = true;
      }
      if (login) {
        const cookies = await page.cookies();
        console.log(cookies);
        await page.close();
        await browser.close();
        await modifyCookies(cookies);
      } else {
        setTimeout(checkAndLogin, 5000);
      }
    };

    await checkAndLogin();
  } catch (error) {
    console.error('Error during test:', error);
  }
}

module.exports = {
	autoLoginPoe2,
}