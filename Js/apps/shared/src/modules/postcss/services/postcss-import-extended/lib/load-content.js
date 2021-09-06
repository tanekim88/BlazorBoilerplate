"use strict"

const readCache = require("read-cache")

export default  filename => readCache(filename, "utf-8")
