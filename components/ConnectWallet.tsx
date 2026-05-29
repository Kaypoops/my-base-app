'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isReconnecting) return <div>Reconnecting...</div>
  if (!isConnected) return (
    <div className="flex flex-col gap-2">
      {connectors.map(c => (
        <button key={c.uid} onClick={() => connect({ connector: c })}
          disabled={isConnecting}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Connect {c.name}
        </button>
      ))}
    </div>
  )
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm">{address?.slice(0,6)}...{address?.slice(-4)}</span>
      <button onClick={() => disconnect()}
        className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
        Disconnect
      </button>
    </div>
  )
}