import { useApp } from '../../context/AppContext'
import { studyPlan } from '../../data/studyPlan'
import { MessageCircle, Menu } from 'lucide-react'

export default function TopBar({ onMenuToggle }) {
  const { state, dispatch } = useApp()

  // Calculate overall progress
  const totalActivities = studyPlan.reduce((sum, d) => sum + d.activities.length, 0)
  const completedActivities = studyPlan.reduce((sum, section) => {
    return (
      sum +
      section.activities.filter((a) =>
        state.progress.some(
          (p) => p.section === section.section && p.activity_id === a.id && p.status === 'completed'
        )
      ).length
    )
  }, 0)
  const overallProgress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-navy-800 border-b border-navy-600">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-lg hover:bg-navy-700 text-slate-400 hover:text-white transition-all duration-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Title (mobile only) */}
      <span className="lg:hidden text-sm font-bold text-white">Ontologist</span>

      {/* Current section indicator */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Section</span>
        <span className="text-sm font-bold text-electric-500">{state.currentSection}</span>
        <span className="text-xs text-slate-500">of 14</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 flex items-center gap-3 max-w-md">
        <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-electric-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-slate-400 w-10 text-right">
          {overallProgress}%
        </span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* AI Chat toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_AI_CHAT' })}
          className={`p-2 rounded-lg transition-all duration-200 ${
            state.aiChatOpen
              ? 'bg-electric-500/20 text-electric-500'
              : 'hover:bg-navy-700 text-slate-400 hover:text-white'
          }`}
          title="Toggle AI Chat"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
