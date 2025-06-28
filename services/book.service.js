import { loadFromStorage, makeId, makeLorem, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { gBooks } from '../data/gbooks.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook,
    getEmptyReview,
    addReview,
    removeReview,
    mapGoogleBookToAppBook,
    getBooksFromGoogle,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // console.log('books:', books);
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
                    || regExp.test(book.description)
                    || regExp.test(book.subtitle)
                    // || book.authors.includes(filterBy.txt) // only does exact matching
                    || book.authors.some(author => regExp.test(author))
                    || book.categories.some(category => regExp.test(category)) // .some() checks if at least one element in an array passes a test.
                )
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            return _setNextPrevBookId(book)
        })
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

function getEmptyBook() {
    //info goes into the edit inputs
     return {
        title: "",
        subtitle: utilService.makeLorem(4),
        authors: [
            authorsList[utilService.getRandomIntInclusive(0, authorsList.length - 1)]
        ],
        publishedDate: "",
        description: "",
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `BooksImages/${1}.jpg`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }

}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
        console.log('books', books)
    }

}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyReview() {
    return {
        id: makeId(),
        fullname: '',
        rating: '',
        readAt: ''
    }
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (!book.reviews) {
            book.reviews = [review]
        } else {
            book.reviews.push(review)
        }
        return save(book)
    })
        .catch(err => console.log('Failed to add review:', err))
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const reviews = book.reviews
        const updatedReviews = reviews.filter((review) => reviewId !== review.id)
        book.reviews = updatedReviews
        return save(book)
    })
        .catch(err => console.log('Failed to remove review:', err))
}

function mapGoogleBookToAppBook(googleBook){
const info = googleBook.volumeInfo

    return {
        id: googleBook.id || utilService.makeId(),
        title: info.title || 'Untitled',
        subtitle: info.subtitle || utilService.makeLorem(4),
        authors: info.authors,
        publishedDate: info.publishedDate || '',
        description: info.description || utilService.makeLorem(20),
        pageCount: info.pageCount || utilService.getRandomIntInclusive(20, 600),
        categories: info.categories,
        thumbnail: (info.imageLinks && info.imageLinks.thumbnail) ? info.imageLinks.thumbnail : `BooksImages/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: info.language || 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
}

function getBooksFromGoogle(searchTerm){
    return Promise.resolve(gBooks.items) // used for mock data during testing. 
    // temporarily replaces fetch and .then()
    //This way the rest of the app, which is expecting a promise, continues to work the same.
    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
    .then(res => res.json())
    .then(res=> res.items)
}