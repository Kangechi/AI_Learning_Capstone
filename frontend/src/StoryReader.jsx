import { useState, useEffect } from "react"

function StoryReader({story, onBack}) {
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [ error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8001/stories/${story.id}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch story')
            return response.json()
        })
        .then(data => {
            setPages(data.pages)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setLoading(false)
        })
    }, [story.id])

    if (loading) return <p className="status">Loading Stories....</p>
    if (error) return <p className=" status-error">Error: {error}</p>
    if (pages.length === 0) return <p className="status"> No pages Found</p>
    // Add this right after your state declarations
    if (!story || !story.id) { return <p className="status">Loading...</p>
}
    
    const page = pages[currentPage]
    const isFirst = currentPage === 0
    const isLast = currentPage === pages.length - 1

    return (
        <div className="Story_reader">

            <button className="back-btn" onClick={onBack}> ← All Stories</button>
            <h1 className="story-title"> {story.title}</h1>
            <div
            className="page-indicator">
                Page {currentPage + 1} of {pages.length}
            </div>
            <div className="page-content">
                <p>{page.content}</p>
            </div>
            <div className="nav-btns">
                <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={isFirst}
            className="nav-btn"
            >
            ← Previous
            </button>

            <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLast}
            className="nav-btn"
            >
            Next →
            </button>
            </div>


        </div>

    )
}

export default StoryReader