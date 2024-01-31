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
//   await page.goto('https://gitee.com/hhzxxx/exilence-next-tx-release/settings');

//   // 等待一段时间，确保页面加载完成
//   await new Promise(r => setTimeout(r, 5000));


//   await page.evaluate(() => {
//     const link = document.querySelectorAll('div [data-tooltip]')[1];
//     if (link) {
//       link.click();
//     } else {
//       console.error('Link not found.');
//     }
//   });
//   await new Promise(r => setTimeout(r, 2000));
//   await page.evaluate(() => {
//     const link = document.querySelectorAll('.ui.orange.button.btn-execute-gc')[0];
//     if (link) {
//       link.click();
//     } else {
//       console.error('Link not found.');
//     }
//   });
//   await new Promise(r => setTimeout(r, 2000));
//   await page.evaluate(() => {
//     const link = document.querySelectorAll('.gitee-modal.active .ui.orange.approve.button')[0];
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

async function dealMayun(browser) {
  const page = await browser.newPage();

  // 打开页面
  await page.goto('https://gitee.com/hhzxxx/exilence-next-tx-release/settings');

  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 5000));


  await page.evaluate(() => {
    const link = document.querySelectorAll('div [data-tooltip]')[1];
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    const link = document.querySelectorAll('.ui.orange.button.btn-execute-gc')[0];
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    const link = document.querySelectorAll('.gitee-modal.active .ui.orange.approve.button')[0];
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
  dealMayun,
};
