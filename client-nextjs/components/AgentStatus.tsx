import React from 'react'

export interface AgentStatusProps {
  name: string
  status: 'active' | 'pending' | 'planned' | 'inactive'
  description: string
  lastRun?: string
  nextRun?: string
  earnings: number
  onRunNow?: () => void
}

const statusColors = {
  active: 'bg-green-500',
  pending: 'bg-yellow-500',
  planned: 'bg-blue-500',
  inactive: 'bg-red-500',
}

const statusEmojis = {
  active: '🟢',
  pending: '🟡',
  planned: '🔵',
  inactive: '🔴',
}

const statusLabels = {
  active: 'Active',
  pending: 'Pending',
  planned: 'Planned',
  inactive: 'Inactive',
}

export default function AgentStatus({
  name,
  status,
  description,
  lastRun,
  nextRun,
  earnings,
  onRunNow,
}: AgentStatusProps) {
  const isRunnable = status === 'active'

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">{statusEmojis[status]}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${statusColors[status]}`}
              >
                {statusLabels[status]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Last Run</p>
          <p className="text-sm font-semibold text-gray-800">
            {lastRun || 'Never'}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Next Run</p>
          <p className="text-sm font-semibold text-gray-800">
            {nextRun || 'Not scheduled'}
          </p>
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-600 mb-1">Total Earnings</p>
        <p className="text-2xl font-bold text-purple-700">
          €{earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onRunNow}
        disabled={!isRunnable}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isRunnable
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isRunnable ? '▶️ Run Now' : '⏸️ Not Available'}
      </button>
    </div>
  )
}
