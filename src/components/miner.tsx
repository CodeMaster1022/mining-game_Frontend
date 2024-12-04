import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';

interface MinerProps {
  containerWidth: number;
  onReachRight: () => void;
}

const Miner: React.FC<MinerProps> = ({ containerWidth, onReachRight }) => {
  const [scope, animate] = useAnimate();
  const [isMovingRight, setIsMovingRight] = useState(true);
  const [isSpecialState, setIsSpecialState] = useState(false);
  const isAnimatingRef = useRef(true);
  // const [mineWidth, setMineWidth] = useState(containerWidth);
  // useEffect(()=>{
  //   setMineWidth(containerWidth)
  // },[containerWidth])
  const playSpecialAnimation = async () => {
    if (!isAnimatingRef.current) return;
    
    setIsSpecialState(true);
    
    try {
      await animate(scope.current, {
        x: [-2, 2, -2, 0],
        y: [-4, 4, -4, 0]
      }, {
        duration: 1,
        ease: "linear",
        repeat: 2
      });

      if (isAnimatingRef.current) {
        setIsSpecialState(false);
        startAnimation();
      }
    } catch (error) {
      // Handle any animation errors
      console.log("Animation interrupted");
    }
  };

  const startAnimation = async () => {
    while (isAnimatingRef.current) {
      try {
        // Move right
        setIsMovingRight(true);
        await animate(scope.current, { 
          x: containerWidth,
          y: [0, -4, 0, -4, 0, -4, 0],
        }, { 
          duration: 4,
          ease: "linear" 
        });

        if (!isAnimatingRef.current) break;
        onReachRight();

        // Move left
        setIsMovingRight(false);
        await animate(scope.current, { 
          x: 0,
          y: [0, -4, 0, -4, 0, -4, 0],
        }, { 
          duration: 4,
          ease: "linear" 
        });

        if (!isAnimatingRef.current) break;
        await playSpecialAnimation();
      } catch (error) {
        // Handle any animation errors
        console.log("Animation interrupted");
        break;
      }
    }
  };

  useEffect(() => {
    isAnimatingRef.current = true;
    startAnimation();

    return () => {
      isAnimatingRef.current = false;
    };
  }, [containerWidth]);

  return (
    <motion.div
      ref={scope}
      className="absolute bottom-4 w-6 h-12"
      initial={{ x: 0, y: 0 }}
    >
      <div 
        className={`bg-cover bg-center ml-1 mt-1 bg-no-repeat h-10 flex justify-center items-center ${
          isSpecialState 
            ? "bg-[url('./assets/stopminer.png')] w-10" 
            : isMovingRight 
              ? "bg-[url('./assets/miner1.png')] w-6" 
              : "bg-[url('./assets/miner2.png')] w-6"
        }`}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default Miner;