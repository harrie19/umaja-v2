import AgentStatus from '@/components/AgentStatus'
import LiveLogs from '@/components/LiveLogs'

export default function Home() {
  const agents = [
    {
      name: 'Trevor',
      status: 'active' as const,
      description: 'Philosophical content generator focusing on AI ethics and Bahá\'í principles',
      lastRun: '2 minutes ago',
      nextRun: 'Tomorrow 8:00 UTC',
      earnings: 1234.56,
    },
    {
      name: 'Nigel',
      status: 'pending' as const,
      description: 'Analytics and reporting agent for system metrics and revenue tracking',
      lastRun: undefined,
      nextRun: 'Development pending',
      earnings: 0,
    },
    {
      name: 'Percival',
      status: 'planned' as const,
      description: 'Community engagement and content distribution agent',
      lastRun: undefined,
      nextRun: 'Q1 2026',
      earnings: 0,
    },
  ]

  const handleRunNow = (agentName: string) => {
    console.log(`Triggering ${agentName} agent...`)
    // In production, this would trigger GitHub Actions workflow
    alert(`${agentName} agent execution triggered! Check GitHub Actions for progress.`)
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <header className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-white mb-4">
            🤖 UMAJA Dashboard
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Universal Monetary Autonomous Justice Architecture
          </p>
          <p className="text-white/75">
            Monitor autonomous agents • Track earnings • Ethical allocation
          </p>
        </header>

        {/* Agent Status Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            📊 Autonomous Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentStatus
                key={agent.name}
                {...agent}
                onRunNow={() => handleRunNow(agent.name)}
              />
            ))}
          </div>
        </section>

        {/* Live Logs */}
        <section className="mb-12">
          <LiveLogs />
        </section>

        {/* Footer Stats */}
        <section className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                €{agents.reduce((sum, a) => sum + a.earnings, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-white/75">Total Earnings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                {agents.filter(a => a.status === 'active').length}/{agents.length}
              </p>
              <p className="text-white/75">Active Agents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                €{(agents.reduce((sum, a) => sum + a.earnings, 0) * 0.19).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-white/75">Ethical Allocation (19%)</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/75">
          <p className="mb-2">
            <em>*adjusts spectacles*</em> Right then. Systems operating as expected.
          </p>
          <p className="text-sm">
            UMAJA v2.0.0 • Built with ❤️ for a more just world
          </p>
        </footer>
      </div>
    </main>
  )
}
