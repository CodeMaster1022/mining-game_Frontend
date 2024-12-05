import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@/types/game';
import { MANAGER_TYPES } from '@/types/manager';

const INITIAL_STATE: GameState = {
  gold: 0,
  tokens: 0,
  tokensClaimed: 0,
  currentProduction: 0,
  floors: [
    {
      id: 1,
      level: 1,
      managers: [],
      production: 20,
      capacity: 100,
      upgradeCost: 10,
      saveCapacity: 0,
      bottomPosition:0,
    },
  ],
  currentShaft: 1,
  currentShaftCost: 500,
  elevator: {
    eBottomPosition: 0,
    level: 1,
    loadCapacity: 600,
    movementSpeed: 1.5,
    nextLoadCapacity:600*1.33,
    nextMovementSpeed: 1.51,
    upgradeCost: 300,
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
    updateGameState: (_state, action: PayloadAction<GameState>) => {
      return action.payload;
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
        // Simply double the current production
        const newProduction = floor.production * 2;
        
        floor.managers.push({
          id: floor.managers.length + 1,
          type: managerId,
          level: 1,
          production: newProduction
        });

        floor.production = newProduction;
      }
    },
    upgradeFloor: (state, action: PayloadAction<number>) => {
      const floor = state.floors.find(f => f.id === action.payload);
      if (!floor) return;

      // const upgradeStats = getFloorUpgradeStats(floor);
      if (state.gold < floor.upgradeCost) return;

      state.gold -= floor.upgradeCost;
      floor.level += 1;
      floor.production *= 1.15;
      floor.capacity *= 1.1;
      floor.upgradeCost *=1.2;
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
      state.elevator.loadCapacity = state.elevator.loadCapacity * 1.33;
      state.elevator.movementSpeed += 0.01 ;
      state.elevator.nextLoadCapacity *= 1.33;
      state.elevator.nextMovementSpeed += 0.01;
      state.elevator.upgradeCost *= 1.16;
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
      state.currentShaftCost *= 10;
      state.floors.push({
        id: state.floors.length + 1,
        level: 1,
        managers: [],
        // production: 10^((state.floors.length+1)*state.floors.length),
        production: 10 ** ((state.floors.length + 1)),
        capacity: 100,
        upgradeCost: 10 ** ((state.floors.length + 2)),
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
  updateGameState,
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