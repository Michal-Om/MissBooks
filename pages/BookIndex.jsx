import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookRating } from "../cmps/BookRating.jsx"
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
    const [cmpType, setCmpType] = useState('select') // controls which rating UI to show
    const [ratingValue, setRatingValue] = useState(3) // holds the rating value itself

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

    // console.log('ratingValue:', ratingValue, 'cmpType:', cmpType)

    return (
        <section className="book-index">
            <BookFilter
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
            />
            <section className="rating-type-selector">
                <h3>Choose Rating Method</h3>
                <label htmlFor="rate-select">Select</label>
                <input type="radio"
                    name="rating-type" id="rate-select"
                    value="select" checked={cmpType === 'select'}
                    onChange={(ev) => setCmpType(ev.target.value)} />

                <label htmlFor="rate-textbox">Textbox</label>
                <input type="radio"
                    name="rating-type" id="rate-textbox"
                    value="textbox" checked={cmpType === 'textbox'}
                    onChange={(ev) => setCmpType(ev.target.value)} />

                <label htmlFor="rate-stars">⭐Stars</label>
                <input type="radio"
                    name="rating-type" id="rate-stars"
                    value="stars" checked={cmpType === 'stars'}
                    onChange={(ev) => setCmpType(ev.target.value)} />
            </section>

            <section className="book-rating">
                <BookRating cmpType={cmpType}
                    value={ratingValue}
                    onSelect={setRatingValue}

                />
            </section>

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