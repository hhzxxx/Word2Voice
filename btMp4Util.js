async function getBtMp4Key(browser, url) {
	const page = await browser.newPage()

	// 打开页面
	await page.goto(url, {
		waitUntil: 'networkidle0',
		timeout: 10000,
	})

	// 定义一个 Promise，用于等待特定的请求
	const requestPromise = new Promise((resolve) => {
		page.once('request', (request) => {
			if (request.method() === 'POST') {
				resolve(request)
			}
		})
	})

	// 在页面中执行点击操作
	await page.evaluate(() => {
		const searchButton = document.querySelector('button[type="submit"]')
		if (searchButton) {
			searchButton.click()
		} else {
			console.error('searchButton not found.')
		}
	})

	// 等待请求发起并获取请求内容
	const request = await requestPromise
	console.log('Request URL:', request.url())
	console.log('Request Post Data:', request.postData())

	await page.close()

	if (request.postData() && request.postData().split('&t=')[1]) {
		return request.postData().split('&t=')[1]
	}
	return ''
}

async function getBtMp4Doc(browser, url) {
	const page = await browser.newPage()

	// 打开页面
	await page.goto(url, {
		waitUntil: 'networkidle0',
		timeout: 10000,
	})

	const doc = await page.evaluate(() => {
		return document.querySelector('html').innerHTML
	})

	await page.close()

	return doc
}

module.exports = {
	getBtMp4Key,
	getBtMp4Doc,
}
