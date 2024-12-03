import { useEffect, useState, RefObject } from 'react';

export function useElementWidth(elementRef: RefObject<HTMLElement>) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.clientWidth);
      }
    };

    // Initial width measurement
    updateWidth();

    // Set up resize observer for more reliable width tracking
    const resizeObserver = new ResizeObserver(updateWidth);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    // Cleanup
    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return width;
}