export const COUNTER_ADDRESS = '0x8be434418B3386CEad331777F21E58b7f704c3D2' as const

export const counterAbi = [
  {
    type: 'function', name: 'number',
    inputs: [], outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'increment',
    inputs: [], outputs: [],
    stateMutability: 'nonpayable',
  },
] as const