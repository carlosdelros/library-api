/**
 * Book Queries
 * In charge of everything related to a Book (Find, Create, Delete)
 * Used by Admin users to manage Books
 */

const knex = require ('../connection')

function find(isbn) {
    return knex('books')
    .where('isbn', isbn)
}

function createBook(book) {
    return knex('books')
    .insert(book)
}

function deleteBook(isbn) {
    return knex('books')
    .where('isbn', isbn)
    .del()
}

module.exports = {
    createBook,
    deleteBook,
    find
}