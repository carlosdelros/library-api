/**
 * Checkout Queries
 * Used by customers to get they check out status, create a new check out, return a book.
 */

const knex = require('../connection')

function getOverdue() {
    return knex.schema.raw(`
    SELECT books.isbn, books.title, checkouts.user_id, checkouts.due_date, checkouts.checkout_date
    FROM checkouts
    JOIN books
    ON books.isbn = checkouts.book_id
    WHERE date(checkouts.due_date) < date(current_timestamp())`).then(results => results[0])
}

function getUserOverdueBookCount(userId) {
    return knex.schema.raw(`
    SELECT count(checkouts.id) as count
    FROM checkouts
    WHERE date(checkouts.due_date) < date(current_timestamp()) and user_id = ${userId}`).then(results => results[0][0].count)
}

function getUserCheckedoutBookCount(userId) {
    return knex('checkouts')
    .where('return_date', null)
    .where('user_id', userId)
    .count('id as count')
    .then(results => results[0].count)
}

function addCheckout(isbn, userId) {
    let due_date = new Date()
    due_date.setDate(due_date.getDate() + 14)

    let checkout = {
        book_id: isbn,
        user_id: userId,
        checkout_date: knex.fn.now(),
        due_date: `${due_date.getFullYear()}-${due_date.getMonth()+1}-${due_date.getDate()}`
    }
    
    return knex('checkouts')
    .insert(checkout).then(res => {
        if (res.length) {
            return knex.schema.raw(`
            SELECT books.title, checkouts.*
            FROM checkouts
            JOIN books
            ON books.isbn = checkouts.book_id
            WHERE checkouts.id = ${res[0]}
            `).then(results => results[0][0])
        }
    })
}

function returnBook(isbn, userId) {
    return knex('checkouts')
    .where('user_id', userId)
    .where('book_id', isbn)
    .whereNull('return_date')
    .update({
        return_date: knex.fn.now()
    })
}

function getAllCheckedoutBooks(userId) {
    return knex('checkouts')
    .join('books', 'checkouts.book_id', '=', 'books.isbn')
    .where('checkouts.user_id', userId)
    .whereNull('checkouts.return_date')
    .select('books.title')
}

module.exports = {
    getOverdue,
    addCheckout,
    getUserOverdueBookCount,
    getUserCheckedoutBookCount,
    returnBook,
    getAllCheckedoutBooks
}