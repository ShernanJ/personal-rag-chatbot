import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Message {
  role: string,
  content: string
}

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<Message>>([])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return; // Empty Submission Prevention

    setMessages(prev => [...prev, {role: 'user', content: input }])

    try {
      const res = await axios.post('http://localhost:8000/cohere/test', {
        message: input
      })

      setMessages(prev => [...prev, {role: 'assistant', content: res.data.response }])
      setInput('')

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

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  return (
    <>
      <div className='chat-container'>
        <div className='chat-history'>
          {
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'Bot'}</strong>
                <p>{msg.content}</p>
              </div>
            ))
          }
        </div>
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
