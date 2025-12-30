# 🤖 UMAJA Autonomous Agents

## Overview

UMAJA employs three autonomous agents, each with a distinct role in the system's operation. These agents work independently, generating revenue through their specialized tasks while maintaining ethical allocation principles.

---

## 📊 Agent Status

| Agent | Status | Purpose | Revenue Source |
|-------|--------|---------|----------------|
| 🤖 **Trevor** | 🟢 Active | Content Generation | Content monetization |
| 📈 **Nigel** | 🟡 Pending | Analytics & Reporting | Insight services |
| 🌐 **Percival** | 🔵 Planned | Community Management | Engagement services |

---

## 🎯 Agent Profiles

### Trevor - The Philosopher 🤖

**Status:** 🟢 Active  
**Type:** Content Generator  
**Schedule:** Daily at 8:00 UTC

#### Purpose
Trevor generates thoughtful, philosophical articles about AI ethics, autonomous systems, and Bahá'í-inspired principles of justice and voluntary participation.

#### Capabilities
- Daily content generation
- Topic rotation (8 core topics)
- Markdown article creation
- JSON metadata logging
- Ethical revenue allocation

#### Revenue Model
- Content monetization through various channels
- 19% ethical allocation on surplus above €6,500 threshold
- Voluntary opt-in participation

#### Technical Details
```python
Location: scripts/trevor.py
Workflow: .github/workflows/trevor-daily.yml
Output: content/articles/
Dependencies: Python 3.11, requests, python-dotenv
```

#### Development Checklist
- [x] Python script created
- [x] GitHub Actions workflow configured
- [x] Ethical calculator integrated
- [x] Test mode implemented
- [ ] OpenAI integration (production)
- [ ] WordPress distribution
- [ ] Monetization setup

---

### Nigel - The Analyst 📈

**Status:** 🟡 Pending Development  
**Type:** Data Analyst  
**Schedule:** Weekly

#### Purpose
Nigel analyzes system performance, revenue metrics, and ethical allocation effectiveness. Generates comprehensive reports for transparency and optimization.

#### Planned Capabilities
- Weekly performance reports
- Revenue tracking and forecasting
- Ethical allocation analysis
- System health monitoring
- Trend identification

#### Revenue Model
- Insight-as-a-Service offerings
- Analytics reports for stakeholders
- Custom data analysis requests

#### Development Checklist
- [ ] Python script creation
- [ ] GitHub Actions workflow
- [ ] Supabase integration
- [ ] Report generation logic
- [ ] Email/notification system
- [ ] Dashboard integration

---

### Percival - The Connector 🌐

**Status:** 🔵 Planned  
**Type:** Community Manager  
**Schedule:** On-demand

#### Purpose
Percival manages community engagement, content distribution, and social media presence. Ensures UMAJA's message reaches appropriate audiences.

#### Planned Capabilities
- Cross-platform content distribution
- Community interaction monitoring
- Engagement analytics
- Response suggestions
- Content scheduling

#### Revenue Model
- Community engagement services
- Content distribution fees
- Social media management

#### Development Checklist
- [ ] Python script creation
- [ ] API integrations (Twitter, LinkedIn, WordPress)
- [ ] Content queue system
- [ ] Engagement tracking
- [ ] Response templates
- [ ] Analytics dashboard

---

## 🔧 Agent Development Guide

### Creating a New Agent

1. **Create Agent Script**
   ```bash
   # Location: scripts/agent_name.py
   # Template structure:
   
   class AgentName:
       def __init__(self, test_mode=False):
           self.agent_name = "AgentName"
           self.version = "1.0.0"
       
       def run(self):
           # Main execution logic
           pass
   ```

2. **Create GitHub Actions Workflow**
   ```yaml
   # Location: .github/workflows/agent-name.yml
   name: Agent Name Execution
   on:
     schedule:
       - cron: '0 * * * *'  # Adjust schedule
     workflow_dispatch:
   
   jobs:
     execute:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-python@v5
         - run: python scripts/agent_name.py
   ```

3. **Add to Database**
   ```sql
   INSERT INTO agents (name, type, status, description, config)
   VALUES (
     'AgentName',
     'agent_type',
     'active',
     'Description of agent',
     '{"schedule": "hourly"}'
   );
   ```

4. **Update Dashboard**
   - Add agent card to `client/app/page.tsx`
   - Configure status badge color
   - Set up live log integration

### Agent Communication

Agents can communicate via:
- **Database:** Shared execution_logs table
- **File System:** content/ directory
- **GitHub Actions:** Workflow triggers
- **Webhooks:** n8n integrations

---

## 🧪 Testing Agents

### Local Testing

```bash
# Test Trevor agent
python scripts/trevor.py --test --day 1

# Test with specific parameters
python scripts/trevor.py --test --day 100

# Production mode (requires API keys)
python scripts/trevor.py --day 1
```

### GitHub Actions Testing

1. Navigate to **Actions** tab in GitHub repository
2. Select the agent workflow (e.g., "Trevor Daily Content Generation")
3. Click **Run workflow**
4. Enable **test_mode** option
5. Click **Run workflow** button

### Expected Output

Successful execution should:
- ✅ Generate content/output files
- ✅ Create JSON metadata
- ✅ Log execution details
- ✅ Commit to repository (in workflows)
- ✅ Exit with code 0

---

## 📊 Monitoring

### Dashboard View
- Real-time agent status
- Last execution time
- Next scheduled run
- Earnings to date
- Error count

### Logs
- View in GitHub Actions artifacts
- Check `execution_logs` table in database
- Monitor via n8n webhook notifications

### Alerts
- Email notifications on failure
- Telegram alerts (optional)
- n8n monitoring workflow

---

## 🔐 Security Considerations

### API Keys
- Never commit API keys to repository
- Use GitHub Secrets for workflows
- Use environment variables locally
- Rotate keys periodically

### Rate Limiting
- Respect API rate limits
- Implement exponential backoff
- Cache responses when possible
- Monitor quota usage

### Error Handling
- Graceful failure modes
- Detailed error logging
- Automatic retry logic
- Notification on persistent failures

---

## 💡 Best Practices

1. **Idempotency:** Agents should be safe to run multiple times
2. **Logging:** Log all actions and decisions
3. **Testing:** Always test in test mode first
4. **Documentation:** Update docs when adding features
5. **Ethics:** Apply ethical allocation consistently
6. **Monitoring:** Set up alerts for failures
7. **Versioning:** Increment version numbers with changes

---

## 🚀 Future Agent Ideas

Potential agents for future development:
- **Marcus** - Financial optimizer
- **Elena** - Translation and localization
- **Zara** - Quality assurance tester
- **Quinn** - API integration manager
- **Aria** - Audio/video content creator

---

## 📚 Related Documentation

- [Ethical Framework](ETHICS.md) - Revenue allocation principles
- [Mobile Development](MOBILE_DEVELOPMENT.md) - Managing agents on mobile
- [README](../README.md) - Project overview

---

*Updated: 2025-12-30*  
*UMAJA Autonomous Agent System*
