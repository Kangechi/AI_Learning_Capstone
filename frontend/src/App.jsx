import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/stories")
    .then(response => response.json())
    .then(data => {
      setStories(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p> Loading Stories .....</p>
  return (
    <div>
      <h1>Choose a story</h1>
      {stories.map(story => (
        <p key={story.id}>{story.title}</p>
      ))}
    </div>
  )


}