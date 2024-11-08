import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Message {
  role: string,
  content: string
  isTyping?: boolean
}

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<Message>>([])
  const [isTyping, setIsTyping] = useState(false)

  const typeMessage = async (message: string) => {
    setIsTyping(true)
    let tempMessage = ''
    
    // Add a temporary message that will show the typing effect
    setMessages(prev => [...prev, { role: 'assistant', content: '', isTyping: true }])
    
    for (let i = 0; i < message.length; i++) {
      tempMessage += message[i]
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: tempMessage, isTyping: true }
      ])
      await new Promise(resolve => setTimeout(resolve, 25)) // Adjust speed here
    }
    
    // Replace the temporary message with the final one
    setMessages(prev => [
      ...prev.slice(0, -1),
      { role: 'assistant', content: message, isTyping: false }
    ])
    setIsTyping(false)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return; // Empty Submission Prevention

    setMessages(prev => [...prev, { role: 'user', content: input }])

    try {
      const res = await axios.post('http://localhost:8000/cohere/test', {
        message: input
      })
      setInput('')
      await typeMessage(res.data.response)
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
              <div key={index} className={`message ${msg.role} ${msg.isTyping ? 'typing' : ''}`}>
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
            placeholder={isTyping ? 'Please wait for response...' : 'Type your message...'}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={isTyping}
            className={isTyping ? 'typing' : ''}
          >
            {isTyping ? 'Bot is typing...' : 'Send'}
          </button>
        </form>
      </div>
    </>
  )
}

export default App
