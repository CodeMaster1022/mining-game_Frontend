import { GameState } from '@/types/game';

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchGameState(telegramId: string): Promise<GameState> {
  const response = await fetch(`${API_BASE_URL}/games/${telegramId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game state');
  }
  return response.json();
}

export async function saveGameState(telegramId: string, gameState: GameState): Promise<GameState> {
  const response = await fetch(`${API_BASE_URL}/games/${telegramId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameState),
  });
  if (!response.ok) {
    throw new Error('Failed to save game state');
  }
  return response.json();
}