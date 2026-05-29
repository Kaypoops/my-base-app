import { ConnectWallet } from '@/components/ConnectWallet'
import { CounterDisplay } from '@/components/CounterDisplay'
import { BatchIncrement } from '@/components/BatchIncrement'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-blue-600">
      
      <div className="flex flex-col items-center gap-2">
        <div className="bg-blue-500 rounded-full px-4 py-1">
          <span className="text-white text-sm font-medium">⚡ Base Sepolia Testnet</span>
        </div>
        <h1 className="text-5xl font-bold text-white">Onchain Counter</h1>
        <p className="text-blue-100 text-lg">Your first smart contract on Base</p>
      </div>

      <div className="bg-white rounded-3xl p-10 flex flex-col items-center gap-8 w-full max-w-md">
        
        <div className="w-full">
          <p className="text-gray-400 text-xs uppercase tracking-widest text-center mb-3">Wallet</p>
          <ConnectWallet />
        </div>

        <div className="w-full border-t border-gray-100 pt-8 flex flex-col items-center gap-2">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Current Count</p>
          <div className="bg-blue-50 rounded-2xl px-12 py-6">
            <CounterDisplay />
          </div>
        </div>

        <div className="w-full border-t border-gray-100 pt-8">
          <BatchIncrement />
        </div>

        <p className="text-gray-300 text-xs text-center">
          Transactions recorded permanently on Base blockchain
        </p>
      </div>

      <div className="flex gap-6 text-white text-sm">
        <span>⚡ Fast</span>
        <span>💰 Low fees</span>
        <span>🔒 Secure</span>
      </div>
    </main>
  )
}