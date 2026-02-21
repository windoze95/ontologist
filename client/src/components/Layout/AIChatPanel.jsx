import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { useAI } from '../../hooks/useAI'
import { X, Send, Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const AI_MODES = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'interviewer', label: 'Interviewer' },
  { value: 'lab_reviewer', label: 'Lab Reviewer' },
  { value: 'feedback', label: 'Feedback' },
]

export default function AIChatPanel() {
  const { state, dispatch } = useApp()
  const { messages, loading, sendMessage, clearMessages } = useAI(state.aiMode)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    await sendMessage(text)
  }

  return (
    <div className="flex h-full flex-col bg-navy-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-navy-600">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-electric-500" />
          <span className="text-sm font-semibold text-white">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={state.aiMode}
            onChange={(e) => dispatch({ type: 'SET_AI_MODE', payload: e.target.value })}
            className="text-xs bg-navy-700 border border-navy-600 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-electric-500"
          >
            {AI_MODES.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AI_CHAT' })}
            className="p-1 rounded hover:bg-navy-700 text-slate-400 hover:text-white transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="h-10 w-10 text-navy-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500">
              Ask me anything about Foundry, FDE prep, or your study plan.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Mode: {AI_MODES.find((m) => m.value === state.aiMode)?.label}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-electric-500/20 flex items-center justify-center mt-1">
                <Bot className="h-3.5 w-3.5 text-electric-500" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-electric-500 text-white'
                  : 'bg-navy-700 text-slate-300'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_pre]:bg-navy-900 [&_pre]:p-2 [&_pre]:rounded [&_code]:text-electric-400 [&_code]:text-xs">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-600 flex items-center justify-center mt-1">
                <User className="h-3.5 w-3.5 text-slate-400" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-electric-500/20 flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-electric-500 animate-pulse" />
            </div>
            <div className="bg-navy-700 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Clear messages */}
      {messages.length > 0 && (
        <div className="px-4 pb-1">
          <button
            onClick={clearMessages}
            className="text-xs text-slate-500 hover:text-slate-400 transition-all duration-200"
          >
            Clear conversation
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-navy-600">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-electric-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
