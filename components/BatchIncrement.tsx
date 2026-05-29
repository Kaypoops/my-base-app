'use client'
import { useEffect } from 'react'
import {
  useSendCalls, useWaitForCallsStatus,
  useWriteContract, useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { encodeFunctionData } from 'viem'
import { baseSepolia } from 'wagmi/chains'
import { useWalletCapabilities } from '@/hooks/useWalletCapabilities'
import { COUNTER_ADDRESS, counterAbi } from '@/config/counter'

export function BatchIncrement() {
  const { isConnected } = useAccount()
  const { supportsBatching } = useWalletCapabilities()
  if (!isConnected) return <p>Connect your wallet first.</p>
  return supportsBatching ? <BatchFlow /> : <SequentialFlow />
}

function BatchFlow() {
  const { data, sendCalls, isPending } = useSendCalls()
  const { isLoading: isConfirming, isSuccess } =
    useWaitForCallsStatus({ id: data?.id })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  const inc = encodeFunctionData({ abi: counterAbi, functionName: 'increment' })
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => sendCalls({
          calls: [
            { to: COUNTER_ADDRESS, data: inc },
            { to: COUNTER_ADDRESS, data: inc },
          ],
          chainId: baseSepolia.id,
        })}
        disabled={isPending || isConfirming}
        className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold
          hover:bg-purple-700 disabled:opacity-50 disabled:cursor-wait">
        {isPending ? 'Confirm in wallet...'
          : isConfirming ? 'Confirming on chain...'
          : 'Increment x2 (batch)'}
      </button>
      {isSuccess && <p className="text-green-600 text-sm">✓ Both increments confirmed!</p>}
    </div>
  )
}

function SequentialFlow() {
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => writeContract({
          address: COUNTER_ADDRESS, abi: counterAbi,
          functionName: 'increment', chainId: baseSepolia.id,
        })}
        disabled={isPending || isConfirming}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait">
        {isPending ? 'Confirm in MetaMask...'
          : isConfirming ? 'Confirming on chain...'
          : 'Increment Counter'}
      </button>
      {isSuccess && (
        <a href={`https://sepolia.basescan.org/tx/${hash}`}
          target="_blank" className="text-sm text-blue-600 underline">
          View transaction on Basescan
        </a>
      )}
    </div>
  )
}