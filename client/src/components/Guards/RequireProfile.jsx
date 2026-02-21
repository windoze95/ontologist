import { useApp } from '../../context/AppContext'

export default function RequireProfile({ children, fallback, loading }) {
  const { state } = useApp()

  if (!state.profileLoaded) {
    return loading || (
      <div className="flex items-center justify-center h-screen bg-navy-900">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!state.profile) {
    return fallback || null
  }

  return children
}
