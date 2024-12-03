import { useEffect, useRef, useState } from 'react';

export interface ElevatorPosition {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export const useElevatorPosition = () => {
  const elevatorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ElevatorPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (elevatorRef.current) {
        const rect = elevatorRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        });
      }
    };

    const observer = new MutationObserver(updatePosition);
    if (elevatorRef.current) {
      observer.observe(elevatorRef.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return { elevatorRef, position };
};