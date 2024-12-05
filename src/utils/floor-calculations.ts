import { Floor } from "@/types/floor"

export function calculateUpgradeCost(level: number): number {
  return Math.round(10 * Math.pow(1.5, level - 1))
}

export function calculateNextProduction(currentProduction: number): number {
  return currentProduction * 1.2
}

export function calculateNextCapacity(currentCapacity: number): number {
  return currentCapacity * 1.1
}

export function getFloorUpgradeStats(floor: Floor) {
  return {
    nextProduction: calculateNextProduction(floor.production),
    nextCapacity: calculateNextCapacity(floor.capacity),
    upgradeCost: calculateUpgradeCost(floor.level)
  }
}