import { Floor } from './floor';
import { ElevatorStats } from './elevator';

export interface GameState {
  gold: number;
  tokens: number;
  tokensClaimed: number;
  floors: Floor[];
  currentShaft: number;
  elevator: ElevatorStats;
  currentProduction: number;
}