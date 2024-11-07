import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [input, setInput] = useState('')

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await axios.post('/cohere/test', {
        message:input
      })
      setInput('')
  
      console.log(res.data)
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }


  return (
    <>
      <div className='chat-container'>
        <form onSubmit={handleSubmit}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Type your message...'
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  )
}

export default App
