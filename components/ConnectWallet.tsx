'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isReconnecting) return <div className="text-gray-500 text-sm">Reconnecting...</div>
  if (!isConnected) return (
    <div className="flex flex-col gap-2 w-full">
      {connectors.map(c => (
        <button key={c.uid} onClick={() => connect({ connector: c })}
          disabled={isConnecting}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold
            hover:bg-blue-700 disabled:opacity-50 transition-colors">
          Connect {c.name}
        </button>
      ))}
    </div>
  )
  return (
    <div className="flex items-center justify-between w-full bg-gray-50 rounded-xl px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="font-mono text-sm text-gray-700">{address?.slice(0,6)}...{address?.slice(-4)}</span>
      </div>
      <button onClick={() => disconnect()}
        className="text-xs text-gray-400 hover:text-red-500 transition-colors">
        Disconnect
      </button>
    </div>
  )
}