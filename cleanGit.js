const puppeteer = require('puppeteer');
const { dealCoding } = require("./coding");
const { dealGitCode } = require("./gitCode");
const { dealMayun } = require("./mayun");

let lastDealDate = '';
(async () => {
    const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

    while (true) {
        // console.log('start')
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const hour = now.getHours();
        if (lastDealDate != `${year}-${month}-${day}-${hour}`) {
            console.log('dealdeal')
            try {
                await dealCoding(browser);
            } catch (e) {
                console.error(e)
            }
            try {
                await dealGitCode(browser);
            } catch (e) {
                console.error(e)
            }
            try {
                await dealMayun(browser);
            } catch (e) {
                console.error(e)
            }
            lastDealDate = `${year}-${month}-${day}-${hour}`;
        }
        // console.log('end')
        await new Promise(r => setTimeout(r, 5000));
    }
})();