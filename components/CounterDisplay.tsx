'use client'
import { useReadContract } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { COUNTER_ADDRESS, counterAbi } from '@/config/counter'

export function CounterDisplay() {
  const { data: count, isLoading } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: counterAbi,
    functionName: 'number',
    chainId: baseSepolia.id,
  })
  if (isLoading) return <p className="text-4xl font-bold">...</p>
  return <p className="text-4xl font-bold">{count?.toString() ?? '0'}</p>
}