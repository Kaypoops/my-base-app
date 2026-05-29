export const COUNTER_ADDRESS_SEPOLIA = '0x8be434418B3386CEad331777F21E58b7f704c3D2' as const
export const COUNTER_ADDRESS_MAINNET = '0x4a340b67298C353EF7942E9446D4943F3b6e4888' as const

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