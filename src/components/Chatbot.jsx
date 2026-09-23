import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  X,
  Send,
  Bot,
  RotateCcw,
  GraduationCap,
  Code2,
  Briefcase,
  Mail,
  ChevronRight
} from 'lucide-react'
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

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hi! I'm Abdullah's AI assistant. Ask me anything about his education, skills, projects, or experience!",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

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
10. CRITICAL FORMATTING: When listing technical skills, projects, or education, ALWAYS use structured bullet points grouped with bold headings (e.g. - **Frontend:** React, Next.js...). NEVER format lists into markdown tables (| col1 | col2 |), because tables look crowded and broken in mobile and chat windows.

ABOUT ABDULLAH RANA:

EDUCATION:
- BS Computer Science at PAF-KIET
- Currently in his final semester (8th semester)
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
    { text: "What's Abdullah's education?", icon: GraduationCap },
    { text: 'What are his technical skills?', icon: Code2 },
    { text: 'Tell me about his projects', icon: Sparkles },
    { text: 'What does he do at CloudEx?', icon: Briefcase },
    { text: 'How can I contact him?', icon: Mail }
  ]

  const markdownComponents = {
    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    table: ({ children }) => (
      <div className="overflow-x-auto my-2 rounded-lg border border-gray-200 dark:border-dark-600 chatbot-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-600 text-xs text-left">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-dark-900 font-semibold text-gray-700 dark:text-gray-200">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-2.5 py-1.5 font-semibold text-gray-700 dark:text-gray-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-2.5 py-1.5 border-t border-gray-100 dark:border-dark-700 text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),
    code: ({ inline, children }) =>
      inline ? (
        <code className="bg-gray-200 dark:bg-dark-600 text-primary-600 dark:text-primary-400 px-1 py-0.5 rounded text-xs font-mono">
          {children}
        </code>
      ) : (
        <code className="block bg-gray-900 text-gray-100 p-2.5 rounded-lg text-xs font-mono overflow-x-auto my-2 chatbot-scrollbar">
          {children}
        </code>
      )
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[9999] bg-primary-600 hover:bg-primary-700 text-white p-3.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            transition={{
              duration: 0.2
            }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-[9999] sm:w-[390px] md:w-[410px] h-[540px] max-h-[calc(100vh-120px)] bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white px-4 py-3.5 flex items-center justify-between shadow-sm select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-sm sm:text-base block leading-tight text-white">
                    Ask About Abdullah
                  </span>
                  <span className="text-[11px] text-primary-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
                    AI Portfolio Assistant
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                  title="Reset conversation"
                  aria-label="Reset chat"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                  aria-label="Close chatbot"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 chatbot-scrollbar scroll-smooth">
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
                  {message.sender === 'bot' ? (
                    <div className="flex items-start gap-2.5 max-w-[88%]">
                      <div className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={15} />
                      </div>
                      <div className="bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white px-3.5 py-2.5 rounded-2xl rounded-tl-xs text-sm break-words shadow-xs">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end max-w-[85%]">
                      <div className="bg-primary-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm break-words shadow-sm">
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Initial Suggestions inside the scroll feed */}
              {messages.length <= 1 && (
                <div className="pt-2 pl-9.5 space-y-2">
                  <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-primary-500" />
                    Suggested questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {quickQuestions.map((q, index) => {
                      const Icon = q.icon
                      return (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(q.text)}
                          disabled={isTyping}
                          className="text-left text-xs bg-gray-50 dark:bg-dark-700/80 hover:bg-primary-50 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-200 dark:border-dark-600/90 rounded-xl px-3 py-2 transition-all flex items-center justify-between group shadow-2xs hover:border-primary-400 dark:hover:border-primary-500 active:scale-95"
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={13} className="text-primary-600 dark:text-primary-400 shrink-0" />
                            <span>{q.text}</span>
                          </div>
                          <ChevronRight size={13} className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                    <div className="bg-gray-100 dark:bg-dark-700 px-3.5 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Abdullah's AI is typing
                      </span>
                      <div className="flex space-x-1 items-center">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
              <div className="flex gap-2 items-center bg-gray-50 dark:bg-dark-700/60 border border-gray-200 dark:border-dark-600 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Abdullah..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm py-1 outline-none placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-60"
                />

                {inputValue.trim() && (
                  <button
                    onClick={() => setInputValue('')}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    title="Clear input"
                  >
                    <X size={14} />
                  </button>
                )}

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-dark-600 text-white p-2 rounded-lg transition-colors shrink-0 flex items-center justify-center disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={15} />
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