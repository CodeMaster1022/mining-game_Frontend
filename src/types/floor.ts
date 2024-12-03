export interface Floor {
  id: number
  level: number
  managers: Manager[]
  production: number
  capacity: number
  upgradeCost: number,
  saveCapacity: number,
  bottomPosition:number,
}

export interface Manager {
  id: number
  type: string
  level: number
  production: number
}

export interface FloorUpgradeStats {
  nextProduction: number
  nextCapacity: number
  upgradeCost: number
}