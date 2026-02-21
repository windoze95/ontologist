import { useState, useMemo, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
} from 'lucide-react'
import { useProgress } from '../../hooks/useAI'
import { useTimer } from '../../hooks/useTimer'
import { quizzes } from '../../data/quizzes'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuizEngine() {
  const { section } = useParams()
  const { saveQuizResult } = useProgress()
  const timer = useTimer()

  const questions = useMemo(() => quizzes[Number(section)] || [], [section])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('quiz') // quiz | summary | review

  // Start timer on mount
  useEffect(() => {
    if (questions.length > 0) timer.start()
    return () => timer.pause()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const score = useMemo(() => {
    let correct = 0
    Object.entries(answers).forEach(([qIdx, answer]) => {
      const q = questions[Number(qIdx)]
      if (q && answer === q.correctAnswer) correct++
    })
    return correct
  }, [answers, questions])

  const handleSubmit = useCallback(() => {
    if (selectedOption === null) return
    setAnswers((prev) => ({ ...prev, [currentIndex]: selectedOption }))
    setSubmitted(true)
  }, [selectedOption, currentIndex])

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      timer.pause()
      const finalAnswers = { ...answers, [currentIndex]: selectedOption }
      const finalScore = Object.entries(finalAnswers).reduce((acc, [qIdx, answer]) => {
        const q = questions[Number(qIdx)]
        return q && answer === q.correctAnswer ? acc + 1 : acc
      }, 0)
      setPhase('summary')
      saveQuizResult(
        Number(section),
        `section-${section}`,
        finalAnswers,
        Math.round((finalScore / questions.length) * 100),
        timer.seconds
      )
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      setSubmitted(false)
    }
  }, [isLastQuestion, currentIndex, selectedOption, answers, questions, section, timer, saveQuizResult])

  const handleRetake = useCallback(() => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setSubmitted(false)
    setAnswers({})
    setPhase('quiz')
    timer.reset()
    timer.start()
  }, [timer])

  const handleReview = useCallback(() => {
    setPhase('review')
  }, [])

  const progressPercent =
    questions.length > 0
      ? Math.round(((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100)
      : 0
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <Target className="w-16 h-16 text-slate-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-300 mb-2">No quiz for Section {section}</h2>
        <p className="text-slate-400 mb-6">This section does not have quiz questions yet.</p>
        <Link
          to={`/section/${section}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500 text-white rounded-lg hover:bg-electric-400 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Section {section}
        </Link>
      </div>
    )
  }

  // Summary Phase
  if (phase === 'summary') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-8 text-center">
          <Trophy
            className={`w-16 h-16 mx-auto mb-4 ${
              scorePercent >= 80 ? 'text-success-400' : scorePercent >= 50 ? 'text-warning-500' : 'text-danger-500'
            }`}
          />
          <h2 className="text-3xl font-bold text-slate-300 mb-2">Quiz Complete</h2>
          <p className="text-slate-400 mb-8">Section {section} Quiz Results</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-navy-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-electric-400">{scorePercent}%</p>
              <p className="text-sm text-slate-400 mt-1">Score</p>
            </div>
            <div className="bg-navy-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-slate-300">
                {score}/{questions.length}
              </p>
              <p className="text-sm text-slate-400 mt-1">Correct</p>
            </div>
            <div className="bg-navy-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-slate-300">{timer.formatted}</p>
              <p className="text-sm text-slate-400 mt-1">Time</p>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-3 bg-navy-700 rounded-full overflow-hidden mb-8">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                scorePercent >= 80 ? 'bg-success-500' : scorePercent >= 50 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${scorePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 px-5 py-3 bg-navy-700 text-slate-300 rounded-xl hover:bg-navy-600 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
            <button
              onClick={handleReview}
              className="flex items-center gap-2 px-5 py-3 bg-electric-500 text-white rounded-xl hover:bg-electric-400 transition-all duration-200"
            >
              Review Answers <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Review Phase
  if (phase === 'review') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-300">
            Section {section} Quiz - Review
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-slate-300 rounded-lg hover:bg-navy-600 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
            <Link
              to={`/section/${section}`}
              className="flex items-center gap-2 text-slate-400 hover:text-electric-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, qIdx) => {
            const userAnswer = answers[qIdx]
            const isCorrect = userAnswer === q.correctAnswer
            const options = q.type === 'true_false' ? ['True', 'False'] : q.options

            return (
              <div
                key={q.id}
                className={`bg-navy-800 rounded-xl border p-6 ${
                  isCorrect ? 'border-success-500/40' : 'border-danger-500/40'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-xs text-slate-500">Question {qIdx + 1}</span>
                    <p className="text-slate-300 font-medium">{q.question}</p>
                  </div>
                </div>

                <div className="space-y-2 ml-8 mb-4">
                  {options.map((opt, oIdx) => {
                    const label = OPTION_LABELS[oIdx] || String(oIdx + 1)
                    const optValue = q.type === 'true_false' ? opt : opt
                    const isThisCorrect = optValue === q.correctAnswer
                    const isThisSelected = optValue === userAnswer

                    let style = 'bg-navy-700 border-navy-600 text-slate-400'
                    if (isThisCorrect) style = 'bg-success-500/15 border-success-500/40 text-success-400'
                    else if (isThisSelected && !isThisCorrect) style = 'bg-danger-500/15 border-danger-500/40 text-danger-500'

                    return (
                      <div
                        key={oIdx}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${style}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-medium flex-shrink-0">
                          {label}
                        </span>
                        <span className="text-sm">{opt}</span>
                        {isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-success-400 ml-auto flex-shrink-0" />
                        )}
                        {isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-danger-500 ml-auto flex-shrink-0" />
                        )}
                      </div>
                    )
                  })}
                </div>

                {q.explanation && (
                  <div className="ml-8 bg-electric-500/10 border border-electric-500/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-electric-400 mb-1 uppercase tracking-wide">
                      Explanation
                    </p>
                    <p className="text-sm text-slate-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Quiz Phase
  const options =
    currentQuestion.type === 'true_false' ? ['True', 'False'] : currentQuestion.options

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-300">Section {section} Quiz</h1>
          <p className="text-slate-400 text-sm mt-1">
            {currentQuestion.category && (
              <span className="capitalize">{currentQuestion.category}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 bg-navy-800 px-3 py-1.5 rounded-lg border border-navy-600">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{timer.formatted}</span>
          </div>
          <Link
            to={`/section/${section}`}
            className="flex items-center gap-2 text-slate-400 hover:text-electric-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-electric-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6 mb-6">
        <p className="text-lg text-slate-300 font-medium mb-6 leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt, oIdx) => {
            const label = OPTION_LABELS[oIdx] || String(oIdx + 1)
            const optValue = opt
            const isSelected = selectedOption === optValue

            let style = 'bg-navy-700 border-navy-600 text-slate-300 hover:bg-navy-600 hover:border-navy-500'
            if (submitted) {
              const isCorrectAnswer = optValue === currentQuestion.correctAnswer
              if (isCorrectAnswer) {
                style = 'bg-success-500/15 border-success-500/40 text-success-400'
              } else if (isSelected && !isCorrectAnswer) {
                style = 'bg-danger-500/15 border-danger-500/40 text-danger-500'
              } else {
                style = 'bg-navy-700 border-navy-600 text-slate-500'
              }
            } else if (isSelected) {
              style = 'bg-electric-500/15 border-electric-500/40 text-electric-400'
            }

            return (
              <button
                key={oIdx}
                onClick={() => !submitted && setSelectedOption(optValue)}
                disabled={submitted}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${style} ${
                  submitted ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    isSelected && !submitted
                      ? 'border-electric-500 bg-electric-500/20 text-electric-400'
                      : 'border-current'
                  }`}
                >
                  {label}
                </span>
                <span className="flex-1">{opt}</span>
                {submitted && optValue === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0" />
                )}
                {submitted && isSelected && optValue !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-danger-500 flex-shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation (shown after submit) */}
        {submitted && currentQuestion.explanation && (
          <div className="mt-6 bg-electric-500/10 border border-electric-500/30 rounded-lg p-4">
            <p className="text-xs font-medium text-electric-400 mb-1 uppercase tracking-wide">
              Explanation
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-3 bg-electric-500 text-white rounded-xl font-medium hover:bg-electric-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-electric-500 text-white rounded-xl font-medium hover:bg-electric-400 transition-all duration-200"
          >
            {isLastQuestion ? 'View Results' : 'Next Question'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
