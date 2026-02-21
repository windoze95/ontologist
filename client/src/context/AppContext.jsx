import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  currentSection: 1,
  progress: [],
  flashcardProgress: [],
  stats: null,
  aiChatOpen: false,
  aiMessages: [],
  aiMode: 'tutor',
  profile: null,
  profileLoaded: false,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.payload }
case 'SET_PROGRESS':
      return { ...state, progress: action.payload }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: state.progress.some(
          (p) => p.section === action.payload.section && p.activity_id === action.payload.activity_id
        )
          ? state.progress.map((p) =>
              p.section === action.payload.section && p.activity_id === action.payload.activity_id
                ? { ...p, ...action.payload }
                : p
            )
          : [...state.progress, action.payload],
      }
    case 'SET_FLASHCARD_PROGRESS':
      return { ...state, flashcardProgress: action.payload }
    case 'SET_STATS':
      return { ...state, stats: action.payload }
    case 'TOGGLE_AI_CHAT':
      return { ...state, aiChatOpen: !state.aiChatOpen }
    case 'SET_AI_MESSAGES':
      return { ...state, aiMessages: action.payload }
    case 'ADD_AI_MESSAGE':
      return { ...state, aiMessages: [...state.aiMessages, action.payload] }
    case 'SET_AI_MODE':
      return { ...state, aiMode: action.payload }
    case 'SET_PROFILE':
      return { ...state, profile: action.payload }
    case 'SET_PROFILE_LOADED':
      return { ...state, profileLoaded: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'SET_PROGRESS', payload: data }))
      .catch(() => {})

    fetch('/api/progress/stats')
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'SET_STATS', payload: data }))
      .catch(() => {})

    fetch('/api/progress/flashcards')
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'SET_FLASHCARD_PROGRESS', payload: data }))
      .catch(() => {})

    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: 'SET_PROFILE', payload: data })
        dispatch({ type: 'SET_PROFILE_LOADED', payload: true })
      })
      .catch(() => {
        dispatch({ type: 'SET_PROFILE_LOADED', payload: true })
      })
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
