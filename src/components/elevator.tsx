"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ElevatorUpgradeModal } from "./elevator-modal";
import { buttonVariants } from "./animations/variant";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { formatNumber } from "@/utils/number-formatter";
import {
  collectFromFloor,
  emptyElevator,
} from "@/redux/features/gameSlice";
// import { formatNumber } from "@/utils/number-formatter"
interface ElevatorProps {
  progress: number;
  level: number;
  stats: {
    loadCapacity: number;
    movementSpeed: number;
    nextLoadCapacity: number;
    nextMovementSpeed: number;
    upgradeCost: number;
  };
  onUpgrade: () => void;
}

export function Elevator({ level, stats, onUpgrade }: ElevatorProps) {
    const [showUpgrade, setShowUpgrade] = useState(false)
    const elevatorState = useAppSelector(state => state.game.elevator)
  const dispatch = useAppDispatch();
  const floor = useAppSelector((state) => state.game.floors);
  //   const eBottomPosition = useAppSelector(state => state.game.elevator.eBottomPosition)
  //   const [isMovingUp, setIsMovingUp] = useState(false);
  const currentLoad = useAppSelector(
    (state) => state.game.elevator.currentLoad
  );
    const loadCapacity = useAppSelector(state => state.game.elevator.loadCapacity);

  //   const containerRef = useRef<HTMLDivElement>(null);
  //   const [flag, setFlag] = useState(false);
  //   // const [containerWidth, setContainerWidth] = useState(230);
  //   const [currentDuration, setCurrentDuration] = useState(6);
  //   const [position, setPosition] = useState(0)
  const [maxPosition, setMaxPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [flag, setFlag] = useState(true);
  const [isMovingUp, setIsMovingUp] = useState(true);
  const isMoving = true;
  useEffect(() => {
    console.log(floor);
    if (containerRef.current) {
      setPosition(containerRef.current.clientHeight - 10);
    }
  }, []);

  useEffect(() => {
    const moveElevator = () => {
      if (!isMoving || !containerRef.current) return;

      const newMaxPosition = containerRef.current.clientHeight - 7;

      // If maxPosition has changed, adjust the current position proportionally
      if (newMaxPosition !== maxPosition) {
        const ratio = newMaxPosition / maxPosition;
        setPosition((prevPosition) => (Math.round(prevPosition * ratio)));
      }

      setMaxPosition(newMaxPosition);

      if (isMovingUp) {
        if (position < newMaxPosition) {
          setPosition((prev) => Math.min(prev + elevatorState.movementSpeed, newMaxPosition));
        } else {
          setIsMovingUp(false);
        }
      } else {
        if (flag && position > 10) {
          setPosition((prev) => Math.max(prev - elevatorState.movementSpeed, 10));
        } else {
          setIsMovingUp(true);
        }
      }
    };

    const interval = setInterval(moveElevator, 50);
    return () => clearInterval(interval);
  }, [isMoving, isMovingUp, position, flag, maxPosition]);

  useEffect(() => {
    let j = 0;
    for (let i = 0; i < floor.length; i++) {
      if (floor[i].saveCapacity > 0) {
        j++;
      }
    }
    if (j > 0 && currentLoad < loadCapacity) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [floor,currentLoad]);

  useEffect(() => {
    const checkFloorInterval = setInterval(() => {
      floor.forEach((floorItem) => {
      
        // Check if elevator position matches floor position
        if (Math.abs(position - maxPosition).toFixed(0) === floorItem.bottomPosition.toString()) {
          dispatch(collectFromFloor(floorItem.id));
        }
      });
      // Check if elevator is at the top
      if (position == maxPosition) {
        dispatch(emptyElevator());
      }
    }, 20);

    return () => clearInterval(checkFloorInterval);
  }, [position, floor, dispatch]);

  return (
    <>
      <div className="relative w-[50px] h-full bg-blue-900 mx-auto">
        <motion.button
          onClick={() => setShowUpgrade(true)}
          className="absolute top-[-75px]"
          variants={buttonVariants}
          initial="initial"
          whileTap="tap"
        >
          <span className="text-white font-pixel text-sm">Level {level}</span>
          <div className="bg-[url('./assets/elevator.png')] bg-cover bg-center bg-no-repeat h-[50px] w-[50px]" />
        </motion.button>

        <div className="relative w-[50px] h-full bg-gray-300 overflow-hidden">
          <div
            ref={containerRef}
            className="relative h-full bg-blue-900 mx-auto bg-[url('./assets/elevatorl.png')] bg-contain bg-center"
          >
            <div
              className="absolute bg-cover bg-center bg-no-repeat w-full flex flex-col justify-center items-center"
              style={{
                top: `${
                  containerRef.current
                    ? containerRef.current.clientHeight - 20 - position
                    : 0
                }px`,
              }}
            >
              <p className="text-white text-xs">
                {currentLoad > 0 ? formatNumber(currentLoad) : ""}
              </p>
              <div
                className={` bg-cover bg-center bg-no-repeat w-full ${
                  currentLoad > 0
                    ? "bg-[url('./assets/elevator-top.png')] h-[20px]"
                    : "bg-[url('./assets/elevator-bottom.png')] h-[23px]"
                }`}
              >
                {" "}
              </div>
            </div>
          </div>
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
  );
}
