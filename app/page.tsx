import { ConnectWallet } from '@/components/ConnectWallet'
import { CounterDisplay } from '@/components/CounterDisplay'
import { BatchIncrement } from '@/components/BatchIncrement'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center
      justify-center gap-8 p-8 bg-white">
      <h1 className="text-3xl font-bold">Onchain Counter</h1>
      <p className="text-gray-500">Connected to Base Sepolia</p>
      <ConnectWallet />
      <CounterDisplay />
      <BatchIncrement />
    </main>
  )
}