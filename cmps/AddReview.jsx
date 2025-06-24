import { bookService } from "../services/book.service.js";

const { useState } = React


export function AddReview({onAddReview}){
    const [review, setReview] = useState(bookService.getEmptyReview())

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
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    return (
         <section>
                <h3>Add a Review</h3>
            
                <form className="review"
                onSubmit={(ev) => {
                    ev.preventDefault()
                 onAddReview(review)
                 setReview(bookService.getEmptyReview())
                 }}>
                    <label htmlFor="fullname">Full Name:</label>
                    <input value={review.fullname} type="text" onChange={handleChange} placeholder="Enter your full name" id="fullname" name="fullname"></input>

                    <label htmlFor="rating">Rating:</label>
                    <input value={review.rating} type="number" onChange={handleChange} placeholder="Rate the book 1-5" id="rating" name="rating"></input>

                    <label htmlFor="readAt">Read At:</label>
                    <input value={review.readAt} type="date" onChange={handleChange} id="readAt" name="readAt"></input>

                    <button type="submit">Save Your Review</button>
                </form>

            </section>
    )

}