"""
Ethical Calculator - Implements Bahá'í-inspired revenue allocation

Calculates 19% allocation on surplus above €6,500 threshold.
Supports opt-in/opt-out logic for ethical giving.
"""

from typing import Dict, Optional, Any
from datetime import datetime


class EthicalCalculator:
    """
    Calculator for ethical revenue allocation based on Bahá'í principles.
    
    Key principles:
    - Voluntary participation (opt-in/opt-out)
    - 19% allocation on surplus above threshold
    - €6,500 threshold (annual)
    - Transparent reporting
    """
    
    DEFAULT_THRESHOLD = 6500.0  # €6,500 annual threshold
    ALLOCATION_RATE = 0.19  # 19%
    
    def __init__(self, threshold: float = DEFAULT_THRESHOLD):
        """
        Initialize calculator with custom threshold.
        
        Args:
            threshold: Annual income threshold in euros (default: €6,500)
        """
        self.threshold = threshold
        
    def calculate_allocation(
        self,
        total_revenue: float,
        user_opted_in: bool = False
    ) -> Dict[str, float]:
        """
        Calculate ethical allocation on revenue.
        
        Args:
            total_revenue: Total revenue amount in euros
            user_opted_in: Whether user has opted in to ethical allocation
            
        Returns:
            Dictionary with allocation details:
            - total_revenue: Original revenue
            - threshold: Applied threshold
            - surplus: Amount above threshold
            - allocation: 19% of surplus (if opted in)
            - remaining: Amount after allocation
            - opted_in: User's opt-in status
        """
        if not user_opted_in:
            return {
                'total_revenue': total_revenue,
                'threshold': self.threshold,
                'surplus': 0.0,
                'allocation': 0.0,
                'remaining': total_revenue,
                'opted_in': False
            }
        
        surplus = max(0.0, total_revenue - self.threshold)
        allocation = surplus * self.ALLOCATION_RATE
        remaining = total_revenue - allocation
        
        return {
            'total_revenue': total_revenue,
            'threshold': self.threshold,
            'surplus': surplus,
            'allocation': allocation,
            'remaining': remaining,
            'opted_in': True
        }
    
    def generate_report(
        self,
        allocation_data: Dict[str, float]
    ) -> str:
        """
        Generate human-readable allocation report.
        
        Args:
            allocation_data: Output from calculate_allocation()
            
        Returns:
            Formatted report string
        """
        if not allocation_data['opted_in']:
            return (
                "Ethical Allocation Report\n"
                "========================\n"
                f"Total Revenue: €{allocation_data['total_revenue']:.2f}\n"
                "Status: Opted out\n"
                f"Remaining: €{allocation_data['remaining']:.2f}\n"
            )
        
        return (
            "Ethical Allocation Report\n"
            "========================\n"
            f"Total Revenue: €{allocation_data['total_revenue']:.2f}\n"
            f"Threshold: €{allocation_data['threshold']:.2f}\n"
            f"Surplus: €{allocation_data['surplus']:.2f}\n"
            f"Allocation (19%): €{allocation_data['allocation']:.2f}\n"
            f"Remaining: €{allocation_data['remaining']:.2f}\n"
            f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        )
    
    def calculate_batch(
        self,
        transactions: list[Dict[str, float]],
        user_opted_in: bool = False
    ) -> Dict[str, Any]:
        """
        Calculate allocations for multiple transactions.
        
        Args:
            transactions: List of transaction dicts with 'amount' key
            user_opted_in: Whether user has opted in
            
        Returns:
            Summary with total allocations and detailed breakdown
        """
        total_revenue = sum(t.get('amount', 0.0) for t in transactions)
        allocation_data = self.calculate_allocation(total_revenue, user_opted_in)
        
        return {
            'summary': allocation_data,
            'transaction_count': len(transactions),
            'total_revenue': total_revenue,
            'total_allocation': allocation_data['allocation'],
            'report': self.generate_report(allocation_data)
        }


# Example usage
if __name__ == '__main__':
    calculator = EthicalCalculator()
    
    # Example 1: User opted in, revenue above threshold
    print("Example 1: Opted In, €10,000 revenue")
    print("-" * 40)
    result = calculator.calculate_allocation(10000.0, user_opted_in=True)
    print(calculator.generate_report(result))
    
    # Example 2: User opted out
    print("\nExample 2: Opted Out, €10,000 revenue")
    print("-" * 40)
    result = calculator.calculate_allocation(10000.0, user_opted_in=False)
    print(calculator.generate_report(result))
    
    # Example 3: Revenue below threshold
    print("\nExample 3: Opted In, €5,000 revenue (below threshold)")
    print("-" * 40)
    result = calculator.calculate_allocation(5000.0, user_opted_in=True)
    print(calculator.generate_report(result))
