const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const path = require("path")


const databasePath = path.resolve("./source/db/database.json")
const adapter = new FileSync(databasePath)
const db = low(adapter)


// set defaults
db.defaults({
  users: [],
}).write()


module.exports = db