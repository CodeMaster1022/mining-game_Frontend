"use client"

import { useState, useEffect } from "react"
import { MiningFloor } from "@/components/mining-floor"
import { Elevator } from "@/components/elevator"
import { motion, AnimatePresence } from 'framer-motion'

// import { GameState } from "@/types/game"
import { MANAGER_TYPES } from "@/types/manager"
import { formatNumber } from "@/utils/number-formatter"
// import { getFloorUpgradeStats } from "@/utils/floor-calculations"
import "../styles/animations.css"
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { unlockNewShaft,hireManager,upgradeFloor, upgradeElevator, updateSaveCapacity } from "@/redux/features/gameSlice";
export default function SpaceMinerTycoon() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const gold = useAppSelector((state) => state.game.gold);
  const [elevatorProgress, setElevatorProgress] = useState(0);
  const [showGoldAnimation, setShowGoldAnimation] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const handleClick = () => {
    const result  = dispatch(unlockNewShaft());
    console.log(result, 'result');
    setIsExploding(true)
    setTimeout(() => setIsExploding(false), 2000) // Reset after 1 second
  }
  useEffect(() => {
    console.log(gameState.currentProduction, 'game currentProduction',showGoldAnimation);
  }, [gameState.currentProduction]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const newGold = gameState.gold + gameState.floors.reduce((acc, floor) => {
        const floorManagers = floor.managers.reduce((total, manager) => {
          const managerType = MANAGER_TYPES.find(m => m.id === manager.type);
          const multiplier = managerType?.effect === 'x2' ? 2 : 1;
          return total + (floor.production * multiplier);
        }, 0);
        return acc + (floorManagers || floor.production * 0.1);
      }, 0);

      if (newGold > gameState.gold) {
        setShowGoldAnimation(true);
        setTimeout(() => setShowGoldAnimation(false), 1000);
      }

      // dispatch(updateGold(newGold));
      setElevatorProgress(prev => (prev + 5) % 100);
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [dispatch, gameState.floors, gameState.gold]);

  const handleHireManager = (floorId: number, managerId: string) => {
    dispatch(hireManager({ floorId, managerId }));
  };

  const handleUpdateSaveCapacity = (floorId: number, totalProduction: number) => {
    dispatch(updateSaveCapacity({ floorId, totalProduction }));
  };

  const handleFloorUpgrade = (floorId: number) => {
    dispatch(upgradeFloor(floorId));
  };

  const handleElevatorUpgrade = () => {
    dispatch(upgradeElevator());
  };
  const particles = Array.from({ length: 20 }) 
  return (
    <div className="min-h-screen bg-black">
      <header className="p-4 bg-gray-800 relative">
        <div className="flex justify-between max-w-4xl mx-auto">
          <div className="text-white font-pixel pulse">Tokens: {formatNumber(gold)}</div>
          <div className="text-white font-pixel">Claimed: ${gameState.tokensClaimed}</div>
        </div>
      </header>

      <main className="max-w-full mx-auto mt-8">
        <div className="bg-[url('./assets/background1.png')] bg-cover bg-center bg-no-repeat h-[300px]" />
        <div className="grid grid-cols-[7fr_1fr]">
          <div className="bg-[url('./assets/top.png')] bg-cover bg-center bg-no-repeat h-[30px]" />
        </div>
        
        <div className="grid grid-cols-[7fr_1fr]">
          <div className="space-y-4">
            {gameState.floors.map(floor => (
              <MiningFloor
                key={floor.id}
                floor={floor}
                onHireManager={handleHireManager}
                onUpgradeFloor={handleFloorUpgrade}
                gold={gameState.gold}
                onUpdateSaveCapacity={handleUpdateSaveCapacity}
              />
            ))}
          </div>
          <Elevator 
            progress={elevatorProgress}
            level={gameState.elevator.level}
            stats={gameState.elevator}
            onUpgrade={handleElevatorUpgrade}
          />
        </div>
        <div className="relative">
          <div className="mt-8 text-center flex justify-center">
            <div 
              className="bg-[url('./assets/unlock.png')] bg-cover bg-center bg-no-repeat h-[55px] rounded-lg w-[150px] hover:bg-gray-600 text-white font-pixel transform transition-all duration-300 hover:scale-110"
              onClick={handleClick}
            >
              Unlock New Shaft Cost: {formatNumber(gameState.currentShaftCost)}
            </div>
          </div>
          <AnimatePresence>
        {isExploding &&
          particles.map((_, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.random() * 10 - 10,
                y: Math.random() * 10 - 10,
                opacity: 0,
                scale: Math.random() * 2 + 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
        </div>
      </main>
    </div>
  );
}