export function BookPreview({ book }) {

    const { title, price, imgNum } = book
    // console.log('imgNum:', imgNum)
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Price: {price}</h4>
            <img src={`./img/${imgNum}.jpg`} alt="Book Image" />
        </article>
    )
}