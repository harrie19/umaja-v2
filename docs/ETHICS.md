# 🕊️ Ethical Framework - UMAJA

## Overview

UMAJA implements an ethical revenue allocation system inspired by Bahá'í principles of voluntary giving, justice, and service to humanity. The system ensures transparency, dignity, and fairness in all financial operations.

---

## 🌟 Core Principles

### 1. Voluntary Participation
**Principle:** All ethical contributions must be completely voluntary  
**Implementation:** Explicit opt-in/opt-out mechanism  
**Rationale:** True generosity cannot be coerced

### 2. The 19% Allocation
**Principle:** 19% of surplus income above threshold goes to humanitarian causes  
**Origin:** Inspired by Bahá'í concept of Ḥuqúqu'lláh (Right of God)  
**Application:** Applied only to surplus above €6,500 annual threshold

### 3. Threshold Respect
**Principle:** Basic needs are sacred and protected  
**Implementation:** First €6,500 of annual income is fully exempt  
**Rationale:** Ensures financial stability before ethical allocation

### 4. Transparency
**Principle:** All allocations are tracked and reported  
**Implementation:** Database logging, public reports, open calculations  
**Rationale:** Trust through visibility

---

## 💰 Calculation Method

### Formula

```python
if total_revenue <= threshold:
    allocation = 0
else:
    surplus = total_revenue - threshold
    allocation = surplus * 0.19
    remaining = total_revenue - allocation
```

### Python Implementation

```python
from scripts.utils.ethical_calculator import EthicalCalculator

# Initialize calculator
calculator = EthicalCalculator(threshold=6500.0)

# Calculate allocation
result = calculator.calculate_allocation(
    total_revenue=10000.0,
    user_opted_in=True
)

# Generate report
report = calculator.generate_report(result)
print(report)
```

### Example Calculations

#### Example 1: Below Threshold (Opted In)
```
Total Revenue: €5,000
Threshold: €6,500
Surplus: €0
Allocation (19%): €0
Remaining: €5,000
```

#### Example 2: Above Threshold (Opted In)
```
Total Revenue: €10,000
Threshold: €6,500
Surplus: €3,500
Allocation (19%): €665
Remaining: €9,335
```

#### Example 3: Above Threshold (Opted Out)
```
Total Revenue: €10,000
Status: Opted Out
Allocation (19%): €0
Remaining: €10,000
```

#### Example 4: Significant Surplus (Opted In)
```
Total Revenue: €50,000
Threshold: €6,500
Surplus: €43,500
Allocation (19%): €8,265
Remaining: €41,735
```

---

## 🎯 Implementation Rules

### For Bahá'ís
- **Mandatory Opt-In:** Bahá'ís should opt-in as a spiritual obligation
- **Calculation:** Applied to individual income, not household
- **Frequency:** Calculated annually but can be paid incrementally
- **Exemptions:** Certain assets may be exempt (primary residence, tools of trade)

### For Non-Bahá'ís
- **Optional:** Completely voluntary participation
- **No Pressure:** System presents option without coercion
- **Same Benefits:** Access to all system features regardless of choice
- **Privacy:** Opt-in/out status is private by default

### For Organizations
- **Corporate Participation:** Organizations can adopt the framework
- **Modified Threshold:** Can set custom thresholds based on size
- **Transparency Reports:** Public allocation reports encouraged
- **Stakeholder Communication:** Clear communication to all parties

---

## 🖥️ User Interface

### Opt-In Flow

```typescript
// Dashboard: Settings > Ethical Allocation

┌─────────────────────────────────────────┐
│ Ethical Allocation Settings             │
├─────────────────────────────────────────┤
│                                          │
│ [ ] I voluntarily opt-in to ethical     │
│     revenue allocation (19% rule)       │
│                                          │
│ ℹ️ What is this?                         │
│ This allocates 19% of your surplus      │
│ income (above €6,500 threshold) to      │
│ humanitarian and environmental causes.  │
│                                          │
│ Your current threshold: €6,500          │
│ Participation: Completely voluntary     │
│ Privacy: Your choice is private         │
│                                          │
│ [ Learn More ] [ Save Preferences ]     │
└─────────────────────────────────────────┘
```

### Allocation Display

```typescript
// Dashboard: Revenue > Ethical Allocation

┌─────────────────────────────────────────┐
│ Ethical Allocation Report               │
├─────────────────────────────────────────┤
│ Period: January 2025                    │
│                                          │
│ Total Revenue:        €10,000.00        │
│ Threshold:            €6,500.00         │
│ ─────────────────────────────────       │
│ Surplus:              €3,500.00         │
│ Allocation (19%):     €665.00           │
│ Remaining:            €9,335.00         │
│                                          │
│ Status: ✅ Allocated                     │
│ Beneficiaries: 3 organizations          │
│                                          │
│ [ View Details ] [ Download Report ]    │
└─────────────────────────────────────────┘
```

---

## 💾 Database Schema

### Ethical Allocations Table

```sql
CREATE TABLE ethical_allocations (
    id UUID PRIMARY KEY,
    transaction_id UUID REFERENCES transactions(id),
    allocation_type VARCHAR(30), -- 'huququllah' or 'humanitarian'
    amount DECIMAL(10, 2),
    surplus_amount DECIMAL(10, 2),
    threshold_amount DECIMAL(10, 2) DEFAULT 6500.00,
    status VARCHAR(20), -- 'pending', 'allocated', 'distributed'
    user_opted_in BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Query Examples

```sql
-- Get total allocations for a user
SELECT 
    SUM(amount) as total_allocated,
    COUNT(*) as allocation_count
FROM ethical_allocations
WHERE user_opted_in = true
    AND status = 'allocated';

-- Monthly allocation summary
SELECT 
    DATE_TRUNC('month', created_at) as month,
    allocation_type,
    SUM(amount) as total
FROM ethical_allocations
GROUP BY month, allocation_type
ORDER BY month DESC;
```

---

## 🌍 Humanitarian Allocation

### Distribution Categories

1. **Education** (30%)
   - Literacy programs
   - STEM education
   - Vocational training

2. **Healthcare** (25%)
   - Preventive care
   - Mental health services
   - Medical research

3. **Environmental** (20%)
   - Climate action
   - Conservation
   - Sustainable agriculture

4. **Social Justice** (15%)
   - Human rights
   - Gender equality
   - Refugee support

5. **Community Development** (10%)
   - Infrastructure
   - Microfinance
   - Local empowerment

### Partner Organizations

Allocations distributed to verified organizations:
- Transparent financial reporting
- Aligned with ethical principles
- Regular impact assessments
- No discrimination policies

---

## 🔒 Transparency & Privacy

### Public Information
- Total system allocations (aggregated)
- Distribution to categories
- Partner organization list
- Calculation methodology
- Impact reports

### Private Information
- Individual opt-in/opt-out status
- Personal income amounts
- Specific allocation amounts
- Transaction details

### Data Protection
- GDPR compliant
- Right to be forgotten
- Data export available
- Encrypted storage
- Access controls

---

## 📊 Reporting

### Monthly Reports
- Total allocations
- Category breakdown
- Partner updates
- Impact metrics

### Annual Reports
- Comprehensive financial summary
- Impact assessment
- Testimonials from partners
- Future goals

### Real-Time Dashboard
- Current allocation status
- Pending distributions
- Historical trends
- Comparative analytics

---

## ⚖️ Compliance & Legal

### Tax Implications
- Consult local tax advisor
- May be tax-deductible
- Documentation provided
- Receipt generation

### Regulatory Compliance
- Financial services regulations
- Anti-money laundering (AML)
- Know Your Customer (KYC)
- Regular audits

### Dispute Resolution
- Clear appeal process
- Independent review
- Transparent decisions
- Documented outcomes

---

## 🚀 Future Enhancements

1. **Dynamic Thresholds:** Cost-of-living adjustments by region
2. **Custom Allocation:** Users choose distribution categories
3. **Impact Tracking:** Direct connection to funded projects
4. **Peer Verification:** Community validation of partners
5. **Blockchain Integration:** Immutable allocation records
6. **Smart Contracts:** Automated distribution execution

---

## 📚 Further Reading

### Bahá'í Texts
- "Kitáb-i-Aqdas" - The Most Holy Book
- "Questions and Answers" - Supplementary provisions
- "Compilation on Ḥuqúqu'lláh"

### Related Concepts
- Universal Basic Income (UBI)
- Effective Altruism
- Impact Investing
- Social Entrepreneurship
- Stakeholder Capitalism

---

## 💬 Frequently Asked Questions

**Q: What if I can't afford the full 19%?**  
A: The system is voluntary. Opt-out or contribute less. No judgment.

**Q: Can I change my opt-in status?**  
A: Yes, at any time through dashboard settings.

**Q: Where exactly does the money go?**  
A: View detailed breakdowns in the Transparency Reports section.

**Q: Is this tax-deductible?**  
A: Potentially, but consult your tax advisor for your specific situation.

**Q: Do I need to be Bahá'í?**  
A: No! The system is open to everyone, regardless of belief.

**Q: How is the threshold calculated?**  
A: €6,500 is the annual baseline. Regional adjustments may be added.

**Q: Can organizations participate?**  
A: Yes, with custom threshold configurations.

---

## 📞 Contact & Support

**Questions:** Open an issue on GitHub  
**Privacy Concerns:** See our Privacy Policy  
**Partnership Inquiries:** Contact community team  
**Technical Support:** Check documentation first

---

*"The earth is but one country, and mankind its citizens."* - Bahá'u'lláh

---

*Updated: 2025-12-30*  
*UMAJA Ethical Framework v1.0*
