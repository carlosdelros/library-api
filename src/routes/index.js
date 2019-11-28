const Router = require('koa-router')
const router = new Router()

// Middlewares used for authentication purposes
const adminMiddleware = require('../middlewares/admin')
const customerMiddleware = require('../middlewares/customer')

// Set a global route prefix
router.prefix(`/api/v1`)

// Landing route
// Could be used for a landing page or something like that.
// Mostly used for testing purposes that the service is up and running.
router.get('/', ctx => ctx.body = { status: 'success', message: 'Welcome to the Library Service' })

// Imports apply Admin routes 
const adminRoutes = require('./admin')
router.use('/admin', adminMiddleware, adminRoutes.routes())

// Imports and applies Checkout routes
const checkoutRoutes = require('./checkout')
router.use('/checkout', customerMiddleware, checkoutRoutes.routes())

module.exports = router