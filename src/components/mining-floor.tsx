"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Floor } from "@/types/floor";
import { ManagerUpgradeModal } from "./manager-upgrade-modal";
import { FloorUpgradeModal } from "./floor-upgrade-modal";
import { MANAGER_TYPES } from "@/types/manager";
import { getFloorUpgradeStats } from "@/utils/floor-calculations";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { updateBoxPosition } from "@/redux/features/gameSlice";
import { formatNumber } from "@/utils/number-formatter";
import Miner from "./miner";
interface MiningFloorProps {
  floor: Floor;
  onHireManager: (floorId: number, managerId: string) => void;
  onUpgradeFloor: (floorId: number) => void;
  gold: number;
  onUpdateSaveCapacity: (floorId: number, totalProduction: number) => void;
}
export function MiningFloor({
  floor,
  onHireManager,
  onUpgradeFloor,
  gold,
  onUpdateSaveCapacity,
}: MiningFloorProps) {

  const boxRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(350);
  const minerContainerRef = useRef<HTMLDivElement>(null);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const upgradeStats = getFloorUpgradeStats(floor);
  const [totalProduction, setTotalProduction] = useState(0);
  const dispatch = useAppDispatch();
  const floorSaveCapacity = useAppSelector(
    (state) =>
      state.game.floors.find((f) => f.id === floor.id)?.saveCapacity ?? 0
  );
  useEffect(() => {
    onUpdateSaveCapacity(floor.id, totalProduction);
  }, [totalProduction, floor.id]);
  useEffect(() => {
    // Update the total production display based on the floor's save capacity
    setTotalProduction(floorSaveCapacity);
  }, [floorSaveCapacity]);
  useEffect(() => {
    const updateWidth = () => {
      if (minerContainerRef.current) {
        console.log(containerWidth);
        const rect = minerContainerRef.current.getBoundingClientRect().width;
        setContainerWidth(rect);
      } 
    };
    const interval = setInterval(updateWidth, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const updatePosition = () => {
      if (boxRef.current) {
        // const rect = boxRef.current.clientHeight;
        // Add this position to your floor state through Redux or state management
        if(floor.id == 1) {
            const boxPosition = {
                floorId: floor.id,
                bottomPosition: 65,
            };
            dispatch(updateBoxPosition(boxPosition))
        } else {
            const boxPosition = {
                floorId: floor.id,
                bottomPosition: 65 + (110*(floor.id - 1)),
            };
            dispatch(updateBoxPosition(boxPosition))
        }

        // Dispatch action to update floor state with box position
        
      }
    };
    if(!floor.bottomPosition){
        const interval = setInterval(updatePosition, 1000);
        return () => clearInterval(interval);
    }  
  }, [floor.id]);
  return (
    <>
      <div className="relative h-24 bg-gray-900 border-b-2 border-gray-700 overflow-hidden group">
        <div className="bg-[url('./assets/floor.png')] bg-cover bg-center bg-no-repeat h-20 flex justify-between">
          <div className="flex">
            <div className="flex flex-col">
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  marginLeft: "15px",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid white", // Changed from borderBottom to borderTop
                }}
              />
              <div
                onClick={() => setShowUpgradeModal(true)}
                className="bg-[url('./assets/levelbox.png')] bg-cover bg-center ml-1 mt-3 bg-no-repeat h-10 w-10 flex justify-center items-center"
              >
                <p className="text-white font-pixel text-[8px]">
                  Level
                  <p className="w-full flex justify-center">{floor.level}</p>
                </p>
              </div>
            </div>
            <div className="bg-[url('./assets/wall.png')] bg-cover bg-center bg-no-repeat w-4 ml-3 flex justify-between"></div>
            {/* Miner container */}
          </div>
          <div ref={minerContainerRef} className="flex-1 w-full">
            <Miner
              containerWidth={230}
              onReachRight={() =>
                setTotalProduction((prev) => prev + floor.production)
              }
              key={floor.production} // This ensures Miner re-renders with new production value
            />
          </div>
          <div className="flex items-center justify-end h-full">
            {
                floor.managers.length === 0 ?
                (
                <motion.div
                    animate={{
                        y: [0, -0, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    onClick={() => setShowManagerModal(true)}
                    className="relative w-6 h-6 mr-[68px] mt-10"
                >
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white transform -translate-y-1/2" />
    
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-1 bg-white transform -translate-x-1/2" />
                </motion.div>
                )
                :(
                    <div className="relative w-[20px] h-[65px] mr-[80px] mt-4" onClick={() => setShowManagerModal(true)}>
                        <div className="absolute left-1/2 top-0 h-full w-[35px] transform -translate-x-1/2 bg-[url('./assets/robot.png')] bg-cover bg-center "></div>
                    </div>
                )
            }
          </div>
          <div className="absolute right-0 top-0">
            <div className="relative mr-1 top-[58px]">
              <span className="absolute bottom-full font-pixel ml-2 text-[12px] font-bold text-white pb-0 mb-0">
                {" "}
                <p className="text-xs">{formatNumber(floorSaveCapacity)}</p>
              </span>
              <div  ref={boxRef} className="bg-[url('./assets/box.png')] bg-cover bg-center ml-1 bg-no-repeat h-4 w-8"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-4 bg-[url('./assets/top.png')] bg-cover bg-center"></div>
      </div>

      <AnimatePresence>
        {showManagerModal && (
          <ManagerUpgradeModal
            managers={MANAGER_TYPES}
            onHire={(managerId) => {
              onHireManager(floor.id, managerId);
              setShowManagerModal(false);
            }}
            onClose={() => setShowManagerModal(false)}
            gold={gold}
          />
        )}

        {showUpgradeModal && (
          <FloorUpgradeModal
            floor={floor}
            upgradeStats={upgradeStats}
            onUpgrade={() => {
              onUpgradeFloor(floor.id);
            //   setShowUpgradeModal(false);
            }}
            onClose={() => setShowUpgradeModal(false)}
            gold={gold}
          />
        )}
      </AnimatePresence>
    </>
  );
}
