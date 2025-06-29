const { useState } = React

export function BookRating({ cmpType, value, onSelect }) {

    function RateBySelect({ val, onRatingSelect }) {

        function handleChange(ev) {
            const selectedVal = +ev.target.value
            onRatingSelect(selectedVal)
        }

        return (
            <select value={val} onChange={handleChange}>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
            </select>
        )
    }

    function RateByTextbox({ val, onRatingSelect }) {
        function handleChange(ev) {
            let selectedVal = ev.target.value === '' ? '' : +ev.target.value
            if (selectedVal > 5) selectedVal = 5
            if (selectedVal < 1) selectedVal = 1
            onRatingSelect(selectedVal)
        }

        return (
            <input type="number"
                min="1" max="5"
                value={val}
                onChange={handleChange} />
        )
    }

    function RateByStars({ val, onRatingSelect }) {
 
        let starNums = [1, 2, 3, 4, 5]

        return (
                starNums.map(starNum => (
                    <span 
                    key={starNum} //like in list
                    onClick={()=>{
                        onRatingSelect(starNum)
                    }}
                    style={{cursor: 'pointer', fontSize: '1.5em', color: starNum <= val ? 'gold' : 'lightgray'}}
                    >★</span>
                ))
        
        )
    }

    function DynamicCmp({ cmpType }) {
        const dynamicCmpsMap = {
            select: <RateBySelect val={value} onRatingSelect={onSelect} />,
            textbox: <RateByTextbox val={value} onRatingSelect={onSelect} />,
            stars: <RateByStars val={value} onRatingSelect={onSelect} />
        }
        return dynamicCmpsMap[cmpType]
    }

    return (
        <section className="book-rating">
            <DynamicCmp cmpType={cmpType} />
        </section>
    )
}
