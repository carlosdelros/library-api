const fetch = require('node-fetch')
/**
 * Google Books API
 */

const apiKey = process.env.GOOGLE_BOOKS_API_KEY
const booksApiUrl =  process.env.GOOGLE_BOOKS_API_URL

// Gets a book from Google's Book API by ISBN
async function getBookByIsbn(isbn) {
    try {
        const response = await fetch(`${booksApiUrl}${isbn}`)
        const data = await response.json()
        
        return data.items[0].volumeInfo
    }catch(err) {
        console.log(err)
        return {}
    }
}

module.exports = {
    getBookByIsbn
}