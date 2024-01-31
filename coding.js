async function dealCoding(browser) {
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
  // });

  const page = await browser.newPage();

  // 打开页面
  await page.goto('https://g-ydgl7873.coding.net/p/exilence/d/exilence-tx/git/settings/depot');

  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 20000));


  await page.evaluate(() => {
    const link = document.querySelector('#git-container .tc-button.t-button--theme-primary:not(.t-is-disabled)');
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
  await new Promise(r => setTimeout(r, 5000));
  await page.evaluate(() => {
    const link = document.querySelector('.ant-radio-wrapper:not(.ant-radio-wrapper-checked)');
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
  await new Promise(r => setTimeout(r, 5000));
  await page.evaluate(() => {
    const link = document.querySelector('.t-dialog__footer .t-button--theme-primary');
    if (link) {
      link.click();
    } else {
      console.error('Link not found.');
    }
  });
  // 等待一段时间，确保页面加载完成
  await new Promise(r => setTimeout(r, 5000));
  await page.close()
  // await browser.disconnect()
}

// (async () => {
//   // const browser = await puppeteer.launch({
//   //   headless: false , //'new',
//   //   executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
//   //   args: ['--remote-debugging-port=9222'],
//   // });
//   const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });


// })();

module.exports = {
  dealCoding,
};
