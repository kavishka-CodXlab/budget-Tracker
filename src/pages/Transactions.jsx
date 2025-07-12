import React from 'react'
import styled from 'styled-components'
import PageLayout from '../layouts/Layout'
import { FiFilter, FiSearch, FiDownload, FiPlus } from 'react-icons/fi'

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xl);
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--lg);
`;

const SearchSection = styled.div`
  display: flex;
  gap: var(--md);
  align-items: center;
`;

const SearchInput = styled.input`
  width: 300px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-white);
  font-size: 0.9rem;
  
  &::placeholder {
    color: var(--text-gray);
  }
`;

const FilterButton = styled.button`
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-gray);
  display: flex;
  align-items: center;
  gap: var(--sm);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    color: var(--primary-green);
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border: none;
  border-radius: var(--radius);
  padding: var(--md) var(--lg);
  color: var(--bg-dark);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--sm);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--lg);
  margin-bottom: var(--xl);
`;

const StatCard = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--lg);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: var(--xs);
`;

const StatLabel = styled.div`
  color: var(--text-gray);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TransactionsTable = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: var(--md);
  padding: var(--lg) var(--xl);
  background: var(--bg-glass);
  border-bottom: 1px solid var(--border);
  font-weight: 600;
  color: var(--text-gray);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: var(--md);
  padding: var(--lg) var(--xl);
  border-bottom: 1px solid var(--border-light);
  transition: var(--transition);
  
  &:hover {
    background: var(--bg-glass);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionCell = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sm);
  color: var(--text-white);
`;

const TransactionIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.type === 'income' ? 'var(--success-green)' : 'var(--danger-red)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-white);
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: var(--text-white);
`;

const TransactionCategory = styled.div`
  color: var(--text-gray);
  font-size: 0.8rem;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'income' ? 'var(--success-green)' : 'var(--danger-red)'};
`;

const TransactionDate = styled.div`
  color: var(--text-gray);
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  background: var(--bg-glass);
  color: var(--primary-green);
  padding: var(--xs) var(--sm);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  background: ${props => props.status === 'completed' ? 'var(--success-green)' : 
                props.status === 'pending' ? 'var(--warning-orange)' : 'var(--danger-red)'};
  color: var(--text-white);
  padding: var(--xs) var(--sm);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--sm);
  margin-top: var(--xl);
`;

const PageButton = styled.button`
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--sm) var(--md);
  color: var(--text-gray);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    color: var(--primary-green);
  }
  
  &.active {
    background: var(--primary-green);
    color: var(--bg-dark);
    border-color: var(--primary-green);
  }
`;

const Transactions = () => {
  const transactionStats = [
    { number: '156', label: 'Total Transactions' },
    { number: '$8,420', label: 'Total Income' },
    { number: '$5,280', label: 'Total Expenses' },
    { number: '12', label: 'Categories' }
  ]

  const transactions = [
    {
      id: 1,
      title: 'Salary Payment',
      category: 'Income',
      amount: '+$4,200',
      type: 'income',
      date: '2024-01-15',
      status: 'completed',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Grocery Shopping',
      category: 'Food & Dining',
      amount: '-$85.50',
      type: 'expense',
      date: '2024-01-14',
      status: 'completed',
      icon: '🛒'
    },
    {
      id: 3,
      title: 'Freelance Work',
      category: 'Income',
      amount: '+$750',
      type: 'income',
      date: '2024-01-13',
      status: 'completed',
      icon: '💼'
    },
    {
      id: 4,
      title: 'Gas Station',
      category: 'Transportation',
      amount: '-$45.20',
      type: 'expense',
      date: '2024-01-12',
      status: 'completed',
      icon: '⛽'
    },
    {
      id: 5,
      title: 'Online Purchase',
      category: 'Shopping',
      amount: '-$120',
      type: 'expense',
      date: '2024-01-11',
      status: 'pending',
      icon: '🛍️'
    },
    {
      id: 6,
      title: 'Electricity Bill',
      category: 'Utilities',
      amount: '-$95.30',
      type: 'expense',
      date: '2024-01-10',
      status: 'completed',
      icon: '⚡'
    },
    {
      id: 7,
      title: 'Investment Dividend',
      category: 'Income',
      amount: '+$320',
      type: 'income',
      date: '2024-01-09',
      status: 'completed',
      icon: '📈'
    },
    {
      id: 8,
      title: 'Restaurant Dinner',
      category: 'Food & Dining',
      amount: '-$65.80',
      type: 'expense',
      date: '2024-01-08',
      status: 'completed',
      icon: '🍽️'
    }
  ]

  return (
    <PageLayout title="Transaction History">
      <TransactionsContainer>
        <HeaderSection>
          <SearchSection>
            <SearchInput placeholder="Search transactions..." />
            <FilterButton>
              <FiFilter />
              Filter
            </FilterButton>
          </SearchSection>
          <ActionButton>
            <FiPlus />
            Add Transaction
          </ActionButton>
        </HeaderSection>

        <StatsCards>
          {transactionStats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsCards>

        <TransactionsTable>
          <TableHeader>
            <div>Transaction</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </TableHeader>
          
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TransactionCell>
                <TransactionIcon type={transaction.type}>
                  {transaction.icon}
                </TransactionIcon>
                <TransactionInfo>
                  <TransactionTitle>{transaction.title}</TransactionTitle>
                  <TransactionCategory>{transaction.category}</TransactionCategory>
                </TransactionInfo>
              </TransactionCell>
              
              <TransactionCell>
                <CategoryBadge>{transaction.category}</CategoryBadge>
              </TransactionCell>
              
              <TransactionCell>
                <TransactionAmount type={transaction.type}>
                  {transaction.amount}
                </TransactionAmount>
              </TransactionCell>
              
              <TransactionCell>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionCell>
              
              <TransactionCell>
                <StatusBadge status={transaction.status}>
                  {transaction.status}
                </StatusBadge>
              </TransactionCell>
            </TableRow>
          ))}
        </TransactionsTable>

        <Pagination>
          <PageButton>Previous</PageButton>
          <PageButton className="active">1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>Next</PageButton>
        </Pagination>
      </TransactionsContainer>
    </PageLayout>
  )
}

export default Transactions 