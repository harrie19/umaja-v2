import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

function App() {
  const [guardianStatus, setGuardianStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGuardianStatus()
    const interval = setInterval(fetchGuardianStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const fetchGuardianStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/umaja-core/status`)
      
      if (!response.ok) {
        throw new Error('API not available')
      }
      
      const result = await response.json()
      setGuardianStatus(result.data)
      setError(null)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching Guardian status:', error)
      setError(error.message)
      setLoading(false)
    }
  }

  const getStatusEmoji = (status) => {
    switch(status) {
      case 'operational': return '✅'
      case 'degraded': return '⚠️'
      case 'critical': return '🔴'
      default: return '❓'
    }
  }

  return (
    <div className="App">
      <div className="umaja-container">
        {/* Banner */}
        <div className="banner">
          <pre className="banner-text">
{`╔═══════════════════════════════════════════════════╗
║   🤖 UMAJA-WÄCHTER v4.2.2                        ║
║   Personality: C3PO + John Cleese (pure)          ║
║   Status: ${loading ? 'Initializing...' : guardianStatus?.guardian.status || 'Unknown'}              ║
╚═══════════════════════════════════════════════════╝`}
          </pre>
        </div>

        {loading ? (
          <div className="loading-message">
            <p>Right then. Here we are. Initializing Guardian systems...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <h2>Oh brilliant. An error.</h2>
            <p>The API server appears to be unavailable: {error}</p>
            <p className="hint">Start the server with: <code>npm run dev:server</code></p>
            <p className="personality">*sighs dramatically* Technology. Always so reliable.</p>
          </div>
        ) : (
          <>
            {/* Status Overview */}
            <div className="status-overview">
              <h2>Guardian Status</h2>
              <div className="status-grid">
                <div className="status-card">
                  <div className="status-header">
                    <span className="emoji">🔧</span>
                    <h3>Process Monitor</h3>
                  </div>
                  <div className="status-content">
                    <p><strong>PID:</strong> {guardianStatus.process.pid}</p>
                    <p><strong>Status:</strong> {guardianStatus.process.running ? '✅ Running' : '❌ Stopped'}</p>
                    <p><strong>Uptime:</strong> {guardianStatus.process.uptime}s</p>
                  </div>
                </div>

                <div className="status-card">
                  <div className="status-header">
                    <span className="emoji">💰</span>
                    <h3>GaiaNet Reward Points</h3>
                  </div>
                  <div className="status-content">
                    <p><strong>Current:</strong> {guardianStatus.gaianet.credits?.toLocaleString() || 'N/A'}</p>
                    <p><strong>Accumulated:</strong> {guardianStatus.gaianet.accumulated?.toLocaleString() || 'N/A'}</p>
                    <p className="small">Last sync: {guardianStatus.gaianet.lastSync ? new Date(guardianStatus.gaianet.lastSync).toLocaleTimeString() : 'Never'}</p>
                    <p className="small note" style={{marginTop: '8px', fontStyle: 'italic', color: '#888'}}>
                      Note: Promotional points, not withdrawable funds
                    </p>
                  </div>
                </div>

                <div className="status-card">
                  <div className="status-header">
                    <span className="emoji">🌱</span>
                    <h3>Bio-Matrix</h3>
                  </div>
                  <div className="status-content">
                    <p><strong>Calmag:</strong> {guardianStatus.bioMatrix.nutrition.calmag}</p>
                    <p><strong>Biobizz:</strong> {guardianStatus.bioMatrix.nutrition.biobizz}</p>
                    <p className="small">
                      Next feeding: {guardianStatus.bioMatrix.nextScheduledFeeding 
                        ? new Date(guardianStatus.bioMatrix.nextScheduledFeeding).toLocaleDateString() 
                        : 'Now (probably)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Message */}
            <div className="personality-message">
              <p>{guardianStatus.message}</p>
            </div>

            {/* System Info */}
            <div className="system-info">
              <p><strong>Guardian Version:</strong> {guardianStatus.guardian.version}</p>
              <p><strong>Personality:</strong> {guardianStatus.guardian.personality}</p>
              <p><strong>Overall Status:</strong> {getStatusEmoji(guardianStatus.guardian.status)} {guardianStatus.guardian.status}</p>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="footer">
          <p className="footnote">
            <em>*adjusts spectacles* I monitor processes, track transactions, and remind you about plant nutrition.</em>
          </p>
          <p className="footnote">It's not glamorous, but it's honest work.</p>
        </footer>
      </div>
    </div>
  )
}

export default App