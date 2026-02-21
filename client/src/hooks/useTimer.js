import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }, [isRunning])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSeconds(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const formatted = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`

  return { seconds, formatted, isRunning, start, pause, reset }
}
