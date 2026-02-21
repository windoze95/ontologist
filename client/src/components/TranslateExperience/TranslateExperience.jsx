import { useState, useMemo } from 'react'
import { useAI } from '../../hooks/useAI'
import { useApp } from '../../context/AppContext'
import ReactMarkdown from 'react-markdown'
import {
  ArrowRightLeft,
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const defaultExercises = [
  {
    id: 1,
    title: 'Predictive Intelligence \u2192 ML Objectives',
    original:
      'I built a Predictive Intelligence model in ServiceNow that achieved 98% accuracy for incident assignment group classification. I created training data filters and implemented a multi-tier auto-assignment strategy combining CI support group assignment, ML-based predictions, and manual triage fallback.',
    task: 'Rewrite this for a Palantir audience. Use Foundry terminology. Emphasize the problem decomposition, data pipeline design, and operational impact.',
  },
  {
    id: 2,
    title: 'Copilot Studio \u2192 AIP/Workshop',
    original:
      'I designed and built a Microsoft Copilot Studio agent for Teams chat that integrates with our ServiceNow instance. It performs record lookups, creates incidents, and provides knowledge base answers using adaptive dialog flows.',
    task: 'Frame this as a Foundry-style solution. What would the equivalent be in Workshop + AIP + Actions? How would you pitch this to a customer?',
  },
  {
    id: 3,
    title: 'Automation Workflows \u2192 Pipeline + Actions',
    original:
      'I designed automation workflows in ServiceNow Flow Designer that handle incident lifecycle management \u2014 auto-assignment, escalation rules, SLA tracking, and notification cascades.',
    task: 'Translate this to Foundry architecture. Identify the Ontology objects, pipeline logic, action types, and Workshop components.',
  },
]

function tagToFoundryHint(tags) {
  if (!tags || tags.length === 0) return 'Foundry concepts (ontology, pipelines, Workshop, Actions)'

  for (const tag of tags) {
    const t = tag.toLowerCase()
    if (t.includes('ml') || t.includes('ai')) return 'ML Objectives, model training, data science workflows'
    if (t.includes('automation')) return 'Pipeline + Actions, workflow orchestration'
    if (t.includes('integration')) return 'OSDK, Functions, external integrations'
    if (t.includes('data')) return 'Datasets, Pipeline Builder, data quality'
    if (t.includes('ui') || t.includes('app')) return 'Workshop, Slate, application building'
  }

  return 'Foundry concepts (ontology, pipelines, Workshop, Actions)'
}

function buildExercisesFromProfile(profile) {
  if (!profile) return defaultExercises

  let accomplishments = profile.accomplishments
  if (typeof accomplishments === 'string') {
    try {
      accomplishments = JSON.parse(accomplishments)
    } catch {
      return defaultExercises
    }
  }

  if (!Array.isArray(accomplishments) || accomplishments.length === 0) return defaultExercises

  return accomplishments.map((acc, idx) => {
    const hint = tagToFoundryHint(acc.tags)
    return {
      id: idx + 1,
      title: acc.title || `Accomplishment ${idx + 1}`,
      original: acc.original || acc.text || acc.description || JSON.stringify(acc),
      task: `Rewrite this accomplishment for a Palantir Foundry audience. Use terminology related to ${hint}. Emphasize problem decomposition, data pipeline design, and operational impact.`,
    }
  })
}

export default function TranslateExperience() {
  const { messages, loading, error, sendMessage, clearMessages } = useAI('feedback')
  const { state } = useApp()

  const exercises = useMemo(() => buildExercisesFromProfile(state.profile), [state.profile])

  const [activeExercise, setActiveExercise] = useState(0)
  const [translations, setTranslations] = useState({})
  const [feedbacks, setFeedbacks] = useState({})
  const [completed, setCompleted] = useState({})

  const exercise = exercises[activeExercise]

  async function handleGetFeedback() {
    const text = translations[activeExercise] || ''
    if (!text.trim()) return

    clearMessages()
    const prompt = `The user was given this original experience description:\n\n"${exercise.original}"\n\nThey were asked to: ${exercise.task}\n\nHere is their translation:\n\n"${text}"\n\nProvide detailed feedback on their translation. Evaluate:\n1. Correct use of Foundry/Palantir terminology\n2. How well they preserved the technical substance\n3. Whether they emphasized the right aspects for a Palantir audience\n4. Specific suggestions for improvement\n5. An improved version of their translation`

    const response = await sendMessage(prompt)
    if (response) {
      setFeedbacks((prev) => ({ ...prev, [activeExercise]: response.content }))
      setCompleted((prev) => ({ ...prev, [activeExercise]: true }))
    }
  }

  function goToExercise(index) {
    setActiveExercise(index)
  }

  const completedCount = Object.keys(completed).length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-electric-500/10 flex items-center justify-center">
            <ArrowRightLeft className="h-5 w-5 text-electric-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Translate Your Experience</h1>
            <p className="text-sm text-slate-400">
              Reframe your accomplishments in Foundry language
            </p>
          </div>
        </div>
      </div>

      {/* Exercise tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {exercises.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => goToExercise(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              idx === activeExercise
                ? 'bg-electric-500/10 text-electric-400 border border-electric-500/30'
                : completed[idx]
                  ? 'bg-success-500/10 text-success-400 border border-success-500/20'
                  : 'bg-navy-800 text-slate-400 border border-navy-600 hover:border-navy-500'
            }`}
          >
            {completed[idx] && <CheckCircle2 className="h-3.5 w-3.5" />}
            Exercise {idx + 1}
          </button>
        ))}
        <span className="text-xs text-slate-500 ml-2">
          {completedCount}/{exercises.length} completed
        </span>
      </div>

      {/* Active exercise */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
        {/* Title */}
        <div className="border-b border-navy-600 p-6">
          <h2 className="text-lg font-semibold text-white">{exercise.title}</h2>
        </div>

        {/* Original prompt */}
        <div className="p-6 border-b border-navy-600">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Original Experience</h3>
          <div className="bg-navy-900 rounded-lg p-4 border border-navy-700">
            <p className="text-sm text-slate-300 leading-relaxed font-mono">{exercise.original}</p>
          </div>
        </div>

        {/* Task description */}
        <div className="p-6 border-b border-navy-600 bg-electric-500/5">
          <h3 className="text-sm font-medium text-electric-400 mb-2">Your Task</h3>
          <p className="text-sm text-slate-300">{exercise.task}</p>
        </div>

        {/* Translation area */}
        <div className="p-6 border-b border-navy-600">
          <label className="block text-sm font-medium text-white mb-2">Your Translation</label>
          <textarea
            value={translations[activeExercise] || ''}
            onChange={(e) =>
              setTranslations((prev) => ({ ...prev, [activeExercise]: e.target.value }))
            }
            placeholder="Write your Foundry-translated version here..."
            rows={8}
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-500 resize-y focus:outline-none focus:border-electric-500/50 transition-colors"
          />

          <div className="mt-4">
            <button
              onClick={handleGetFeedback}
              disabled={loading || !(translations[activeExercise] || '').trim()}
              className="flex items-center gap-1.5 bg-electric-500 hover:bg-electric-400 disabled:bg-navy-600 disabled:text-slate-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Get AI Feedback
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 border-b border-navy-600">
            <div className="flex items-center gap-2 text-danger-500 text-sm bg-danger-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedbacks[activeExercise] && (
          <div className="p-6 border-b border-navy-600 bg-electric-500/5">
            <h3 className="text-sm font-medium text-electric-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              AI Feedback
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{feedbacks[activeExercise]}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={() => goToExercise(activeExercise - 1)}
            disabled={activeExercise === 0}
            className="flex items-center gap-1.5 bg-navy-700 hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={() => goToExercise(activeExercise + 1)}
            disabled={activeExercise === exercises.length - 1}
            className="flex items-center gap-1.5 bg-electric-500 hover:bg-electric-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
