import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useParams, Link, useNavigate } = ReactRouterDOM //hook
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams() // defined as a function in React Router 
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId) //gets the bookId from the URL via params 
            // and fetches that book’s data from the service
            .then(book => {
                // console.log('book:', book)
                setBook(book) //stores the relevant book in state
            })

            .catch(err => {
                console.log('Cannot get car:', err)
            })
    }

    // function onBack() {
    //     navigate('/book')
    //     //or
    //     navigate(-1)
    // }

    function getPageCountDesc(pageCount) {
        if (pageCount > 500) return `Serious Reading (${pageCount})`
        if (pageCount > 200) return `Descent Reading (${pageCount})`
        if (pageCount < 100) return `Light Reading (${pageCount})`
    }

    function getBookAgeCategory(publishedDate) {
        const bookAge = new Date().getFullYear() - publishedDate
        if (bookAge > 10) return `${publishedDate} (Vintage)`
        else return `${publishedDate} (New)`
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
    }

    function onAddReview(review) {
        bookService.addReview(bookId, review)
            .then((updatedBook) => {
                setBook(updatedBook)
                showSuccessMsg('Review was added successfully')
            })
    }

    function onRemoveReview(bookId, reviewIdx) {
        bookService.removeReview(bookId, reviewIdx)
            .then((updatedBook) => setBook(updatedBook))
            .catch(err => console.log('Failed to remove review:', err)
            )
    }

    if (!book) return <div>Loading...</div>
    // if book data is still null (before the promise from loadBook() resolves), 
    // we show a simple message 
    //we first check if (!book) to avoid destructuring null or undefined.

    // const { title, listPrice, thumbnail } = book
    //here we will not destructure but use book. for each prop for better orientation

    return (
        <section className="book-details container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
            {book.listPrice.isOnSale && <span>On Sale</span>}
            <BookPreview book={book} />
            <LongText txt={book.description} />
            <section>

                <h4>Authors</h4>
                <ul>{book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>
            <p>Published: {getBookAgeCategory(book.publishedDate)}</p>
            <p>Category: {book.categories ? book.categories.join(', ') : 'No Categories'}</p>
            <p>Page Count: {getPageCountDesc(book.pageCount)}</p>
            <p>Price:
                <span className={`book-price ${getPriceClass(book.listPrice.amount)}`}>{book.listPrice.amount}</span>
            </p>
            <section>
                <h3>Reviews</h3>
                {book.reviews ? <ul>
                    {book.reviews.map((review, idx) => <li key={idx}>
                        <p>{review.fullname}</p>
                        <p>{review.rating}</p>
                        <p>{review.readAt}</p>
                        <button onClick={() =>onRemoveReview(book.id, idx)}>Delete</button>
                    </li>)}
                </ul> : 'No reviews yet'}
            </section>
            <AddReview bookId={bookId} onAddReview={onAddReview} />

            <Link to="/book"><button >Back</button></Link>
            {/*if another action has to be done before routing back we would need an onBack function =>*/}
            {/* <button onClick={onBack}>Back</button> */}

            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}
