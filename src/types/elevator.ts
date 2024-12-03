export interface ElevatorStats {
  level: number;
  loadCapacity: number;
  movementSpeed: number;
  nextLoadCapacity: number;
  nextMovementSpeed: number;
  upgradeCost: number;
  currentLoad: number;
}