const puppeteer = require('puppeteer');
const {dealCoding} = require("./coding");
const {dealGitCode} = require("./gitCode");
const {dealMayun} = require("./mayun");

let lastDealDate = '';
(async () => {
    const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

    while(true){
        console.log('start')
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        if(lastDealDate != `${year}-${month}-${day}`){
            console.log('dealdeal')
            await dealCoding(browser);
            await dealGitCode(browser);
            await dealMayun(browser);
            lastDealDate = `${year}-${month}-${day}`;
        }
        console.log('end')
        await new Promise(r => setTimeout(r, 5000));
    }
})();