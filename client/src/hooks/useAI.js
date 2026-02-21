import { useState, useCallback } from 'react'

export function useAI(mode = 'tutor') {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(
    async (content) => {
      const userMessage = { role: 'user', content }
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages, mode }),
        })

        if (!res.ok) throw new Error('AI request failed')

        const data = await res.json()
        const assistantMessage = {
          role: 'assistant',
          content: data.content?.[0]?.text || 'No response',
        }
        setMessages([...newMessages, assistantMessage])
        return assistantMessage
      } catch (err) {
        setError(err.message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [messages, mode]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, loading, error, sendMessage, clearMessages, setMessages }
}

export function useProgress() {
  const updateProgress = useCallback(async (section, activityType, activityId, status, score) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          activity_type: activityType,
          activity_id: activityId,
          status,
          score,
        }),
      })
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }, [])

  const updateFlashcard = useCallback(async (cardId, correct) => {
    try {
      const res = await fetch('/api/progress/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_id: cardId, correct }),
      })
      return await res.json()
    } catch (err) {
      console.error('Failed to update flashcard:', err)
    }
  }, [])

  const saveQuizResult = useCallback(async (section, quizId, answers, score, timeSpent) => {
    try {
      const res = await fetch('/api/progress/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          quiz_id: quizId,
          answers,
          score,
          time_spent_seconds: timeSpent,
        }),
      })
      return await res.json()
    } catch (err) {
      console.error('Failed to save quiz result:', err)
    }
  }, [])

  const saveInterview = useCallback(async (type, transcript, feedback, duration) => {
    try {
      const res = await fetch('/api/progress/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interview_type: type,
          transcript,
          ai_feedback: feedback,
          duration_seconds: duration,
        }),
      })
      return await res.json()
    } catch (err) {
      console.error('Failed to save interview:', err)
    }
  }, [])

  return { updateProgress, updateFlashcard, saveQuizResult, saveInterview }
}
