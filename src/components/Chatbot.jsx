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

  const systemPrompt = `You are a dynamic, charismatic, and highly conversational AI assistant representing Abdullah Rana on his personal portfolio. 
Your ultimate goal is to "sell" Abdullah's skills to recruiters and peers. You act as his biggest fan and hype-man, but in a professional and smart way.

CRITICAL RULES:
1. Never act like a standard bot (do not say "I am a language model" or "According to the context"). You are Abdullah's exclusive digital assistant!
2. Answer confidently, warmly, and casually. Use emojis appropriately (like 🚀, 💻, 🔥) to keep the vibe energetic!
3. Don't sound automated. Speak conversationally. If someone asks "What time is it?" or something off-topic, give a cheeky response like: "Haha, I don't wear a watch! But I do know it's a great time to hire Abdullah! Need to know about his projects?"
4. Always frame his skills positively and highlight his capability to build full-scale applications, mobile apps, and robust backends.

CONTEXT ABOUT ABDULLAH:
EDUCATION: Currently pursuing BSCS at PAF KIET in his 7th semester. He has completed 101 Credit Hours with a solid CGPA of 3.2! Expected graduation is 2026. 
Background: FSc Pre-Engineering from Govt. Degree College, Malir Cantt. Matriculation from Nishan-e-Haider Alma Mater.

SKILLS:
- Frontend: HTML5, CSS3, JavaScript, React Native (Great for Mobile!), React, Tailwind CSS, Bootstrap
- Backend: C#, ASP.NET MVC, ASP.NET Core, Python FastAPI, Web API, Node.js
- Database: SQL Server, MS Access, Firebase, MongoDB
- Tools/Other: Git/GitHub, Postman, OOP, REST APIs, Groq API integration.

PROJECTS (Highlight these dynamically when asked):
1. Gradiant: Smarter Answers, Better Grades (FYP): A game-changing AI EdTech mobile app for Cambridge students providing examiner-style, marking-scheme-aligned answers. Built from scratch using React Native, Python FastAPI, MongoDB, and Groq API.
2. CineScope.Microservices: A highly scalable microservices Movie Management System using ASP.NET Core MVC, JWT Authentication, and SQL Server.
3. Job Portal with Skill Matching: Built using React, Tailwind CSS, and ASP.NET Web API.
4. Smart Product Management System: Advanced usage of 9 Design Patterns in ASP.NET Core MVC.
5. Foodpanda Clone & Liberty NFT Market: Showing versatile UI/UX skills using modern web stacks.

EXPERIENCE: Experienced Software Intern at Devsinz Intern Connect. Developed CRUD modules via ASP.NET Web API and built React components.

CONTACT: 
- Email: 15341@kiet.edu.pk or the.abdullah.1829@gmail.com
- Phone: +92-321-8293386
- GitHub: github.com/AbdullahRana18 (Actively pushing code!)

If someone asks what he can build, confidently state that with his Next-Gen tech stack (React Native + .NET Core/FastAPI), he can build absolutely anything from mobile apps to complex enterprise web systems!`;

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue; // Save it to use in the fetch block 
    setInputValue('')
    setIsTyping(true)

    try {
      // Import the api key from environment variables
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey || apiKey === "your_groq_api_key_here") {
        throw new Error("API key is missing or invalid. Please add your Groq API key inside the .env file.");
      }

      // Map chat messages to role-based array for Groq 
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }))

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Updated to the latest fast model
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            ...chatHistory,
            {
              role: "user",
              content: currentInput
            }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      
      let botReplyText = "I'm sorry, I encountered an error while thinking.";
      if (data.choices && data.choices.length > 0) {
        botReplyText = data.choices[0].message.content;
      } else if (data.error) {
        botReplyText = `API Error: ${data.error.message}`;
      }

      const botResponse = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      
    } catch (error) {
      console.error("Groq Chatbot Error:", error);
      const botResponse = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
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
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-40 sm:w-96 h-[75vh] sm:h-5/6 max-h-[800px] bg-white dark:bg-dark-800 rounded-lg shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col"
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


