'use client'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { COUNTER_ADDRESS, counterAbi } from '@/config/counter'

export function IncrementButton() {
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash })

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