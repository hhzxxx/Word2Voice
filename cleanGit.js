const puppeteer = require('puppeteer')
const { dealCoding } = require('./coding')
const { dealGitCode } = require('./gitCode')
const { dealMayun } = require('./mayun')
const { autoLoginPoe2 } = require('./gjf')
const { getBtMp4Key,getBtMp4Doc } = require('./btMp4Util')
const express = require('express')
const bodyParser = require('body-parser')


let lastDealDate = ''
let lastLogin = 0
;(async () => {
	const browser = await puppeteer.connect({
		browserURL: 'http://192.168.2.120:19222',
	})
  // const browser = await puppeteer.launch();

	// setInterval(async () => {
	// 	const now = new Date()
	// 	const year = now.getFullYear()
	// 	const month = now.getMonth()
	// 	const day = now.getDate()
	// 	const hour = now.getHours()
	// 	if (lastDealDate != `${year}-${month}-${day}-${hour}`) {
	// 		console.log('dealdeal')
	// 		await dealCoding(browser)
	// 		await dealMayun(browser)
	// 		// await dealGitCode(browser);
	// 		lastDealDate = `${year}-${month}-${day}-${hour}`
	// 	}
	// }, 10 * 60 * 1000)


	// 创建 Express 应用
	const app = express()
	const port = 9306

	// 使用 body-parser 中间件来解析 POST 请求的参数
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.use(bodyParser.json({ limit: '10mb' }))
	app.use((req, res, next) => {
		const ip =
			req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
		req.clientIp = ip
		next()
	})

	app.get('/getMp4Key', async (req, res) => {
    const url = req.query.url
    const keyword = req.query.keyword
    const key = await getBtMp4Key(browser,url,keyword)
		res.send(key)
	})

  app.get('/getBtMp4Doc', async (req, res) => {
    const url = req.query.url
    const doc = await getBtMp4Doc(browser,url)
		res.send(doc)
	})

	// 启动服务器，监听指定端口
	app.listen(port,'0.0.0.0', () => {
		console.log(`Server is running at http://localhost:${port}`)
	})

	while (true) {
	    // console.log('start')
	    const now = new Date();
	    const year = now.getFullYear();
	    const month = now.getMonth();
	    const day = now.getDate();
	    const hour = now.getHours();
	    if (lastDealDate != `${year}-${month}-${day}-${hour}`) {
	        console.log('dealdeal')
	        await dealCoding(browser);
	        await dealMayun(browser);
	        // await dealGitCode(browser);
	        lastDealDate = `${year}-${month}-${day}-${hour}`;
	    }
      // if(Date.now() - lastLogin > 1000 * 60 * 10){
      //   await autoLoginPoe2(browser);
      //   lastLogin = Date.now();
      // }
	    // console.log('end')
	    await new Promise(r => setTimeout(r, 5000));
	}
})()
