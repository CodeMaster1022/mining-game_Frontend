"use client"

import { motion } from 'framer-motion'

interface MovingMonitorProps {
  width?: number
  height?: number
  color?: string
  duration?: number
}

export default function MovingMonitor({
  width = 300,
  height = 200,
  color = "#3498db",
  duration = 2
}: MovingMonitorProps) {
  return (
    <div 
      className="relative overflow-hidden bg-gray-200 rounded-lg"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <motion.div
        className="absolute top-0 bottom-0 rounded"
        style={{ 
          width: `${width / 5}px`,
          backgroundColor: color
        }}
        animate={{
          left: [`0px`, `${width - width / 5}px`, `0px`]
        }}
        transition={{
          duration: duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  )
}
