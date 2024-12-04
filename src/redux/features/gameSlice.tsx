import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@/types/game';
import { MANAGER_TYPES } from '@/types/manager';
import { getFloorUpgradeStats } from '@/utils/floor-calculations';

const INITIAL_STATE: GameState = {
  gold: 100,
  tokens: 0,
  tokensClaimed: 0,
  currentProduction: 0,
  floors: [
    {
      id: 1,
      level: 1,
      managers: [],
      production: 10,
      capacity: 100,
      upgradeCost: 15,
      saveCapacity: 0,
      bottomPosition:0,
    },
  ],
  currentShaft: 1,
  currentShaftCost: 30,
  elevator: {
    eBottomPosition: 0,
    level: 1,
    loadCapacity: 20,
    movementSpeed: 1.001,
    nextLoadCapacity: 35,
    nextMovementSpeed: 1.002,
    upgradeCost: 14,
    currentLoad:0,
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    updateGold: (state, action: PayloadAction<number>) => {
      state.gold = action.payload;
    },
    addGoldFromElevator: (state, action: PayloadAction<number>) => {
      state.gold += action.payload;
    },
    updateSaveCapacity: (state, action: PayloadAction<{ floorId: number; totalProduction: number }>) => {
      const floor = state.floors.find(f => f.id === action.payload.floorId);
      if (floor) {
        floor.saveCapacity = action.payload.totalProduction;
      }
    },
    updateBoxPosition: (state, action: PayloadAction<{ floorId: number; bottomPosition: number }>) => {
      const floor = state.floors.find(f => f.id === action.payload.floorId);
      if (floor) {
        floor.bottomPosition = action.payload.bottomPosition;
      }
    },
    updateElevatorPosition: (state, action: PayloadAction<{ bottomPosition: number }>) => {
        state.elevator.eBottomPosition = action.payload.bottomPosition;
    },
    hireManager: (state, action: PayloadAction<{ floorId: number; managerId: string }>) => {
      const { floorId, managerId } = action.payload;
      const managerType = MANAGER_TYPES.find(m => m.id === managerId);
      if (!managerType || state.gold < managerType.cost) return;

      state.gold -= managerType.cost;
      const floor = state.floors.find(f => f.id === floorId);
      if (floor) {
        floor.managers.push({
          id: floor.managers.length + 1,
          type: managerId,
          level: 1,
          production: floor.production*2
        });
      }
    },
    upgradeFloor: (state, action: PayloadAction<number>) => {
      const floor = state.floors.find(f => f.id === action.payload);
      if (!floor) return;

      const upgradeStats = getFloorUpgradeStats(floor);
      if (state.gold < upgradeStats.upgradeCost) return;

      state.gold -= upgradeStats.upgradeCost;
      floor.level += 1;
      floor.production = upgradeStats.nextProduction;
      floor.capacity = upgradeStats.nextCapacity;
      floor.upgradeCost = upgradeStats.upgradeCost;
    },
    collectFromFloor: (state, action: PayloadAction<number>) => {
      const floor = state.floors.find(f => f.id === action.payload);
      if (floor && floor.saveCapacity > 0) {
        const amountToCollect = Math.min(
          floor.saveCapacity,
          state.elevator.loadCapacity - state.elevator.currentLoad
        );
        floor.saveCapacity -= amountToCollect;
        state.elevator.currentLoad += amountToCollect;
      }
    },
    upgradeElevator: (state) => {
      if (state.gold < state.elevator.upgradeCost) return;

      state.gold -= state.elevator.upgradeCost;
      state.elevator.level += 1;
      state.elevator.loadCapacity = state.elevator.nextLoadCapacity;
      state.elevator.movementSpeed = state.elevator.nextMovementSpeed;
      state.elevator.nextLoadCapacity *= 2;
      state.elevator.nextMovementSpeed *= 1.05;
      state.elevator.upgradeCost *= 1.5;
    },
    emptyElevator: (state) => {
      state.gold += state.elevator.currentLoad;
      state.elevator.currentLoad = 0;
    },
    unlockNewShaft: (state) => {
      console.log('unlocking new shaft', state.currentShaftCost);
      if (state.gold < state.currentShaftCost) return;
      state.gold -= state.currentShaftCost;
      state.currentShaft += 1;
      state.currentShaftCost *= 2;
      state.floors.push({
        id: state.floors.length + 1,
        level: 1,
        managers: [],
        production: 10*((state.floors.length+1)*state.floors.length),
        capacity: 100,
        upgradeCost: 10,
        saveCapacity: 0,
        bottomPosition:0,
      });
    },
    updateCurrentProduction: (state, action: PayloadAction<number>) => {
      state.currentProduction = action.payload;
    }
  }
});

export const {
  updateGold,
  addGoldFromElevator,
  updateSaveCapacity,
  collectFromFloor,
  emptyElevator,
  hireManager,
  upgradeFloor,
  upgradeElevator,
  unlockNewShaft,
  updateElevatorPosition,
  updateBoxPosition,
  updateCurrentProduction
} = gameSlice.actions;

export default gameSlice.reducer;