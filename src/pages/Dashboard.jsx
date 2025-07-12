import React from 'react'
import styled from 'styled-components'
import PageLayout from '../layouts/Layout'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCreditCard, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xl);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--lg);
  margin-bottom: var(--xl);
`;

const StatCard = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  color: var(--text-white);
  box-shadow: var(--shadow-card);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--lg);
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.type === 'income' ? 'linear-gradient(135deg, var(--success-green), var(--accent-green))' :
                props.type === 'expense' ? 'linear-gradient(135deg, var(--danger-red), var(--warning-orange))' :
                'linear-gradient(135deg, var(--primary-green), var(--secondary-green))'};
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-white);
  box-shadow: var(--shadow-glow);
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: var(--xs);
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.trend === 'up' ? 'var(--success-green)' : 'var(--danger-red)'};
`;

const StatAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: var(--sm);
`;

const StatLabel = styled.div`
  color: var(--text-gray);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatDescription = styled.div`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-top: var(--sm);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  box-shadow: var(--shadow-card);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-white);
  margin-bottom: var(--lg);
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: var(--bg-glass);
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 1.1rem;
`;

const TransactionsSection = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  box-shadow: var(--shadow-card);
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
  padding: var(--md) 0;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.type === 'income' ? 'var(--success-green)' : 'var(--danger-red)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  font-size: 1rem;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: var(--text-white);
  margin-bottom: var(--xs);
`;

const TransactionDate = styled.div`
  color: var(--text-gray);
  font-size: 0.8rem;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'income' ? 'var(--success-green)' : 'var(--danger-red)'};
  font-size: 1.1rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--lg);
  margin-top: var(--xl);
`;

const ActionCard = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--lg);
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-green);
    box-shadow: var(--shadow-glow);
  }
`;

const ActionIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--md);
  font-size: 1.5rem;
  color: var(--bg-dark);
`;

const ActionTitle = styled.div`
  font-weight: 600;
  color: var(--text-white);
  margin-bottom: var(--xs);
`;

const ActionDescription = styled.div`
  color: var(--text-gray);
  font-size: 0.9rem;
`;

const Dashboard = () => {
  const stats = [
    {
      type: 'income',
      amount: '$8,420',
      label: 'Total Income',
      description: 'This month',
      trend: 'up',
      percentage: '+12.5%',
      icon: FiTrendingUp
    },
    {
      type: 'expense',
      amount: '$5,280',
      label: 'Total Expenses',
      description: 'This month',
      trend: 'down',
      percentage: '-8.2%',
      icon: FiTrendingDown
    },
    {
      type: 'balance',
      amount: '$3,140',
      label: 'Net Balance',
      description: 'Available funds',
      trend: 'up',
      percentage: '+15.3%',
      icon: FiDollarSign
    },
    {
      type: 'savings',
      amount: '$12,850',
      label: 'Total Savings',
      description: 'All time',
      trend: 'up',
      percentage: '+22.1%',
      icon: FiCreditCard
    }
  ]

  const recentTransactions = [
    { id: 1, title: 'Salary Payment', amount: '+$4,200', type: 'income', date: 'Today', icon: '💰' },
    { id: 2, title: 'Grocery Shopping', amount: '-$85.50', type: 'expense', date: 'Yesterday', icon: '🛒' },
    { id: 3, title: 'Freelance Work', amount: '+$750', type: 'income', date: '2 days ago', icon: '💼' },
    { id: 4, title: 'Gas Station', amount: '-$45.20', type: 'expense', date: '3 days ago', icon: '⛽' },
    { id: 5, title: 'Online Purchase', amount: '-$120', type: 'expense', date: '4 days ago', icon: '🛍️' }
  ]

  const quickActions = [
    { title: 'Add Transaction', description: 'Record new income or expense', icon: '➕' },
    { title: 'Set Budget', description: 'Create spending limits', icon: '📊' },
    { title: 'View Reports', description: 'Analyze your finances', icon: '📈' },
    { title: 'Set Goals', description: 'Plan for the future', icon: '🎯' }
  ]

  return (
    <PageLayout title="Financial Dashboard">
      <DashboardContainer>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatHeader>
                <StatIcon type={stat.type}>
                  <stat.icon />
                </StatIcon>
                <StatTrend trend={stat.trend}>
                  {stat.trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {stat.percentage}
                </StatTrend>
              </StatHeader>
              <StatAmount>{stat.amount}</StatAmount>
              <StatLabel>{stat.label}</StatLabel>
              <StatDescription>{stat.description}</StatDescription>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentGrid>
          <ChartSection>
            <SectionTitle>Spending Overview</SectionTitle>
            <ChartPlaceholder>
              📊 Interactive Chart Coming Soon
            </ChartPlaceholder>
          </ChartSection>

          <TransactionsSection>
            <SectionTitle>Recent Transactions</SectionTitle>
            {recentTransactions.map(transaction => (
              <TransactionItem key={transaction.id}>
                <TransactionIcon type={transaction.type}>
                  {transaction.icon}
                </TransactionIcon>
                <TransactionInfo>
                  <TransactionTitle>{transaction.title}</TransactionTitle>
                  <TransactionDate>{transaction.date}</TransactionDate>
                </TransactionInfo>
                <TransactionAmount type={transaction.type}>
                  {transaction.amount}
                </TransactionAmount>
              </TransactionItem>
            ))}
          </TransactionsSection>
        </ContentGrid>

        <QuickActions>
          {quickActions.map((action, index) => (
            <ActionCard key={index}>
              <ActionIcon>{action.icon}</ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          ))}
        </QuickActions>
      </DashboardContainer>
    </PageLayout>
  )
}

export default Dashboard 