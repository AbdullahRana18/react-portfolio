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
      text: "Hi! I'm here to answer questions about Abdullah Rana's education and skills. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const knowledgeBase = {
    education: {
      keywords: ['education', 'degree', 'university', 'college', 'study', 'student', 'bscs', 'kiet', 'cgpa', 'semester'],
      response: "Abdullah is currently pursuing a Bachelor of Science in Computer Science (BSCS) at PAF KIET, Karachi. He's in his 6th semester with a CGPA of 3.2 and has completed 81.5 credit hours. He's expected to graduate in 2026. He also completed FSc Pre-Engineering from Govt. Degree College, Malir Cantt, and Matriculation from Nishan-e-Haider Alma Mater."
    },
    skills: {
      keywords: ['skills', 'technologies', 'programming', 'languages', 'frontend', 'backend', 'database', 'tools'],
      response: "Abdullah's technical skills include:\n\n**Frontend:** HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap, Ant Design\n**Backend:** C#, ASP.NET MVC, ASP.NET Core, Web API, Entity Framework\n**Database:** SQL Server, MS Access, Firebase\n**Tools:** Git/GitHub, Postman, VS Code, Visual Studio, OOP, REST APIs"
    },
    experience: {
      keywords: ['experience', 'work', 'internship', 'job', 'career', 'professional'],
      response: "Abdullah has 2 months of internship experience as a Software Intern at Devsinz Intern Connect. During this time, he built CRUD modules using ASP.NET Web API and SQL Server, developed React components with reusable hooks, and collaborated using Git and code reviews."
    },
    projects: {
      keywords: ['projects', 'portfolio', 'work', 'applications', 'built', 'developed'],
      response: "Abdullah has worked on several key projects:\n\n1. **Job Portal with Skill Matching** - React + Tailwind + ASP.NET Web API + SQL Server\n2. **Student Management System** - ASP.NET Core MVC + EF Core + SQL Server + Bootstrap\n3. **Foodpanda Clone** - Next.js + React + Tailwind\n\nYou can find more details about these projects in the Projects section of his portfolio."
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'location', 'reach', 'get in touch'],
      response: "You can contact Abdullah at:\n📧 Email: 15341@kiet.edu.pk\n📱 Phone: +92-321-8293386\n📍 Location: Karachi, Pakistan\n🔗 GitHub: github.com/AbdullahRana18\n💼 LinkedIn: linkedin.com/in/abdullah-rana-4326a1290"
    },
    general: {
      keywords: ['hello', 'hi', 'hey', 'who', 'what', 'about'],
      response: "Hello! I'm here to help you learn about Abdullah Rana's background, education, and technical skills. Feel free to ask me about his studies, programming languages, projects, or experience!"
    }
  }

  const findResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response
      }
    }
    
    return "I can help you with information about Abdullah's education, skills, experience, projects, or contact details. Could you be more specific about what you'd like to know?"
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: findResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What's Abdullah's education?",
    "What are his technical skills?",
    "Tell me about his projects",
    "How can I contact him?"
  ]

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed top-24 right-6 z-40 w-96 h-5/6 bg-white dark:bg-dark-800 rounded-lg shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Ask about Abdullah</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                      {message.sender === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                      <div className="text-sm whitespace-pre-line">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
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
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</div>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="text-xs bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 px-2 py-1 rounded-full transition-colors"
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
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Abdullah..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
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


