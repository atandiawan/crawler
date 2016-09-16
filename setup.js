"use strict"

let sqlite = require('sqlite3').verbose()
let file = "db/barang.db"
let db = new sqlite.Database(file)
