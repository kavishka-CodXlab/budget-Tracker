import React from 'react'
import styled from 'styled-components'
import Layout from '../layouts/Layout'
import { useAppContext } from '../context/AppContext'
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiTarget,
  FiCreditCard,
  FiPieChart,
  FiPlus,
  FiArrowRight
} from 'react-icons/fi'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`

const StatCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: ${props => props.color || 'var(--accent-primary-light)'};
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.textColor || 'var(--accent-primary)'};
  flex-shrink: 0;
`

const StatInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: 1;
`

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`

const QuickActionCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-primary);
  }
`

const QuickActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
`

const QuickActionIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--accent-primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--accent-primary);
`

const ActionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`

const ActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0 0 var(--space-md) 0;
  line-height: 1.5;
`

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 600;
  
  svg {
    transition: transform var(--transition-fast);
  }
  
  ${QuickActionCard}:hover & svg {
    transform: translateX(4px);
  }
`

const RecentSection = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xl);
`

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
`

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--accent-primary-hover);
  }
`

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background-color: var(--bg-tertiary);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--bg-secondary);
  }
`

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.type === 'income' ? 'var(--success-light)' : 'var(--danger-light)'};
  color: ${props => props.type === 'income' ? 'var(--success)' : 'var(--danger)'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  flex-shrink: 0;
`

const TransactionInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TransactionTitle = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: var(--space-xs);
`

const TransactionCategory = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
`

const TransactionAmount = styled.div`
  color: ${props => props.type === 'income' ? 'var(--success)' : 'var(--danger)'};
  font-weight: 700;
  font-size: 1rem;
  text-align: right;
`

const EmptyState = styled.div`
  text-align: center;
  padding: var(--space-3xl) var(--space-xl);
  color: var(--text-secondary);
  
  svg {
    margin-bottom: var(--space-lg);
    opacity: 0.5;
  }
`

const Dashboard = () => {
  const { state } = useAppContext()

  // Mock data for demonstration
  const mockTransactions = [
    { id: 1, title: 'Salary Payment', amount: 4200, type: 'income', category: 'Salary', date: '2024-01-15' },
    { id: 2, title: 'Grocery Shopping', amount: 85.50, type: 'expense', category: 'Food & Dining', date: '2024-01-14' },
    { id: 3, title: 'Freelance Work', amount: 750, type: 'income', category: 'Freelance', date: '2024-01-13' },
    { id: 4, title: 'Gas Station', amount: 45.20, type: 'expense', category: 'Transportation', date: '2024-01-12' },
    { id: 5, title: 'Coffee Shop', amount: 12.50, type: 'expense', category: 'Food & Dining', date: '2024-01-11' }
  ]

  const transactions = state.transactions.length > 0 ? state.transactions : mockTransactions
  const recentTransactions = transactions.slice(0, 5)

  // Calculate stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  
  const netBalance = totalIncome - totalExpenses
  const totalTransactions = transactions.length

  const quickActions = [
    {
      icon: FiPlus,
      title: 'Add Transaction',
      description: 'Record a new income or expense',
      action: () => console.log('Add transaction')
    },
    {
      icon: FiTarget,
      title: 'Set Budget',
      description: 'Create or update your monthly budget',
      action: () => console.log('Set budget')
    },
    {
      icon: FiTrendingUp,
      title: 'View Analytics',
      description: 'Analyze your spending patterns',
      action: () => console.log('View analytics')
    },
    {
      icon: FiCreditCard,
      title: 'All Transactions',
      description: 'View complete transaction history',
      action: () => console.log('View transactions')
    }
  ]

  return (
    <Layout title="Dashboard">
      <DashboardContainer>
        {/* Stats Overview */}
        <StatsGrid>
          <StatCard>
            <StatIcon color="var(--success-light)" textColor="var(--success)">
              <FiTrendingUp />
            </StatIcon>
            <StatInfo>
              <StatValue>${totalIncome.toFixed(2)}</StatValue>
              <StatLabel>Total Income</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--danger-light)" textColor="var(--danger)">
              <FiTrendingDown />
            </StatIcon>
            <StatInfo>
              <StatValue>${totalExpenses.toFixed(2)}</StatValue>
              <StatLabel>Total Expenses</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--accent-primary-light)" textColor="var(--accent-primary)">
              <FiDollarSign />
            </StatIcon>
            <StatInfo>
              <StatValue style={{ color: netBalance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                ${netBalance.toFixed(2)}
              </StatValue>
              <StatLabel>Net Balance</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--info-light)" textColor="var(--info)">
              <FiPieChart />
            </StatIcon>
            <StatInfo>
              <StatValue>{totalTransactions}</StatValue>
              <StatLabel>Total Transactions</StatLabel>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsGrid>
          {quickActions.map((action, index) => (
            <ActionCard key={index} onClick={action.action}>
              <ActionHeader>
                <ActionIcon>
                  <action.icon />
                </ActionIcon>
                <ActionTitle>{action.title}</ActionTitle>
              </ActionHeader>
              <ActionDescription>{action.description}</ActionDescription>
              <ActionButton>
                Get started <FiArrowRight />
              </ActionButton>
            </ActionCard>
          ))}
        </QuickActionsGrid>

        {/* Recent Transactions */}
        <RecentSection>
          <SectionHeader>
            <SectionTitle>Recent Transactions</SectionTitle>
            <ViewAllButton>
              View all <FiArrowRight />
            </ViewAllButton>
          </SectionHeader>

          {recentTransactions.length > 0 ? (
            <TransactionsList>
              {recentTransactions.map(transaction => (
                <TransactionItem key={transaction.id}>
                  <TransactionIcon type={transaction.type}>
                    {transaction.type === 'income' ? <FiTrendingUp /> : <FiTrendingDown />}
                  </TransactionIcon>
                  <TransactionInfo>
                    <TransactionTitle>{transaction.title}</TransactionTitle>
                    <TransactionCategory>{transaction.category}</TransactionCategory>
                  </TransactionInfo>
                  <TransactionAmount type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </TransactionAmount>
                </TransactionItem>
              ))}
            </TransactionsList>
          ) : (
            <EmptyState>
              <FiCreditCard size={48} />
              <div>No transactions yet</div>
              <div style={{ fontSize: '0.875rem', marginTop: 'var(--space-xs)' }}>
                Start by adding your first transaction
              </div>
            </EmptyState>
          )}
        </RecentSection>
      </DashboardContainer>
    </Layout>
  )
}

export default Dashboard 