import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAI, useProgress } from '../../hooks/useAI'
import { useTimer } from '../../hooks/useTimer'
import ReactMarkdown from 'react-markdown'
import {
  Send,
  Clock,
  Play,
  Square,
  ChevronLeft,
  MessageSquare,
  Loader2,
  AlertCircle,
} from 'lucide-react'

const interviewTypes = {
  decomposition: {
    title: 'Decomposition Interview',
    duration: '45 min',
    mode: 'interviewer-decomp',
    description:
      'The hallmark Palantir interview. Practice breaking down complex, ambiguous business problems.',
    tips: [
      'Ask clarifying questions before jumping to a solution',
      'Structure your approach — think out loud',
      'Consider stakeholders, data sources, and success metrics',
      'Map ambiguous requirements to concrete technical components',
      'Propose an iterative rollout, not a big-bang solution',
    ],
  },
  behavioral: {
    title: 'Behavioral Interview',
    duration: '30 min',
    mode: 'interviewer-behavioral',
    description:
      'STAR-format behavioral questions with emphasis on Palantir cultural fit.',
    tips: [
      'Use the STAR framework: Situation, Task, Action, Result',
      'Quantify impact whenever possible',
      'Highlight collaboration and leadership moments',
      'Show intellectual curiosity and initiative',
      'Connect experiences to Palantir values',
    ],
  },
  technical: {
    title: 'Technical Interview',
    duration: '30 min',
    mode: 'interviewer-technical',
    description:
      'Data modeling, system design, and practical problem-solving.',
    tips: [
      'Draw out schemas and relationships before coding',
      'Clarify requirements and edge cases early',
      'Talk through trade-offs explicitly',
      'Consider scale, performance, and maintainability',
      'Relate solutions to Foundry concepts when relevant',
    ],
  },
}

export default function MockInterview() {
  const { type } = useParams()
  const config = interviewTypes[type]
  const { messages, loading, error, sendMessage, clearMessages } = useAI(config?.mode || 'tutor')
  const { saveInterview } = useProgress()
  const { seconds, formatted, isRunning, start, pause } = useTimer()

  const [phase, setPhase] = useState('start') // start | active | ended
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [pastInterviews, setPastInterviews] = useState([])
  const [loadingPast, setLoadingPast] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const timerStartedRef = useRef(false)

  useEffect(() => {
    fetch('/api/progress/interviews')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPastInterviews(type ? data.filter((i) => i.interview_type === type) : data)
        }
      })
      .catch(() => {})
      .finally(() => setLoadingPast(false))
  }, [type])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (phase === 'active') {
      inputRef.current?.focus()
    }
  }, [phase])

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Mock Interviews</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(interviewTypes).map(([key, val]) => (
            <Link
              key={key}
              to={`/interview/${key}`}
              className="bg-navy-800 rounded-xl border border-navy-600 p-6 hover:border-electric-500/50 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{val.title}</h3>
              <p className="text-sm text-slate-400 mb-3">{val.description}</p>
              <span className="text-xs text-electric-400">{val.duration}</span>
            </Link>
          ))}
        </div>

        {!loadingPast && pastInterviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4">Past Interviews</h2>
            <div className="space-y-3">
              {pastInterviews.map((interview, idx) => (
                <div
                  key={interview.id || idx}
                  className="bg-navy-800 rounded-xl border border-navy-600 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-white capitalize">
                        {interview.interview_type}
                      </span>
                      <span className="text-xs text-slate-500 ml-3">
                        {new Date(interview.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {Math.floor((interview.duration_seconds || 0) / 60)} min
                    </span>
                  </div>
                  {interview.ai_feedback && (
                    <div className="mt-2 text-xs text-slate-400 line-clamp-2">
                      {interview.ai_feedback.slice(0, 150)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  async function handleStart() {
    clearMessages()
    setPhase('active')
    setFeedback(null)
    timerStartedRef.current = false
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    if (!timerStartedRef.current) {
      start()
      timerStartedRef.current = true
    }

    setInput('')
    await sendMessage(text)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function handleEnd() {
    pause()
    setPhase('ended')

    const scorecardResponse = await sendMessage(
      'The interview is now over. Please provide a detailed scorecard and feedback. Rate my performance in the following areas on a scale of 1-5: Communication, Problem Decomposition, Technical Depth, Structure/Organization, and Overall. Include specific strengths, areas for improvement, and actionable next steps.'
    )

    const feedbackText = scorecardResponse?.content || 'Unable to generate feedback.'
    setFeedback(feedbackText)

    const transcript = messages.map((m) => `${m.role}: ${m.content}`).join('\n\n')
    await saveInterview(type, transcript, feedbackText, seconds)
  }

  // Start screen
  if (phase === 'start') {
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          to="/interview"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-electric-400 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          All Interviews
        </Link>

        <div className="bg-navy-800 rounded-xl border border-navy-600 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-electric-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{config.title}</h1>
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {config.duration}
              </span>
            </div>
          </div>

          <p className="text-slate-300 mb-6">{config.description}</p>

          <div className="bg-navy-700 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">Tips for Success</h3>
            <ul className="space-y-2">
              {config.tips.map((tip, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-electric-500 mt-0.5 text-xs">&#9679;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 bg-electric-500 hover:bg-electric-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Play className="h-5 w-5" />
            Start Interview
          </button>
        </div>

        {!loadingPast && pastInterviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4">Past Attempts</h2>
            <div className="space-y-3">
              {pastInterviews.map((interview, idx) => (
                <div
                  key={interview.id || idx}
                  className="bg-navy-800 rounded-xl border border-navy-600 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(interview.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((interview.duration_seconds || 0) / 60)} min
                    </span>
                  </div>
                  {interview.ai_feedback && (
                    <div className="mt-2 text-xs text-slate-400 line-clamp-3">
                      {interview.ai_feedback.slice(0, 200)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Active / Ended screen
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-white">{config.title}</h1>
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono ${
              phase === 'ended'
                ? 'bg-navy-700 text-slate-400'
                : 'bg-electric-500/10 text-electric-400'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            {formatted}
          </div>
        </div>
        {phase === 'active' && (
          <button
            onClick={handleEnd}
            className="flex items-center gap-1.5 bg-danger-500/10 hover:bg-danger-500/20 text-danger-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Square className="h-4 w-4" />
            End Interview
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0">
        {messages.length === 0 && phase === 'active' && (
          <div className="text-center py-12 text-slate-500">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Send a message to begin the interview.</p>
            <p className="text-xs mt-1">The timer will start with your first message.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-electric-500/20 border border-electric-500/30 text-slate-200'
                  : 'bg-navy-700 border border-navy-600 text-slate-300'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-navy-700 border border-navy-600 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-electric-400 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-electric-400 rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-electric-400 rounded-full animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-danger-500 text-sm bg-danger-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Feedback section after ending */}
      {phase === 'ended' && feedback && (
        <div className="flex-shrink-0 bg-navy-800 border border-navy-600 rounded-xl p-6 mb-4 max-h-80 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-3">Interview Scorecard</h3>
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{feedback}</ReactMarkdown>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                clearMessages()
                setPhase('start')
                setFeedback(null)
                timerStartedRef.current = false
              }}
              className="flex items-center gap-2 bg-electric-500 hover:bg-electric-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Play className="h-4 w-4" />
              Try Again
            </button>
            <Link
              to="/interview"
              className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              All Interviews
            </Link>
          </div>
        </div>
      )}

      {/* Input area */}
      {phase === 'active' && (
        <div className="flex-shrink-0 bg-navy-800 border border-navy-600 rounded-xl p-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response..."
              rows={2}
              className="flex-1 bg-navy-700 border border-navy-600 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-electric-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex items-center justify-center w-10 h-10 bg-electric-500 hover:bg-electric-400 disabled:bg-navy-600 disabled:text-slate-500 text-white rounded-lg transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
