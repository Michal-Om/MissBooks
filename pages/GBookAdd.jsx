import { bookService  } from "../services/book.service.js";
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useNavigate } = ReactRouterDOM
const { useState } = React

export function GBookAdd(){
const [searchTerm, setSearchTerm] = useState('javascript')
const [gBooks, setGBooks] = useState(null)

function searchGoogle(){
    console.log(searchTerm);
    bookService.getBooksFromGoogle(searchTerm).then(setGBooks)
}

const navigate = useNavigate()

function onSelectBook({target}){
const bookId = target.value
const bookToModify = gBooks.find(book=> book.id === bookId)
const {id, ...book} = bookService.mapGoogleBookToAppBook(bookToModify) //destructure to remove id from obj.
//so that save(book) will call storageService.post(BOOK_KEY, book)
//which generates a new ID an adds the new book to storage

bookService.save(book).then(()=>{
    showSuccessMsg('Google book added')
    navigate('/book')
})
console.log(book);

}

    return(
        <section>
            <h1>Add Google Book</h1>
            <input type="text" name="searchTerm" 
            placeholder="Search Google Books"
            value={searchTerm} onChange={(ev)=> setSearchTerm(ev.target.value)}
            />
            <button onClick={searchGoogle}>Search</button>

            <label htmlFor="book-select"></label>
            {gBooks &&  <select onChange={onSelectBook} name="books" id="book-select">
                <option value="">Please choose an option</option>
                {gBooks.map(book=> <option key={book.id} value={book.id}>{book.volumeInfo.title}</option>)}

          
            </select>}
            
        </section>
    )
}

//ev.target	The element that triggered event
//ev.target.value 	The current value in the input
// the value isn’t on the event itself, it's on the element (target) that fired the event.