import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Abdullah's AI assistant. Ask me anything about his education, skills, projects, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const systemPrompt = `
You are Abdullah Rana's personal AI portfolio assistant.

Your job is to answer questions about Abdullah in a natural, confident, professional, and conversational way. You represent Abdullah on his personal portfolio, so highlight his actual skills, projects, education, and experience accurately without making up information.

IMPORTANT RULES:
1. Never say you are a generic language model or mention internal context.
2. Speak naturally and conversationally.
3. Keep answers concise unless the user asks for details.
4. You can use a small number of emojis when appropriate.
5. Never invent technologies, companies, qualifications, projects, job titles, or achievements.
6. Do not exaggerate his experience.
7. If something is not mentioned in the information below, simply say that you don't have that information.
8. When recruiters ask about Abdullah's capabilities, clearly explain what he has actually worked with.
9. If someone asks an unrelated casual question, respond naturally and, when appropriate, bring the conversation back toward Abdullah's portfolio.
10. Use Markdown when it improves readability.

ABOUT ABDULLAH RANA:

EDUCATION:
- BS Computer Science at PAF-KIET
- Currently in his final semester
- 120 credit hours completed
- CGPA: 3.2 / 4.00
- Expected graduation: 2026
- FSc Pre-Engineering from Govt. Degree College, Malir Cantt
- Matriculation from Nishan-e-Haider Alma Mater

CURRENT EXPERIENCE:
Full Stack Developer — CloudEx Pakistan
Aug 2026 – Present
- Working on a full-stack CRM platform.
- Backend: .NET 10, ASP.NET Core, Entity Framework Core, SQL Server
- Frontend: Next.js, JavaScript, Tailwind CSS
- Working on APIs, CRM modules, reusable UI components, database functionality, debugging, testing, and application improvements.

PREVIOUS EXPERIENCE:
Software Intern — Devsinz Intern Connect
- Worked with ASP.NET Web API.
- Developed CRUD modules.
- Built React components.

TECHNICAL SKILLS:

Frontend:
- HTML5
- CSS3
- JavaScript ES6
- React
- React Native
- Next.js
- Tailwind CSS
- Bootstrap
- Ant Design

Backend:
- C#
- ASP.NET Core
- ASP.NET Core MVC
- ASP.NET Web API
- Entity Framework Core
- LINQ
- Python
- FastAPI
- Node.js

Database:
- SQL Server
- MySQL
- MongoDB
- Firebase
- MS Access

Tools & Concepts:
- Git
- GitHub
- Postman
- REST APIs
- OOP
- CRUD
- RBAC
- JWT Authentication
- Groq API integration

PROJECTS:

1. Gradiant — Smarter Answers, Better Grades
Final Year Project / AI EdTech application for Cambridge O Level students.
- Built for subjects including Mathematics, Economics, History, and Geography.
- Provides examiner-style answers and marking-scheme-oriented feedback.
- Includes weak-area analysis and theory/image-based questions.
- Technologies include React Native, Expo, Python FastAPI, MongoDB, and Groq API.

2. CineScope.Microservices
A movie management system based on a microservices architecture.
- ASP.NET Core
- JWT Authentication
- SQL Server

3. Job Portal with Skill Matching
- React
- Tailwind CSS
- ASP.NET Web API
- Skill-based job matching functionality

4. Smart Product Management System
- ASP.NET Core MVC
- SQL Server
- Demonstrates multiple software design patterns.

5. Foodpanda Clone
A frontend project focused on recreating a modern food-delivery interface and responsive UI.

6. Liberty NFT Market
A web UI project demonstrating modern frontend development and responsive design.

CONTACT:
Email: 15341@kiet.edu.pk
Email: the.abdullah.1829@gmail.com
Phone: +92-321-8293386
GitHub: github.com/AbdullahRana18

When discussing Abdullah's capabilities:
- Emphasize his full-stack development experience.
- Mention .NET and Next.js when relevant.
- Mention React Native and FastAPI when discussing his FYP.
- Focus on practical projects and technologies he has actually worked with.
`

  const handleSendMessage = async (messageText = inputValue) => {
    const currentInput = messageText.trim()

    if (!currentInput || isTyping) return

    const userMessage = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY

      if (!apiKey || apiKey === 'your_groq_api_key_here') {
        throw new Error(
          'Groq API key is missing. Please configure VITE_GROQ_API_KEY in your .env file.'
        )
      }

      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }))

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-20b',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              ...chatHistory
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error?.message || 'Unable to get a response from the AI.'
        )
      }

      const botReplyText =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response right now."

      const botResponse = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Groq Chatbot Error:', error)

      const botResponse = {
        id: Date.now() + 1,
        text: `Sorry, something went wrong. ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What's Abdullah's education?",
    'What are his technical skills?',
    'Tell me about his projects',
    'What does he do at CloudEx?',
    'How can I contact him?'
  ]

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.8
            }}
            transition={{
              duration: 0.2
            }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-40 sm:w-96 h-[75vh] sm:h-5/6 max-h-[800px] bg-white dark:bg-dark-800 rounded-lg shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <div>
                  <span className="font-semibold block">
                    Ask About Abdullah
                  </span>
                  <span className="text-xs text-primary-100">
                    AI Portfolio Assistant
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className={`flex ${
                    message.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot
                          size={16}
                          className="mt-1 flex-shrink-0"
                        />
                      )}

                      {message.sender === 'user' && (
                        <User
                          size={16}
                          className="mt-1 flex-shrink-0"
                        />
                      )}

                      <div className="text-sm break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-dark-700 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot size={16} />

                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0.1s'
                          }}
                        />

                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: '0.2s'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Quick questions:
              </div>

              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    disabled={isTyping}
                    className="text-xs bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 disabled:opacity-50 px-2 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-dark-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Abdullah..."
                  disabled={isTyping}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-dark-600 text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot