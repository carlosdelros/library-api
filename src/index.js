/**
 * App Server
 */

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const PORT = process.env.APP_PORT || 8000
require('dotenv').config()

app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = server