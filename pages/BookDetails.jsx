import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        //runs only after the first render
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getPageCountDesc(pageCount){
        if (pageCount > 500) return `Serious Reading (${pageCount})`
        if (pageCount > 200) return `Descent Reading (${pageCount})` 
        if (pageCount < 100) return `Light Reading (${pageCount})`
    }

    if (!book) return <div>Loading...</div>
    // if book data is still null (before the promise from loadBook() resolves), 
    // we show a simple message 
    //we first check if (!book) to avoid destructuring null or undefined.
    const { title, listPrice, thumbnail } = book

    return (
        <section className="book-details container">
            <pre>{JSON.stringify(book, null, 2)}</pre>
            {book.listPrice.isOnSale && <span>On Sale</span>}
            <BookPreview book={book}/>

            <p>{book.description}</p>
            <section>
                <h4>Authors</h4>
                <ul>{book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>
           <p>Published: {book.publishedDate}</p>
           <p>Page Count: {getPageCountDesc(book.pageCount)}</p>
           <p>Price: {book.listPrice.amount}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
