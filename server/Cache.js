const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { join } = require('path')

const cachePath = join(__dirname, 'cache', 'weather.json')

class Cache {
	constructor() {
		const adapter = new FileSync(cachePath)
		const db = low(adapter)
		db.defaults({ storage: [] }).write()

		const now = Date.now()
		db.get('storage').remove((entry) => entry.stored < now - 36 * 36e5).write()

		this.db = db
	}
	async request(key, grabber) {
		const existingResource = this.db.get('storage').find({ key }).value()

		if (existingResource)
			return existingResource

		const data = await grabber(key)
		const stored = Date.now()
		this.db.get('storage').push({ key, stored, ...data }).write()
		return data
	}
}

module.exports = Cache
