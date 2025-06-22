import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()  // Get the navigate function
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('Cannot get car:', err))

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        console.log('Saving...')
        //when clicking "Save," the app will save the book 
        // and then redirect the user to the /book page.
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book') //Change the current URL to /book.
            })
            .catch(err => console.log('Cannot save book:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => {
            if (field === 'amount') {
                // Update the nested listPrice.amount
                return {
                    ...prevBook, // copy the whole book object
                    listPrice: {
                        ...prevBook.listPrice, // copy everything in listPrice
                        amount: value   // update just the amount
                    }
                }
            } else {
                return { ...prevBook, [field]: value }
            }
        })
    }

    const { title, listPrice, thumbnail } = bookToEdit // show details in the inputs
    const { amount } = listPrice
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price</label>
                <input onChange={handleChange} value={amount || ''} type="number" name="amount" id="amount" />

                <button>Save</button>

            </form>

        </section>
    )
}