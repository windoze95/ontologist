import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { studyPlan } from '../../data/studyPlan'
import {
  BookOpen,
  Brain,
  ArrowRightLeft,
  FlaskConical,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Clock,
} from 'lucide-react'

const activityIcons = {
  flashcard: Brain,
  quiz: BookOpen,
  rosetta: ArrowRightLeft,
  lab: FlaskConical,
  interview: MessageSquare,
  tutor: MessageSquare,
  exercise: ArrowRightLeft,
  reading: BookOpen,
}

export default function StudyPlan() {
  const { state } = useApp()
  const navigate = useNavigate()

  function isActivityComplete(section, activityId) {
    return state.progress.some(
      (p) => p.section === section && p.activity_id === activityId && p.status === 'completed'
    )
  }

  function getSectionProgress(section) {
    const sectionPlan = studyPlan.find((d) => d.section === section.section)
    if (!sectionPlan) return { completed: 0, total: 0, percent: 0 }
    const completed = sectionPlan.activities.filter((a) =>
      isActivityComplete(section.section, a.id)
    ).length
    const total = sectionPlan.activities.length
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Ontologist</h1>
        <p className="text-slate-400">
          Comprehensive study plan to master the Palantir Forward Deployed Engineer role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {studyPlan.map((section) => {
          const progress = getSectionProgress(section)
          const isCurrentSection = state.currentSection === section.section

          return (
            <button
              key={section.section}
              onClick={() => navigate(`/section/${section.section}`)}
              className={`text-left rounded-xl border p-5 transition-all duration-200 hover:border-electric-500/50 hover:bg-navy-700/50 ${
                isCurrentSection
                  ? 'border-electric-500/30 bg-navy-800'
                  : 'border-navy-600 bg-navy-800'
              }`}
            >
              {/* Section header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono uppercase tracking-wider ${
                      isCurrentSection ? 'text-electric-500' : 'text-slate-500'
                    }`}>
                      Section {section.section}
                    </span>
                    {progress.percent === 100 && (
                      <CheckCircle2 className="h-4 w-4 text-success-500" />
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 mt-1 flex-shrink-0" />
              </div>

              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{section.description}</p>

              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress.percent === 100 ? 'bg-success-500' : 'bg-electric-500'
                    }`}
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {progress.completed}/{progress.total}
                </span>
              </div>

              {/* Activity list */}
              <div className="space-y-1.5">
                {section.activities.map((activity) => {
                  const Icon = activityIcons[activity.type] || BookOpen
                  const completed = isActivityComplete(section.section, activity.id)

                  return (
                    <div key={activity.id} className="flex items-center gap-2 text-xs">
                      {completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success-500 flex-shrink-0" />
                      ) : (
                        <Icon className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                      )}
                      <span
                        className={
                          completed ? 'text-success-500/70 line-through' : 'text-slate-400'
                        }
                      >
                        {activity.title}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-slate-600">
                        <Clock className="h-3 w-3" />
                        {activity.timeEstimate}
                      </span>
                    </div>
                  )
                })}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
