import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { studyPlan, referenceLinks } from '../../data/studyPlan'
import {
  BookOpen,
  Brain,
  ArrowRightLeft,
  FlaskConical,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Clock,
  ExternalLink,
  Play,
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

const statusBadge = {
  completed: { text: 'Completed', className: 'bg-success-500/20 text-success-500' },
  in_progress: { text: 'In Progress', className: 'bg-warning-500/20 text-warning-500' },
  not_started: { text: 'Not Started', className: 'bg-navy-600 text-slate-400' },
}

export default function SectionDetail() {
  const { sectionNum } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()

  const sectionNumber = parseInt(sectionNum, 10)
  const section = studyPlan.find((d) => d.section === sectionNumber)
  const sectionLinks = referenceLinks[sectionNumber] || []

  if (!section) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 mb-4">Section not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-electric-500 hover:text-electric-400 text-sm"
        >
          Back to Study Plan
        </button>
      </div>
    )
  }

  function getActivityStatus(activityId) {
    const entry = state.progress.find(
      (p) => p.section === sectionNumber && p.activity_id === activityId
    )
    return entry?.status || 'not_started'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-electric-500 mb-6 transition-all duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Study Plan
      </button>

      {/* Section header */}
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-electric-500 mb-1 block">
          Section {section.section} of 14
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">{section.title}</h1>
        <p className="text-slate-400">{section.description}</p>
      </div>

      {/* Activity cards */}
      <div className="space-y-4 mb-8">
        {section.activities.map((activity) => {
          const Icon = activityIcons[activity.type] || BookOpen
          const status = getActivityStatus(activity.id)
          const badge = statusBadge[status]

          return (
            <div
              key={activity.id}
              className="rounded-xl border border-navy-600 bg-navy-800 p-5 transition-all duration-200 hover:border-navy-500"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  status === 'completed'
                    ? 'bg-success-500/20'
                    : 'bg-electric-500/10'
                }`}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-success-500" />
                  ) : (
                    <Icon className="h-5 w-5 text-electric-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-base font-semibold text-white">{activity.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${badge.className}`}>
                      {badge.text}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{activity.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.timeEstimate}
                    </span>
                    {activity.route && (
                      <Link
                        to={activity.route}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-electric-500 hover:text-electric-400 transition-all duration-200"
                      >
                        <Play className="h-3.5 w-3.5" />
                        {status === 'completed' ? 'Review' : status === 'in_progress' ? 'Continue' : 'Start'}
                      </Link>
                    )}
                    {activity.links && activity.links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {activity.links.map((link, i) => {
                          const url = typeof link === 'string' ? link : link.url
                          const title = typeof link === 'string' ? `Link ${i + 1}` : link.title
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-electric-500/10 text-electric-500 hover:bg-electric-500/20 hover:text-electric-400 border border-electric-500/20 transition-all duration-200"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              {title}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Reference links */}
      {sectionLinks.length > 0 && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Reference Materials</h2>
          <div className="space-y-2">
            {sectionLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-electric-500 hover:text-electric-400 transition-all duration-200"
              >
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
