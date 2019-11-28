const checkoutValidator = require('../validators/checkout')
const bookQueries = require('../database/queries/books')
const checkoutQueries = require('../database/queries/checkout')

async function checkout(ctx) {
    // Validate input parameters for a new check out
    const { error, value: params } = checkoutValidator.checkoutBook.validate(ctx.request.body)
    
    // If an error is found with the input parameters return a 402 HTTP Status Code
    if (error) {
        console.log(error)
        ctx.status = 402;
        ctx.body = {status: 'error', message: error.details.map(detail => detail.message)};
        return ctx
    }

    try {
        // Gets count for overdue books for the user; Hardcoded to a userId 2, but in a real scenario the userId
        // would be obtained from the user session/JWT/etc.
        const userOverdueBookCount = await checkoutQueries.getUserOverdueBookCount(2)
        const userCheckedoutBookCount = await checkoutQueries.getUserCheckedoutBookCount(2)
        
        // If the user had overdue books OR more than 2 check out books, don't allow the check out of another book
        if (userOverdueBookCount || ( userCheckedoutBookCount > 2 )) {
            ctx.status = 405
            ctx.body = {
                status: 'error',
                message: 'This user is not allowed to checkout a book at the moment. '
            }
            return ctx
        }

        // Create a new checkout
        const res = await checkoutQueries.addCheckout(params.isbn, 2)
        ctx.status = 200
        ctx.body = {
            status: "success",
            checkout: {
                checkout_date: res.checkout_date, 
                due_date:res.due_date, 
                title: res.title 
            }
        }
    }catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
}

async function returnBook(ctx) {
    // Validate input parameters for a new check out
    const { error, value: params } = checkoutValidator.returnBook.validate(ctx.request.body)
    
    // If an error is found with the input parameters return a 402 HTTP Status Code
    if (error) {
        console.log(error)
        ctx.status = 402;
        ctx.body = {status: 'error', message: error.details.map(detail => detail.message)};
        return ctx
    }

    try {
        // Returns checked out book
        const res = await checkoutQueries.returnBook(params.isbn, 2)
        if (res == 1) {
            ctx.status = 200
            ctx.body = {status: "success"}
            return ctx
        }

        // If no book was returned respond with error
        ctx.status = 402;
        ctx.body = {status: 'error', message: `Can't return this book`};
        
    } catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
}

async function getAllCheckedoutBooks(ctx) {
    try {
        // Get all checked out books
        const res = await checkoutQueries.getAllCheckedoutBooks(2)
        ctx.status = 200
        ctx.body = {status: "success", checkedoutBooks: res}
    } catch(err) {
        console.log(err)
        ctx.status = 500;
        ctx.body = err.message;
    }
}

module.exports = {
    checkout,
    returnBook,
    getAllCheckedoutBooks
}