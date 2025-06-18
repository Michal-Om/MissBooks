const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    /* 
     function handleTxtChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, txt: value}))
     }
 
     function handleMinSpeedChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, minSpeed: +value}))
     }
    */

    const { txt, maxPrice } = filterByToEdit
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>

            <form>
                <label htmlFor="txt">Search any text</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="maxPrice">Max Price</label>
                <input onChange={handleChange} value={maxPrice || ''} name="maxPrice" id="maxPrice" type="number" />
            </form>
        </section>
    )
}