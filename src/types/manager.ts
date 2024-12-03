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
      cost: 200,
      effect: 'x2',
      description: 'Total Extraction',
      icon: '🤖'
    },
    {
      id: 'zor',
      name: 'Zor',
      cost: 400,
      effect: 'x2',
      description: 'Worker Capacity',
      icon: '🦾'
    },
    {
      id: 'myx',
      name: 'Myx',
      cost: 800,
      effect: 'x2',
      description: 'Mining Speed',
      icon: '⚡'
    },
    {
      id: 'crix',
      name: 'Crix',
      cost: 999,
      effect: 'x2',
      description: 'Boost to $SHT gather rate',
      icon: '💎'
    }
  ]
  
  