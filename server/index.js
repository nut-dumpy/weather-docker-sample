const { join } = require('path')
require('dotenv').config({
	path: join(__dirname, '.env')
})
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const Cache = require('./Cache')
const { getKey, lowerCase } = require('./util')

const access_key = process.env.ACCESS_KEY
if (!access_key)
	throw new Error('You need to acquire weatherstack API key to get weather data http://api.weatherstack.com');
const port = +process.env.PORT || 3000

const cache = new Cache()

const app = express()
const corsOptions = {
	origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

app.get('/weather', async (req, res) => {
	const { units, query } = req.query
	const params = {
		access_key,
		query: lowerCase(query),
		units: units || 'm'
	}
	// console.log(params, getKey(params))

	const data = await cache.request(getKey(params), async () => {
		const resp = await axios.get(
			`http://api.weatherstack.com/current`,
			{ params }
		)
		const data = resp.data

		// console.log(data)
		return data
	})

	res.json(data)
})

app.listen(port, () => console.info(`listening on http://localhost:${port}`))
