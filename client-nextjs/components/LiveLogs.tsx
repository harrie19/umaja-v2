'use client'

import React, { useState, useEffect } from 'react'

export interface LogEntry {
  timestamp: string
  agent: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

const typeColors = {
  success: 'text-green-600 bg-green-50 border-green-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
}

const typeEmojis = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
}

export default function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: new Date().toISOString(),
      agent: 'System',
      message: 'UMAJA Dashboard initialized',
      type: 'info',
    },
    {
      timestamp: new Date(Date.now() - 120000).toISOString(),
      agent: 'Trevor',
      message: 'Article generated successfully for day 1',
      type: 'success',
    },
    {
      timestamp: new Date(Date.now() - 180000).toISOString(),
      agent: 'Trevor',
      message: 'Ethical allocation calculated: €23.46',
      type: 'info',
    },
  ])

  // Simulate live log updates (in production, this would connect to Supabase realtime)
  useEffect(() => {
    const interval = setInterval(() => {
      // Uncomment to simulate new logs
      // const newLog: LogEntry = {
      //   timestamp: new Date().toISOString(),
      //   agent: 'System',
      //   message: 'Health check completed',
      //   type: 'success',
      // }
      // setLogs((prev) => [newLog, ...prev].slice(0, 20))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📜 Live Logs</h2>
        <span className="flex items-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No logs yet. Waiting for agent activity...</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 ${typeColors[log.type]} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-lg">{typeEmojis[log.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1">
                      {log.agent}
                    </p>
                    <p className="text-sm break-words">{log.message}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimestamp(log.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Logs are updated in real-time. Recent activity shown above.
        </p>
      </div>
    </div>
  )
}
