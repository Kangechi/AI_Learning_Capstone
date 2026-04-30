import { useState, useEffect } from "react"

function StoryList({onSelectStory}) {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8001/stories')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch stories')
            return response.json()
        })
        .then(data => {
            setStories(data)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setLoading(false)
        })
    }, [])

    if (loading) return <p className="status"> Loading Stories....</p>
    if (error) return <p className="status_error"> Error: {error}</p>

    return (
        <div className="story-list">
            <h1>Choose a Story</h1>
          {stories.map(story => (
            <div
            key={story.id}
            className="story-card"
            onClick={() => onSelectStory(story)}
            >
                <h2>{story.title}</h2>
            </div>
          ))}
        </div>
    )
}
export default StoryList