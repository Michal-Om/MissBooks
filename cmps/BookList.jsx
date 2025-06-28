import { BookPreview } from "../cmps/BookPreview.jsx";

const { Link } =ReactRouterDOM

export function BookList({ books, onRemoveBook, onSelectBookId }) {
if(!books.length) return <div>No Books To Show...</div>

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
                        <Link to={`/book/${book.id}`}>
                        {/*sets the URL with the book id*/}
                            <button>Details</button>
                        </Link>
                        <Link to={`/book/edit/${book.id}`}>
                         <button>Edit</button>
                        </Link>
                       
                    </section>
                </li>
            )}

        </ul>
    )

}