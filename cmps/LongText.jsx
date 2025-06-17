const { useState } = React

export function LongText({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <p>
            {isExpanded ? txt : txt.slice(0, length)}
            {txt.length > length &&
                (
                <span className="text-expand" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? ' show less...' : ' show more...'}
                    </span>
                )}
        </p>
    )

}