import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAI, useProgress } from '../../hooks/useAI'
import { useTimer } from '../../hooks/useTimer'
import { labs as rawLabs } from '../../data/labs'
import { useApp } from '../../context/AppContext'
import ReactMarkdown from 'react-markdown'
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Eye,
  CheckCircle2,
  FlaskConical,
  Loader2,
  AlertCircle,
} from 'lucide-react'

function personalizeLab(lab, companyName) {
  const replace = (str) => str ? str.split('{{COMPANY_NAME}}').join(companyName) : str
  return {
    ...lab,
    title: replace(lab.title),
    scenario: replace(lab.scenario),
    steps: lab.steps.map((step) => ({
      ...step,
      instructions: replace(step.instructions),
      aiPrompt: replace(step.aiPrompt),
      expectedOutput: replace(step.expectedOutput),
      hints: step.hints?.map(replace),
    })),
  }
}

export default function LabWalkthrough() {
  const { labId } = useParams()
  const labIndex = parseInt(labId, 10)
  const { state } = useApp()
  const companyName = state.profile?.company_name || 'Your Company'
  const labs = useMemo(
    () => rawLabs.map((l) => personalizeLab(l, companyName)),
    [companyName]
  )
  const lab = labs?.find((l) => l.id === labIndex)

  const { messages, loading, error, sendMessage, clearMessages } = useAI('lab-reviewer')
  const { updateProgress } = useProgress()
  const { seconds, formatted, start, isRunning } = useTimer()

  const [currentStep, setCurrentStep] = useState(0)
  const [stepWork, setStepWork] = useState({})
  const [revealedHints, setRevealedHints] = useState({})
  const [stepReviews, setStepReviews] = useState({})
  const [completedSteps, setCompletedSteps] = useState({})
  const [showExpected, setShowExpected] = useState({})

  useEffect(() => {
    if (lab && !isRunning) {
      start()
    }
  }, [lab])

  if (!lab) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-8 text-center">
          <FlaskConical className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Lab Not Found</h2>
          <p className="text-slate-400 mb-4">The lab you are looking for does not exist.</p>
          <Link
            to="/"
            className="text-electric-400 hover:text-electric-300 text-sm transition-colors"
          >
            Return to Study Plan
          </Link>
        </div>
      </div>
    )
  }

  const step = lab.steps[currentStep]
  const totalSteps = lab.steps.length

  function revealNextHint() {
    const currentHints = revealedHints[currentStep] || 0
    if (step.hints && currentHints < step.hints.length) {
      setRevealedHints((prev) => ({ ...prev, [currentStep]: currentHints + 1 }))
    }
  }

  async function handleAskReview() {
    const userWork = stepWork[currentStep] || ''
    if (!userWork.trim()) return

    clearMessages()
    const prompt = `${step.aiPrompt}\n\nHere is the student's work:\n\n${userWork}`
    const response = await sendMessage(prompt)
    if (response) {
      setStepReviews((prev) => ({ ...prev, [currentStep]: response.content }))
    }
  }

  function goToStep(index) {
    if (index > currentStep) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }))
    }
    setCurrentStep(index)
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  function handleNext() {
    setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }))
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Lab complete
      updateProgress(null, 'lab', String(lab.id), 'completed')
    }
  }

  const completedCount = Object.keys(completedSteps).length
  const hintsShown = revealedHints[currentStep] || 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-electric-400 mb-4 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Study Plan
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{lab.title}</h1>
            <p className="text-slate-400 text-sm">{lab.scenario}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <Clock className="h-4 w-4" />
              {lab.timeEstimate}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono bg-electric-500/10 text-electric-400">
              <Clock className="h-3.5 w-3.5" />
              {formatted}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6">
        {lab.steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => goToStep(idx)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
              idx === currentStep
                ? 'bg-electric-500 text-white'
                : completedSteps[idx]
                  ? 'bg-success-500 text-white'
                  : 'bg-navy-700 text-slate-400 hover:bg-navy-600'
            }`}
          >
            {completedSteps[idx] ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              idx + 1
            )}
          </button>
        ))}
        <span className="text-xs text-slate-500 ml-2">
          {completedCount}/{totalSteps} completed
        </span>
      </div>

      {/* Current step */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
        {/* Step header */}
        <div className="border-b border-navy-600 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-white">{step.title}</h2>
        </div>

        {/* Instructions */}
        <div className="p-6 border-b border-navy-600">
          <div className="prose prose-invert prose-sm max-w-none text-slate-300">
            <ReactMarkdown>{step.instructions}</ReactMarkdown>
          </div>
        </div>

        {/* Work area */}
        <div className="p-6 border-b border-navy-600">
          <label className="block text-sm font-medium text-white mb-2">Your Work</label>
          <textarea
            value={stepWork[currentStep] || ''}
            onChange={(e) =>
              setStepWork((prev) => ({ ...prev, [currentStep]: e.target.value }))
            }
            placeholder="Write your solution here..."
            rows={8}
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-500 resize-y focus:outline-none focus:border-electric-500/50 font-mono transition-colors"
          />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Hint button */}
            {step.hints && step.hints.length > 0 && (
              <button
                onClick={revealNextHint}
                disabled={hintsShown >= step.hints.length}
                className="flex items-center gap-1.5 bg-warning-500/10 hover:bg-warning-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-warning-500 px-3 py-2 rounded-lg text-sm transition-colors"
              >
                <Lightbulb className="h-4 w-4" />
                Show Hint ({hintsShown}/{step.hints.length})
              </button>
            )}

            {/* AI review button */}
            <button
              onClick={handleAskReview}
              disabled={loading || !(stepWork[currentStep] || '').trim()}
              className="flex items-center gap-1.5 bg-electric-500/10 hover:bg-electric-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-electric-400 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Ask AI to Review
            </button>

            {/* Show expected output */}
            {step.expectedOutput && (
              <button
                onClick={() =>
                  setShowExpected((prev) => ({
                    ...prev,
                    [currentStep]: !prev[currentStep],
                  }))
                }
                className="flex items-center gap-1.5 bg-navy-700 hover:bg-navy-600 text-slate-400 px-3 py-2 rounded-lg text-sm transition-colors"
              >
                <Eye className="h-4 w-4" />
                {showExpected[currentStep] ? 'Hide' : 'Show'} Expected Output
              </button>
            )}
          </div>
        </div>

        {/* Hints */}
        {hintsShown > 0 && (
          <div className="p-6 border-b border-navy-600 bg-warning-500/5">
            <h3 className="text-sm font-medium text-warning-500 mb-3 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" />
              Hints
            </h3>
            <div className="space-y-2">
              {step.hints.slice(0, hintsShown).map((hint, idx) => (
                <div
                  key={idx}
                  className="text-sm text-slate-300 bg-navy-800 rounded-lg px-4 py-2 border border-navy-600"
                >
                  <span className="text-warning-500 font-medium mr-2">Hint {idx + 1}:</span>
                  {hint}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Review */}
        {stepReviews[currentStep] && (
          <div className="p-6 border-b border-navy-600 bg-electric-500/5">
            <h3 className="text-sm font-medium text-electric-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              AI Review
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{stepReviews[currentStep]}</ReactMarkdown>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 border-b border-navy-600">
            <div className="flex items-center gap-2 text-danger-500 text-sm bg-danger-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}

        {/* Expected Output */}
        {showExpected[currentStep] && step.expectedOutput && (
          <div className="p-6 border-b border-navy-600 bg-success-500/5">
            <h3 className="text-sm font-medium text-success-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Expected Output
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{step.expectedOutput}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 bg-navy-700 hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Step
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === totalSteps - 1
                ? 'bg-success-500 hover:bg-success-400 text-white'
                : 'bg-electric-500 hover:bg-electric-400 text-white'
            }`}
          >
            {currentStep === totalSteps - 1 ? 'Complete Lab' : 'Next Step'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
