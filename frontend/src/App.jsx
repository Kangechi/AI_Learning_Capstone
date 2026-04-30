import {useState, useEffect} from 'react'
import './App.css'
import StoryList from './Storylist'
import StoryReader from './StoryReader'

function App()  {
  const [selectedStory, setSelectedStory] = useState(null)

  console.log("Selected Story is:", selectedStory)



  return (
    <div className='app'>
      {
        selectedStory === null ? (
      
      <StoryList onSelectStory={setSelectedStory}/>
    ): (
      <StoryReader 
      story={ setSelectedStory}
      onBack={() => setSelectedStory(null)}
      />
    )}

    </div>
  )

 
}
export default App