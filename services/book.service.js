import { loadFromStorage, makeId, makeLorem, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
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
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
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

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Gwent', 300, 0),
            _createBook('Between Here and Gone', 120, 1),
            _createBook('Magic Lantern', 50, 2),
            _createBook('It\'s\ Just a Dog', 150, 3)
        ]
        saveToStorage(BOOK_KEY, books)
    }
}


function _createBook(title, amount, i) {
    return {
        id: makeId(),
        title,
        description: makeLorem(20),
        // thumbnail: `http://ca.org/books-photos/${i + 1}.jpg`,
        thumbnail:   `./img/${i + 1}.jpg`,
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: false,
        },
    }
}
