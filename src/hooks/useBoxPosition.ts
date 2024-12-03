import { useEffect, useRef, useState } from 'react';

export interface BoxPosition {
  top: number;
  left: number;
  right: number;
  bottom: number;
  floorId: number;
}

export const useBoxPosition = (floorId: number) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<BoxPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          floorId
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [floorId]);

  return { boxRef, position };
};