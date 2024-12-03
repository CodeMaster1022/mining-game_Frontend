import { useEffect, useState } from 'react'

export const usePeriodicMotion = (duration: number = 2000) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(prev => prev === 'right' ? 'left' : 'right')
    }, duration)

    return () => clearInterval(timer)
  }, [duration])

  return direction
}