const router = require('koa-router')()
const checkoutController = require('../controllers/checkout')

// Landing route for check outs 
// Could be used for a dashboard landing page or something like that
router.get('/', ctx => ctx.body = { status: 'success', message: 'Welcome Customer'})

// Routes for checkout actions
router.post('/', ctx => checkoutController.checkout(ctx))
router.post('/return', ctx => checkoutController.returnBook(ctx))
router.get('/checkouts', ctx => checkoutController.getAllCheckedoutBooks(ctx))

module.exports = router


