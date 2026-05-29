'use client'
import { useEffect } from 'react'
import {
  useSendCalls, useWaitForCallsStatus,
  useWriteContract, useWaitForTransactionReceipt,
  useAccount, useChainId,
} from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { encodeFunctionData } from 'viem'
import { base, baseSepolia } from 'wagmi/chains'
import { useWalletCapabilities } from '@/hooks/useWalletCapabilities'
import { COUNTER_ADDRESS_MAINNET, COUNTER_ADDRESS_SEPOLIA, counterAbi } from '@/config/counter'

export function BatchIncrement() {
  const { isConnected } = useAccount()
  const { supportsBatching } = useWalletCapabilities()
  if (!isConnected) return <p className="text-gray-400 text-sm">Connect your wallet first.</p>
  return supportsBatching ? <BatchFlow /> : <SequentialFlow />
}

function BatchFlow() {
  const chainId = useChainId()
  const address = chainId === base.id ? COUNTER_ADDRESS_MAINNET : COUNTER_ADDRESS_SEPOLIA
  const explorer = chainId === base.id ? 'basescan.org' : 'sepolia.basescan.org'
  const { data, sendCalls, isPending } = useSendCalls()
  const { isLoading: isConfirming, isSuccess } =
    useWaitForCallsStatus({ id: data?.id })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  const inc = encodeFunctionData({ abi: counterAbi, functionName: 'increment' })
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={() => sendCalls({
          calls: [
            { to: address, data: inc },
            { to: address, data: inc },
          ],
          chainId,
        })}
        disabled={isPending || isConfirming}
        className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold
          hover:bg-purple-700 disabled:opacity-50 disabled:cursor-wait transition-colors">
        {isPending ? 'Confirm in wallet...'
          : isConfirming ? 'Confirming on chain...'
          : 'Increment x2 (batch)'}
      </button>
      {isSuccess && <p className="text-green-600 text-sm">✓ Both increments confirmed!</p>}
    </div>
  )
}

function SequentialFlow() {
  const chainId = useChainId()
  const address = chainId === base.id ? COUNTER_ADDRESS_MAINNET : COUNTER_ADDRESS_SEPOLIA
  const explorer = chainId === base.id ? 'basescan.org' : 'sepolia.basescan.org'
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={() => writeContract({
          address, abi: counterAbi,
          functionName: 'increment', chainId,
        })}
        disabled={isPending || isConfirming}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait transition-colors">
        {isPending ? 'Confirm in MetaMask...'
          : isConfirming ? 'Confirming on chain...'
          : 'Increment Counter'}
      </button>
      {isSuccess && (
        <a href={`https://${explorer}/tx/${hash}`}
          target="_blank" className="text-sm text-blue-600 underline">
          View transaction on Basescan
        </a>
      )}
    </div>
  )
}