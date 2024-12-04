"use client"

import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { modalVariants, buttonVariants } from "./animations/variant"

interface ElevatorStats {
  level: number
  loadCapacity: number
  movementSpeed: number
  nextLoadCapacity: number
  nextMovementSpeed: number
  upgradeCost: number
}

interface ElevatorUpgradeModalProps {
  stats: ElevatorStats
  onUpgrade: () => void
  onClose: () => void
}

export function ElevatorUpgradeModal({ stats, onUpgrade, onClose }: ElevatorUpgradeModalProps) {
  return (
    <motion.div
      className="inset-0 flex items-center justify-center z-40 fixed mx-auto"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="w-[330px] bg-blue-900 border-blue-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white font-pixel text-xl">Elevator Level {stats.level}</CardTitle>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              variant="ghost" 
              className="text-white" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="text-sm text-blue-100 font-pixel mb-4"
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            Upgrade your Elevator to accelerate your progression
          </motion.div>
          
          <div className="space-y-4">
            <motion.div 
              className="bg-blue-800 py-1 px-3 rounded-lg flex justify-between items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.8)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="text-white font-pixel">Max load capacity</span>
              <div className="text-right">
                <div className="text-white font-pixel text-xs">{stats.loadCapacity.toFixed(1)}k</div>
                <motion.div 
                  className="text-green-400 font-pixel text-xs"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  +{(stats.nextLoadCapacity - stats.loadCapacity).toFixed(1)}k
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-800 py-1 px-3 rounded-lg flex justify-between items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.8)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="text-white font-pixel">Movement speed</span>
              <div className="text-right">
                <div className="text-white font-pixel text-xs">{stats.movementSpeed.toFixed(2)}</div>
                <motion.div 
                  className="text-green-400 text-xs font-pixel"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  +{(stats.nextMovementSpeed - stats.movementSpeed).toFixed(2)}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-800 p-3 rounded-lg opacity-50"
              animate={{
                backgroundPosition: ["0%", "200%"],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <div className="h-4 bg-blue-700 rounded"></div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-800 p-3 rounded-lg opacity-50"
              animate={{
                backgroundPosition: ["0%", "200%"],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <div className="h-4 bg-blue-700 rounded"></div>
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <motion.div 
              className="text-yellow-400 font-pixel"
              animate={{
                scale: [1, 1.1, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              {stats.upgradeCost.toFixed(1)}K
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                onClick={onUpgrade}
                className="bg-green-600 hover:bg-green-700 text-white font-pixel"
              >
                UPGRADE
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}