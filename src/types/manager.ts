export interface ManagerType {
    id: string
    name: string
    cost: number
    effect: string
    description: string
    icon: string
  }
  
  export const MANAGER_TYPES: ManagerType[] = [
    {
      id: 'vex',
      name: 'Vex',
      cost: 20000,
      effect: 'x2',
      description: 'Total Extraction',
      icon: '🤖'
    },
    {
      id: 'zor',
      name: 'Zor',
      cost: 40000,
      effect: 'x2',
      description: 'Capacity',
      icon: '🦾'
    },
    {
      id: 'myx',
      name: 'Myx',
      cost: 80000,
      effect: 'x2',
      description: 'Speed',
      icon: '⚡'
    },
    {
      id: 'crix',
      name: 'Crix',
      cost: 99000,
      effect: 'x2',
      description: 'Boost',
      icon: '💎'
    }
  ]
  
  