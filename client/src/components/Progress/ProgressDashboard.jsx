import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { studyPlan } from '../../data/studyPlan'
import {
  BarChart3,
  BookOpen,
  Brain,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
} from 'lucide-react'

export default function ProgressDashboard() {
  const { state, dispatch } = useApp()
  const [stats, setStats] = useState(state.stats)
  const [interviews, setInterviews] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    fetch('/api/progress/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data)
        dispatch({ type: 'SET_STATS', payload: data })
      })
      .catch(() => {})

    fetch('/api/progress/interviews')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setInterviews(data)
      })
      .catch(() => {})

    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          dispatch({ type: 'SET_PROGRESS', payload: data })
          setRecentActivity(data.slice(-10).reverse())
        }
      })
      .catch(() => {})
  }, [dispatch])

  // Calculate overall completion
  const totalActivities = studyPlan.reduce((sum, section) => sum + section.activities.length, 0)
  const completedActivities = state.progress.filter((p) => p.status === 'completed').length
  const overallPercent = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0

  // Section-by-section progress
  const sectionProgress = studyPlan.map((section) => {
    const sectionTotal = section.activities.length
    const sectionCompleted = section.activities.filter((a) =>
      state.progress.some(
        (p) => p.section === section.section && p.activity_id === a.id && p.status === 'completed'
      )
    ).length
    return {
      section: section.section,
      title: section.title,
      total: sectionTotal,
      completed: sectionCompleted,
      percent: sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0,
    }
  })

  // Quiz scores by category
  const quizScores = stats?.quiz_scores || []
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((sum, q) => sum + (q.score || 0), 0) / quizScores.length)
      : null

  // Flashcard distribution
  const flashcardProgress = state.flashcardProgress || []
  const boxDistribution = [0, 0, 0, 0, 0]
  flashcardProgress.forEach((fc) => {
    const box = Math.min(Math.max((fc.box || 1) - 1, 0), 4)
    boxDistribution[box]++
  })
  const totalFlashcards = flashcardProgress.length || 1

  // Total time
  const totalSeconds = stats?.total_time_seconds || 0
  const totalHours = Math.floor(totalSeconds / 3600)
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60)

  // Strengths and gaps from quiz scores
  const categoryScores = {}
  quizScores.forEach((q) => {
    const label = `Section ${q.section || '?'}`
    if (!categoryScores[label]) categoryScores[label] = []
    categoryScores[label].push(q.score || 0)
  })
  const categoryAvgs = Object.entries(categoryScores).map(([label, scores]) => ({
    label,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }))
  const strengths = categoryAvgs.filter((c) => c.avg >= 70).sort((a, b) => b.avg - a.avg)
  const gaps = categoryAvgs.filter((c) => c.avg < 70).sort((a, b) => a.avg - b.avg)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-electric-500/10 flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-electric-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Progress Dashboard</h1>
          <p className="text-sm text-slate-400">Track your FDE prep journey</p>
        </div>
      </div>

      {/* Overall completion */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Overall Completion</h2>
          <span className="text-2xl font-bold text-electric-400">{overallPercent}%</span>
        </div>
        <div className="w-full h-4 bg-navy-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric-500 to-electric-400 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {completedActivities} of {totalActivities} activities completed
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle2}
          label="Activities Completed"
          value={completedActivities}
          color="text-success-500"
          bg="bg-success-500/10"
        />
        <StatCard
          icon={Brain}
          label="Flashcards Reviewed"
          value={flashcardProgress.length}
          color="text-electric-400"
          bg="bg-electric-500/10"
        />
        <StatCard
          icon={BookOpen}
          label="Quizzes Taken"
          value={quizScores.length}
          subtext={avgQuizScore !== null ? `Avg: ${avgQuizScore}%` : undefined}
          color="text-warning-500"
          bg="bg-warning-500/10"
        />
        <StatCard
          icon={MessageSquare}
          label="Interviews Done"
          value={interviews.length}
          color="text-electric-300"
          bg="bg-electric-500/10"
        />
      </div>

      {/* Time and score row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total time */}
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-medium text-slate-400">Total Time Spent</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {totalHours > 0 && <span>{totalHours}h </span>}
            {totalMinutes}m
          </p>
        </div>

        {/* Average quiz score */}
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-medium text-slate-400">Average Quiz Score</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {avgQuizScore !== null ? (
              <span className={avgQuizScore >= 70 ? 'text-success-400' : 'text-warning-500'}>
                {avgQuizScore}%
              </span>
            ) : (
              <span className="text-slate-500">--</span>
            )}
          </p>
        </div>
      </div>

      {/* Section-by-section breakdown */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Section Progress</h2>
        <div className="space-y-3">
          {sectionProgress.map((section) => (
            <div key={section.section} className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400 w-24 flex-shrink-0">
                Section {section.section}
              </span>
              <div className="flex-1">
                <div className="w-full h-6 bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      section.percent === 100
                        ? 'bg-success-500'
                        : section.percent > 0
                          ? 'bg-electric-500'
                          : 'bg-navy-600'
                    }`}
                    style={{ width: `${Math.max(section.percent, 2)}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-slate-400 w-20 text-right flex-shrink-0">
                {section.completed}/{section.total}
              </span>
              <span className="text-sm font-mono text-slate-500 w-12 text-right flex-shrink-0">
                {section.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flashcard mastery */}
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Flashcard Mastery</h2>
          {flashcardProgress.length > 0 ? (
            <div className="space-y-3">
              {boxDistribution.map((count, idx) => {
                const percent = Math.round((count / totalFlashcards) * 100)
                const labels = ['New', 'Learning', 'Reviewing', 'Familiar', 'Mastered']
                const colors = [
                  'bg-danger-500',
                  'bg-warning-500',
                  'bg-electric-500',
                  'bg-electric-400',
                  'bg-success-500',
                ]
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-20 flex-shrink-0">
                      Box {idx + 1}: {labels[idx]}
                    </span>
                    <div className="flex-1 h-4 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[idx]} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(percent, count > 0 ? 3 : 0)}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-8 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No flashcards reviewed yet.</p>
          )}
        </div>

        {/* Strengths & Gaps */}
        <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Strengths & Gaps</h2>
          {categoryAvgs.length > 0 ? (
            <div className="space-y-4">
              {strengths.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-success-400 mb-2 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4" />
                    Strengths
                  </h3>
                  <div className="space-y-1">
                    {strengths.map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{s.label}</span>
                        <span className="text-success-400 font-mono">{s.avg}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {gaps.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-danger-500 mb-2 flex items-center gap-1.5">
                    <TrendingDown className="h-4 w-4" />
                    Needs Work
                  </h3>
                  <div className="space-y-1">
                    {gaps.map((g) => (
                      <div key={g.label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{g.label}</span>
                        <span className="text-danger-500 font-mono">{g.avg}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Complete quizzes to see strengths and gaps.</p>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="space-y-2">
            {recentActivity.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between py-2 border-b border-navy-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                  />
                  <div>
                    <span className="text-sm text-slate-300 capitalize">
                      {item.activity_type}
                    </span>
                    {item.activity_id && (
                      <span className="text-xs text-slate-500 ml-2">{item.activity_id}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.score !== null && item.score !== undefined && (
                    <span className="text-xs text-electric-400 font-mono">{item.score}%</span>
                  )}
                  <span className="text-xs text-slate-500">
                    {item.section && `Section ${item.section}`}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      item.status === 'completed'
                        ? 'bg-success-500/10 text-success-400'
                        : 'bg-warning-500/10 text-warning-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No activity recorded yet. Start studying!</p>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, subtext, color, bg }) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 p-5">
      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
      {subtext && <p className={`text-xs mt-1 ${color}`}>{subtext}</p>}
    </div>
  )
}
