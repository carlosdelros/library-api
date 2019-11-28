const router = require('koa-router')()
const booksController = require('../controllers/books')

// Landing route for admins
// Could be used for a dashboard, landing page or something like that
router.get('/', ctx => ctx.body = { status: 'success', message: 'Welcome Admin'})

// Routes for book actions
router.post('/books', ctx => booksController.create(ctx))
router.delete('/books/:isbn', ctx => booksController.deleteBook(ctx))
router.get('/books/overdue', ctx => booksController.getOverdueBooks(ctx))

module.exports = router

