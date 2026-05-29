'use client'
import { useReadContract, useChainId } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { COUNTER_ADDRESS_MAINNET, COUNTER_ADDRESS_SEPOLIA, counterAbi } from '@/config/counter'

export function CounterDisplay() {
  const chainId = useChainId()
  const address = chainId === base.id ? COUNTER_ADDRESS_MAINNET : COUNTER_ADDRESS_SEPOLIA

  const { data: count, isLoading } = useReadContract({
    address,
    abi: counterAbi,
    functionName: 'number',
    chainId,
  })

  if (isLoading) return <p className="text-4xl font-bold">...</p>
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-4xl font-bold">{count?.toString() ?? '0'}</p>
      <p className="text-xs text-gray-400">
        {chainId === base.id ? '🟢 Base Mainnet' : '🔵 Base Sepolia'}
      </p>
    </div>
  )
}