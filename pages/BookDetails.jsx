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

    if (!book) return <div>Loading...</div>
    // if book data is still null (before the promise from loadBook() resolves), 
    // we show a simple message 
    //we first check if (!book) to avoid destructuring null or undefined.
    const { title, listPrice, thumbnail } = book

    return (
        <section className="book-details container">
            <h1>Book Title: {title}</h1>
            <h1>Price: {listPrice.amount}</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            <img src={thumbnail} alt="Book Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}
