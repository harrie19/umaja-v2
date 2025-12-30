-- UMAJA Initial Database Schema
-- Version: 001
-- Created: 2025-12-30

-- Enable UUID extension (legacy - gen_random_uuid() is built-in for PostgreSQL 13+)
-- For older PostgreSQL versions, this enables UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- AGENTS TABLE
-- =====================================================
-- Stores autonomous agent configurations and status
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'pending', 'planned', 'inactive')),
    description TEXT,
    config JSONB DEFAULT '{}',
    total_earnings DECIMAL(10, 2) DEFAULT 0.00,
    last_run TIMESTAMP WITH TIME ZONE,
    next_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_type ON agents(type);
CREATE INDEX idx_agents_next_run ON agents(next_run);

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
-- Stores all financial transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('earning', 'cost', 'donation')),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_transactions_agent_id ON transactions(agent_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- =====================================================
-- ETHICAL_ALLOCATIONS TABLE
-- =====================================================
-- Stores ethical allocation calculations (19% rule)
CREATE TABLE ethical_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    allocation_type VARCHAR(30) NOT NULL CHECK (allocation_type IN ('huququllah', 'humanitarian')),
    amount DECIMAL(10, 2) NOT NULL,
    surplus_amount DECIMAL(10, 2) NOT NULL,
    threshold_amount DECIMAL(10, 2) NOT NULL DEFAULT 6500.00,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'allocated', 'distributed', 'cancelled')),
    user_opted_in BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_ethical_allocations_updated_at
    BEFORE UPDATE ON ethical_allocations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_ethical_allocations_transaction_id ON ethical_allocations(transaction_id);
CREATE INDEX idx_ethical_allocations_status ON ethical_allocations(status);
CREATE INDEX idx_ethical_allocations_type ON ethical_allocations(allocation_type);

-- =====================================================
-- EXECUTION_LOGS TABLE
-- =====================================================
-- Stores agent execution logs and metrics
CREATE TABLE execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'error', 'warning', 'info')),
    message TEXT NOT NULL,
    execution_time_ms INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_execution_logs_agent_id ON execution_logs(agent_id);
CREATE INDEX idx_execution_logs_status ON execution_logs(status);
CREATE INDEX idx_execution_logs_created_at ON execution_logs(created_at DESC);

-- =====================================================
-- INITIAL DATA
-- =====================================================
-- Insert initial agent data

INSERT INTO agents (name, type, status, description, config, next_run) VALUES
(
    'Trevor',
    'content_generator',
    'active',
    'Philosophical content generator focusing on AI ethics and Bahá''í principles',
    '{"schedule": "daily", "time": "08:00", "topics": ["ethics", "ai", "bahai", "automation"]}',
    NOW() + INTERVAL '1 day'
),
(
    'Nigel',
    'data_analyst',
    'pending',
    'Analytics and reporting agent for system metrics and revenue tracking',
    '{"schedule": "weekly", "reports": ["revenue", "allocations", "performance"]}',
    NULL
),
(
    'Percival',
    'community_manager',
    'planned',
    'Community engagement and content distribution agent',
    '{"platforms": ["twitter", "linkedin", "wordpress"], "schedule": "on_demand"}',
    NULL
);

-- =====================================================
-- VIEWS
-- =====================================================
-- View for agent performance summary
CREATE VIEW agent_performance AS
SELECT 
    a.id,
    a.name,
    a.status,
    a.total_earnings,
    COUNT(DISTINCT t.id) as transaction_count,
    COUNT(DISTINCT el.id) as execution_count,
    COUNT(DISTINCT CASE WHEN el.status = 'error' THEN el.id END) as error_count,
    MAX(el.created_at) as last_execution
FROM agents a
LEFT JOIN transactions t ON a.id = t.agent_id
LEFT JOIN execution_logs el ON a.id = el.agent_id
GROUP BY a.id, a.name, a.status, a.total_earnings;

-- View for ethical allocation summary
CREATE VIEW ethical_allocation_summary AS
SELECT 
    DATE_TRUNC('month', ea.created_at) as month,
    ea.allocation_type,
    COUNT(*) as allocation_count,
    SUM(ea.amount) as total_allocated,
    SUM(ea.surplus_amount) as total_surplus,
    AVG(ea.amount) as avg_allocation
FROM ethical_allocations ea
WHERE ea.status != 'cancelled'
GROUP BY DATE_TRUNC('month', ea.created_at), ea.allocation_type
ORDER BY month DESC, allocation_type;

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE agents IS 'Autonomous agent configurations and status tracking';
COMMENT ON TABLE transactions IS 'Financial transactions for revenue and costs';
COMMENT ON TABLE ethical_allocations IS 'Bahá''í-inspired ethical allocation calculations (19% rule)';
COMMENT ON TABLE execution_logs IS 'Agent execution logs and performance metrics';

COMMENT ON COLUMN ethical_allocations.threshold_amount IS 'Annual income threshold (default €6,500)';
COMMENT ON COLUMN ethical_allocations.surplus_amount IS 'Amount above threshold';
COMMENT ON COLUMN ethical_allocations.amount IS '19% of surplus amount';
COMMENT ON COLUMN ethical_allocations.user_opted_in IS 'Whether user voluntarily opted into ethical allocation';
