import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.price >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '', imgNum = null) {
    return { title, price, imgNum }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Gwent', 300, 1),
            _createBook('Between Here and Gone', 120, 2),
            _createBook('Magic Lantern', 50, 3),
            _createBook('It\'s\ Just a Dog', 150, 4)
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 250, imgNum) {
    const book = getEmptyBook(title, price)
    book.id = makeId()
    book.imgNum = imgNum
    return book
}

// {
// "id": "OXeMG8wNskc",
// "title": "metus hendrerit",
// "description": "placerat nisi sodales suscipit tellus",
// "thumbnail": "http://ca.org/books-photos/20.jpg",
// "listPrice": {
// "amount": 109,
// "currencyCode": "EUR",
// "isOnSale": false
// }
// }