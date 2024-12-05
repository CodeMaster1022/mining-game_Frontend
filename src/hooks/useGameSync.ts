import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { saveGameState } from '@/api/gameApi';

const SAVE_INTERVAL = 2000; // 1 second

export function useGameSync(telegramId: string) {
  const gameState = useSelector((state: RootState) => state.game);
  const lastSaveRef = useRef<number>(Date.now());
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log("====>++++++++>>>>")
    const syncGame = async () => {
      const now = Date.now();
      if (now - lastSaveRef.current >= SAVE_INTERVAL) {
        try {
          await saveGameState(telegramId, gameState);
          lastSaveRef.current = now;
        } catch (error) {
          console.error('Failed to sync game state:', error);
        }
      }

      // Schedule next sync
      saveTimeoutRef.current = setTimeout(syncGame, SAVE_INTERVAL);
    };

    // Start sync cycle
    syncGame();

    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [gameState, telegramId]);
}