import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from "../services/util.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    //this line is defining a React state variable called filterBy 
    // and initializing it with the result of bookService.getDefaultFilter().
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    //if it exists (or typed) in url you can see it in the input and filtered results (one way data binding)

    useEffect(() => {
        loadBooks()
        setSearchParams(getTruthyValues(filterBy)) //two-way data binding. whatever is typed in input filer is copied to the url
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                showSuccessMsg('Book was removed successfully!')
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem removing book')
            })
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
            />
            {/* <section className="container">
                        <Link to="/book/edit">Add</Link>
                    </section> */}

            <section>
                <Link to="add/google">
                    <button>Add Book</button>
                </Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )


}