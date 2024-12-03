"use client"

import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Floor, FloorUpgradeStats } from "@/types/floor"
import { modalVariants, buttonVariants } from "./animations/variant"
import { formatNumber } from "@/utils/number-formatter";
interface FloorUpgradeModalProps {
  floor: Floor
  upgradeStats: FloorUpgradeStats
  onUpgrade: () => void
  onClose: () => void
  gold: number
}

export function FloorUpgradeModal({ 
  floor, 
  upgradeStats, 
  onUpgrade, 
  onClose,
  gold 
}: FloorUpgradeModalProps) {
  const canAfford = gold >= upgradeStats.upgradeCost
  const floorUpgradeVariable = floor.id/2;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="w-[330px] bg-blue-900 border-blue-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white font-pixel">Floor Level {floor.level}</CardTitle>
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
            Upgrade your Mining Floor to increase production
          </motion.div>
          
          <div className="space-y-4">
            <motion.div 
              className="bg-blue-800 py-1 px-3 rounded-lg flex justify-between items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.8)" }}
            >
              <span className="text-white font-pixel">Production Rate</span>
              <div className="text-right">
                <div className="text-white font-pixel text-xs">{formatNumber(floor.production*floorUpgradeVariable)}</div>
                <motion.div 
                  className="text-green-400 text-sm font-pixel"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  +{(upgradeStats.nextProduction - floor.production).toFixed(1)}/s
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-800 px-3 py-1 rounded-lg flex justify-between items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.8)" }}
            >
              <span className="text-white font-pixel text-xs">Storage Capacity</span>
              <div className="text-right">
                <div className="text-white font-pixel text-xs">{formatNumber(floor.capacity*floorUpgradeVariable)}</div>
                <motion.div 
                  className="text-green-400 text-xs font-pixel"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  +{(upgradeStats.nextCapacity - floor.capacity).toFixed(1)}
                </motion.div>
              </div>
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
              {upgradeStats.upgradeCost.toFixed(1)}K
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                onClick={onUpgrade}
                disabled={!canAfford}
                className={`${
                  canAfford 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white font-pixel`}
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