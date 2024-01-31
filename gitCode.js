// const puppeteer = require('puppeteer');

// (async () => {
//   // const browser = await puppeteer.launch({
//   //   headless: false , //'new',
//   //   executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
//   //   args: ['--remote-debugging-port=9222'],
//   // });
//   const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

//   // const browser = await puppeteer.connect({
//   //   browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
//   // });

//   const page = await browser.newPage();

//   // 打开页面
//   await page.goto('https://gitcode.net/weixin_43790191/efarm-tx/edit');

//   // 等待一段时间，确保页面加载完成
//   await new Promise(r => setTimeout(r, 5000));

//   // 点击 <a> 标签
//   await page.click('#js-project-advanced-settings .js-settings-toggle');

//   // 等待一段时间，确保页面加载完成
//   await new Promise(r => setTimeout(r, 2000));

//   await page.evaluate(() => {
//     const link = document.querySelector('a.btn.btn-default[data-method="post"][href="/weixin_43790191/efarm-tx/housekeeping"]');
//     if (link) {
//       link.click();
//     } else {
//       console.error('Link not found.');
//     }
//   });
 
//   // 等待一段时间，确保页面加载完成
//   await new Promise(r => setTimeout(r, 5000));

//   await page.close()
//   await browser.disconnect()
// })();

async function dealGitCode(browser) {
  const page = await browser.newPage();

  // 打开页面
  await page.goto('https://gitcode.net/weixin_43790191/efarm-tx/edit');

  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 5000));

  // 点击 <a> 标签
  await page.click('#js-project-advanced-settings .js-settings-toggle');

  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const link = document.querySelector('a.btn.btn-default[data-method="post"][href="/weixin_43790191/efarm-tx/housekeeping"]');
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
 
  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 5000));

  await page.close()
}

module.exports = {
  dealGitCode,
};
