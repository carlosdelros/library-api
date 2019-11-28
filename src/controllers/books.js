const booksValidator = require('../validators/books')
const booksQueries = require('../database/queries/books')
const checkoutQueries = require('../database/queries/checkout')
const booksApi = require('../services/booksApi')

async function create(ctx) {
    // Validate input parameters for a new book
    const { error, value: params } = booksValidator.createBook.validate(ctx.request.body)

    // If an error is found with the input parameters return a 402 HTTP Status Code
    if (error) {
        console.log(error)
        ctx.status = 402;
        ctx.body = {status: 'error', message: error.details.map(detail => detail.message)};
        return ctx
    }
    
    try {
        // Searches book by ISBN using Google's Book API
        const bookInfo = await booksApi.getBookByIsbn(params.isbn)

        // Structures data to be inserted in DB
        const book = {
            isbn: getIsbn(bookInfo.industryIdentifiers),
            title: bookInfo.title,
            authors: getAuthors(bookInfo.authors),
            page_count: bookInfo.pageCount || null,
            year_published: getYearPublished(bookInfo.publishedDate),
            publisher: bookInfo.publisher || null,
            inventory: params.inventory || 0
        }

        // Inserts in DB
        res = await booksQueries.createBook(book)
        ctx.status = 201;
        ctx.body = {status: 'success', message: 'book created'}
    } catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
}

async function deleteBook(ctx) {
    // Validate input parameters for deleting a book
    const { error, value: params } = booksValidator.deleteBook.validate(ctx.params)

    // If an error is found with the input parameters return a 402 HTTP Status Code
    if (error) {
        ctx.status = 402;
        ctx.body = {status: 'error', message: error.details.map(detail => detail.message)};
        return ctx
    }
    
    try {
        // Calls query to delete the specified book by ISBN
        res = await booksQueries.deleteBook(params.isbn)
        ctx.status = 200;
        ctx.body = {status: 'success', message: 'book deleted'}
    } catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
    
}

async function getOverdueBooks(ctx) {
    try {
        const overdues = await checkoutQueries.getOverdue()
        
        ctx.status = 200;
        ctx.body = {status: 'success', overdue: overdues}
    } catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
}

// Returns the 13-digit ISBN; if doesn't exist return the 10-digit one
function getIsbn(isbnsList) {
    let isbnsObj = {}
    isbnsList.map(isbn => {
        isbnsObj[isbn.type] = isbn.identifier
    })
    
    return isbnsObj.ISBN_13 || isbnsObj.ISBN_10
}

// Joins author's array returned by Google Book's API into one single string
function getAuthors(authors) {
    return authors.join()
}

function getYearPublished(date) {
    return new Date(date).getFullYear()
}


module.exports = {
    create,
    deleteBook,
    getOverdueBooks
}