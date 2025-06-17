import { BookPreview } from "../cmps/BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    {/*render BookPreview cmp, passing curr book obj as a prop for display*/}
                    <section>
                        <button onClick={() => onRemoveBook(book.id)} >
                            Remove
                        </button>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                    </section>
                </li>
            )}

        </ul>
    )

}