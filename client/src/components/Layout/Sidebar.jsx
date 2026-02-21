import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { studyPlan } from '../../data/studyPlan'
import {
  BookOpen,
  Brain,
  ArrowRightLeft,
  FlaskConical,
  MessageSquare,
  BarChart3,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Calendar,
  GraduationCap,
  UserCircle,
  X,
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

export default function Sidebar({ onClose }) {
  const { state } = useApp()
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState({ [state.currentSection]: true })

  function toggleSection(section) {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  function isActivityComplete(section, activityId) {
    return state.progress.some(
      (p) => p.section === section && p.activity_id === activityId && p.status === 'completed'
    )
  }

  function getSectionProgress(section) {
    const sectionPlan = studyPlan.find((d) => d.section === section)
    if (!sectionPlan) return 0
    const completed = sectionPlan.activities.filter((a) =>
      isActivityComplete(section, a.id)
    ).length
    return Math.round((completed / sectionPlan.activities.length) * 100)
  }

  return (
    <div className="flex h-full flex-col bg-navy-800 border-r border-navy-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-navy-600">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-electric-500" />
          <span className="text-lg font-bold text-white">Ontologist</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded hover:bg-navy-700 text-slate-400 hover:text-white transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Dashboard link */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? 'bg-electric-500/10 text-electric-500'
                : 'text-slate-400 hover:bg-navy-700 hover:text-slate-300'
            }`
          }
        >
          <Calendar className="h-4 w-4" />
          <span>Study Plan</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? 'bg-electric-500/10 text-electric-500'
                : 'text-slate-400 hover:bg-navy-700 hover:text-slate-300'
            }`
          }
        >
          <BarChart3 className="h-4 w-4" />
          <span>Progress</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? 'bg-electric-500/10 text-electric-500'
                : 'text-slate-400 hover:bg-navy-700 hover:text-slate-300'
            }`
          }
        >
          <UserCircle className="h-4 w-4" />
          <span>My Profile</span>
        </NavLink>

        <div className="pt-3 pb-1 px-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Curriculum
          </span>
        </div>

        {/* Section list */}
        {studyPlan.map((section) => {
          const isExpanded = expandedSections[section.section]
          const progress = getSectionProgress(section.section)
          const isSectionActive = location.pathname === `/section/${section.section}`

          return (
            <div key={section.section}>
              <button
                onClick={() => toggleSection(section.section)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isSectionActive
                    ? 'bg-electric-500/10 text-electric-500'
                    : 'text-slate-300 hover:bg-navy-700'
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-slate-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-500" />
                )}
                <span className="flex-1 text-left truncate">
                  Section {section.section}: {section.title}
                </span>
                {progress === 100 ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success-500" />
                ) : progress > 0 ? (
                  <span className="text-xs text-slate-500">{progress}%</span>
                ) : null}
              </button>

              {/* Expanded activities */}
              {isExpanded && (
                <div className="ml-4 pl-3 border-l border-navy-600 space-y-0.5 mt-1 mb-2">
                  {section.activities.map((activity) => {
                    const Icon = activityIcons[activity.type] || BookOpen
                    const completed = isActivityComplete(section.section, activity.id)

                    if (!activity.route) {
                      // Activities with external links only (e.g., Reading Guide)
                      return (
                        <NavLink
                          key={activity.id}
                          to={`/section/${section.section}`}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all duration-200 ${
                              isActive
                                ? 'bg-electric-500/10 text-electric-500'
                                : completed
                                  ? 'text-success-500/70 hover:bg-navy-700'
                                  : 'text-slate-400 hover:bg-navy-700 hover:text-slate-300'
                            }`
                          }
                        >
                          {completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-success-500" />
                          ) : (
                            <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                          )}
                          <span className="truncate">{activity.title}</span>
                        </NavLink>
                      )
                    }

                    return (
                      <NavLink
                        key={activity.id}
                        to={activity.route}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all duration-200 ${
                            isActive
                              ? 'bg-electric-500/10 text-electric-500'
                              : completed
                                ? 'text-success-500/70 hover:bg-navy-700'
                                : 'text-slate-400 hover:bg-navy-700 hover:text-slate-300'
                          }`
                        }
                      >
                        {completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-success-500" />
                        ) : (
                          <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                        )}
                        <span className="truncate">{activity.title}</span>
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
