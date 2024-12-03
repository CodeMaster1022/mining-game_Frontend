"use client"

import { useState,useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ElevatorUpgradeModal } from "./elevator-modal"
import { buttonVariants } from "./animations/variant"
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { collectFromFloor, emptyElevator, updateElevatorPosition } from "@/redux/features/gameSlice";
// import { formatNumber } from "@/utils/number-formatter"
interface ElevatorProps {
  progress: number,
  level: number
  stats: {
    loadCapacity: number
    movementSpeed: number
    nextLoadCapacity: number
    nextMovementSpeed: number
    upgradeCost: number,
  }
  onUpgrade: () => void
}

export function Elevator({ level, stats, onUpgrade }: ElevatorProps) {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const elevatorState = useAppSelector(state => state.game.elevator)
  const dispatch = useAppDispatch()
  const floor = useAppSelector((state) => state.game.floors);
  const eBottomPosition = useAppSelector(state => state.game.elevator.eBottomPosition)
  const [isMovingUp, setIsMovingUp] = useState(false);
  const currentLoad = useAppSelector(state => state.game.elevator.currentLoad);
  const loadCapacity = useAppSelector(state => state.game.elevator.loadCapacity);
  const containerRef = useRef<HTMLDivElement>(null);
  // const [containerWidth, setContainerWidth] = useState(230);
  const [currentDuration, setCurrentDuration] = useState(6);
  useEffect(() => {
    const checkFloorInterval = setInterval(() => {
      floor.forEach((floorItem) => {
        // Check if elevator position matches floor position
        if (Math.abs(eBottomPosition - floorItem.bottomPosition) < 5) {
          dispatch(collectFromFloor(floorItem.id));
          const result = (6 * floor.length) / (floor.length-floorItem.id+1);
          setCurrentDuration(result)
        }
      });
  
      // Check if elevator is at the top
      if (eBottomPosition >= 385 && eBottomPosition <= 390) {
        dispatch(emptyElevator());
      }
    }, 20);
  
    return () => clearInterval(checkFloorInterval);
  }, [eBottomPosition, floor, dispatch]);
  const elevatorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentLoad >= loadCapacity) {
      setIsMovingUp(true);
    }
    // Reset to normal movement when elevator empties at top
    if (currentLoad === 0) {
      setIsMovingUp(false);
    }
  }, [currentLoad, loadCapacity, eBottomPosition]);
  useEffect(() => {
    const getElevatorPosition = () => {
      if (elevatorRef.current) {
        const rect = elevatorRef.current.getBoundingClientRect();
        const position = {
          bottomPosition: Math.round(rect.bottom)
        }
        dispatch(updateElevatorPosition(position));
        // You can use rect.bottom here for your logic
      }
    };
  
    const interval = setInterval(getElevatorPosition, 20);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div ref={containerRef} className="relative w-[50px] h-full bg-blue-900 mx-auto">
        <motion.button 
          onClick={() => setShowUpgrade(true)}
          className="absolute top-[-75px]"
          variants={buttonVariants}
          initial="initial"
          whileTap="tap"
        >
          <span className="text-white font-pixel text-sm">Level {level}</span>
          <div className="bg-[url('./assets/elevator.png')] bg-cover bg-center bg-no-repeat h-[50px] w-[50px]"/>                 
        </motion.button>

        <motion.div
          ref={elevatorRef}
          className="absolute w-full bg-transparent"
          style={{
          // height: '8px',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}
          animate={{
            bottom: isMovingUp ? '100%' : ['100%', '0%', '100%'],
          }}
          transition={{
          duration: isMovingUp ? currentDuration : 8 * floor.length,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1]
          }}
          >
        <div 
          className="bg-cover bg-center bg-no-repeat h-[20px] w-[50px] bg-[url('./assets/elevator-top.png')]"
          aria-hidden="true"
        />
        <div className="absolute top-[-20px] left-0 text-white font-pixel text-xs">
          {elevatorState.currentLoad.toFixed(1)}
        </div>
        </motion.div>
        
        <div className="bg-[url('./assets/elevatorl.png')] bg-contain bg-center h-full w-[50px] aspect-auto">
        </div>
      </div>

      <AnimatePresence>
        {showUpgrade && (
          <ElevatorUpgradeModal
            stats={{
              level,
              ...stats
            }}
            onUpgrade={() => {
              onUpgrade()
              setShowUpgrade(false)
            }}
            onClose={() => setShowUpgrade(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}