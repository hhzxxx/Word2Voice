const puppeteer = require('puppeteer')
const { dealCoding } = require('./coding')
const { dealGitCode } = require('./gitCode')
const { dealMayun } = require('./mayun')
const { getBtMp4Key } = require('./btMp4Util')
const express = require('express')
const bodyParser = require('body-parser')


let lastDealDate = ''
;(async () => {
	const browser = await puppeteer.connect({
		browserURL: 'http://192.168.2.120:19222',
	})

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
	// }, 5000)


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
    const key = await getBtMp4Key(browser)

		res.send(key)
	})

	// 启动服务器，监听指定端口
	app.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`)
	})

	// while (true) {
	//     // console.log('start')
	//     const now = new Date();
	//     const year = now.getFullYear();
	//     const month = now.getMonth();
	//     const day = now.getDate();
	//     const hour = now.getHours();
	//     if (lastDealDate != `${year}-${month}-${day}-${hour}`) {
	//         console.log('dealdeal')
	//         await dealCoding(browser);
	//         await dealMayun(browser);
	//         // await dealGitCode(browser);
	//         lastDealDate = `${year}-${month}-${day}-${hour}`;
	//     }
	//     // console.log('end')
	//     await new Promise(r => setTimeout(r, 5000));
	// }
})()
