"use client"

import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ManagerType } from "@/types/manager"
import { modalVariants, listItemVariants, buttonVariants } from "./animations/variant"

interface ManagerUpgradeModalProps {
  managers: ManagerType[]
  onHire: (managerId: string) => void
  onClose: () => void
  gold: number
}

export function ManagerUpgradeModal({ managers, onHire, onClose, gold }: ManagerUpgradeModalProps) {
  return (
    <motion.div
      className="inset-0 bg-black/50 flex items-center justify-center z-999 absolute z-50"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="w-[330px] bg-blue-900 border-blue-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white font-pixel">Robot Manager</CardTitle>
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
          {managers.map((manager, index) => (
            <motion.div 
              key={manager.id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="bg-blue-800 py-1 px-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center text-2xl"
                  animate={{
                    y: [-2, 2, -2],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {manager.icon}
                </motion.div>
                <div>
                  <div className="text-white font-pixel text-xs">{manager.name}</div>
                  <div className="text-sm text-blue-200 font-pixel">
                    {manager.effect} {manager.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="text-yellow-400 font-pixel"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {manager.cost}k
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={() => onHire(manager.id)}
                    disabled={gold < manager.cost}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-pixel"
                  >
                    HIRE
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}