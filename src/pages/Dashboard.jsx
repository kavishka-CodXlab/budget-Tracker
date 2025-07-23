import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../layouts/Layout';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiCreditCard,
  FiPlus,
  FiTarget,
  FiBarChart2,
  FiList,
  FiArrowUpRight,
  FiArrowDownRight
} from 'react-icons/fi';

const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`;

const StatCard = styled(motion.div)`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'var(--accent-primary)'};
    transition: height var(--transition-fast);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    
    &::before {
      height: 4px;
    }
  }
`;

const StatIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${props => props.bgColor || 'var(--accent-primary-light)'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.iconColor || 'var(--accent-primary)'};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    background: ${props => props.hoverGradient};
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  &:hover::before {
    opacity: 0.1;
  }
  
  svg {
    position: relative;
    z-index: 1;
  }
`;

const StatInfo = styled(motion.div)`
  flex: 1;
`;

const StatValue = styled(motion.div)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const StatLabel = styled(motion.div)`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const SectionGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.div)`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
    opacity: 0.7;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
`;

const SectionTitle = styled(motion.h2)`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  svg {
    color: var(--accent-primary);
  }
`;

const QuickActionsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
`;

const QuickActionCard = styled(motion.button)`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-primary), var(--primary));
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  &:hover {
    background-color: var(--accent-primary-light);
    border-color: var(--accent-primary);
    transform: translateY(-1px);
    
    &::before {
      opacity: 0.05;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const ActionIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  background: ${props => props.bgColor};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  font-size: 1.25rem;
  box-shadow: var(--shadow-sm);
`;

const ActionTitle = styled(motion.div)`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
`;

const TransactionsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const TransactionItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  border: 1px solid transparent;
  
  &:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--border-secondary);
  }
`;

const TransactionIcon = styled(motion.div)`
  width: 36px;
  height: 36px;
  background-color: ${props => 
    props.type === 'income' 
      ? 'var(--success-light)' 
      : 'var(--danger-light)'
  };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${props => 
    props.type === 'income' 
      ? 'var(--success)' 
      : 'var(--danger)'
  };
  border: 2px solid ${props => 
    props.type === 'income' 
      ? 'var(--success)' 
      : 'var(--danger)'
  };
`;

const TransactionDetails = styled(motion.div)`
  flex: 1;
  min-width: 0;
`;

const TransactionTitle = styled(motion.div)`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionCategory = styled(motion.div)`
  color: var(--text-secondary);
  font-size: 0.75rem;
`;

const TransactionAmount = styled(motion.div)`
  color: ${props => 
    props.type === 'income' 
      ? 'var(--success)' 
      : 'var(--danger)'
  };
  font-weight: 600;
  font-size: 0.875rem;
`;

const ViewAllButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--accent-primary-hover);
    transform: translateX(2px);
  }
`;

// Animation variants (same as before)
const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const statsGridVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const iconVariants = {
  initial: {
    scale: 0,
    rotate: -180,
  },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};

const transactionVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    x: 4,
    transition: {
      duration: 0.2,
    },
  },
};

const Dashboard = () => {
  // Mock data for demonstration
  const mockStats = {
    totalIncome: 4950.00,
    totalExpenses: 2847.50,
    netBalance: 2102.50,
    totalTransactions: 28
  };

  const mockRecentTransactions = [
    { id: 1, title: 'Salary Payment', amount: 4200, type: 'income', category: 'Salary', date: '2024-01-15' },
    { id: 2, title: 'Grocery Shopping', amount: 85.50, type: 'expense', category: 'Food & Dining', date: '2024-01-14' },
    { id: 3, title: 'Freelance Work', amount: 750, type: 'income', category: 'Freelance', date: '2024-01-13' },
    { id: 4, title: 'Gas Station', amount: 45.20, type: 'expense', category: 'Transportation', date: '2024-01-12' },
    { id: 5, title: 'Online Purchase', amount: 120, type: 'expense', category: 'Shopping', date: '2024-01-11' },
  ];

  const quickActions = [
    { 
      icon: FiPlus, 
      title: 'Add Transaction', 
      bgColor: 'linear-gradient(135deg, var(--primary), var(--accent))'
    },
    { 
      icon: FiTarget, 
      title: 'Set Budget', 
      bgColor: 'linear-gradient(135deg, var(--accent), var(--secondary))'
    },
    { 
      icon: FiBarChart2, 
      title: 'View Analytics', 
      bgColor: 'linear-gradient(135deg, var(--secondary), var(--primary))'
    },
    { 
      icon: FiList, 
      title: 'All Transactions', 
      bgColor: 'linear-gradient(135deg, var(--primary), var(--accent))'
    },
  ];

  return (
    <Layout title="Dashboard">
      <DashboardContainer
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Stats Cards */}
        <StatsGrid
          variants={statsGridVariants}
          initial="initial"
          animate="animate"
        >
          <StatCard
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            gradient="linear-gradient(90deg, var(--success), var(--primary))"
          >
            <StatIcon 
              bgColor="var(--success-light)" 
              iconColor="var(--success)"
              hoverGradient="linear-gradient(135deg, var(--success), var(--primary))"
              variants={iconVariants}
            >
              <FiTrendingUp />
            </StatIcon>
            <StatInfo>
              <StatValue>${mockStats.totalIncome.toFixed(2)}</StatValue>
              <StatLabel>Total Income</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            gradient="linear-gradient(90deg, var(--danger), var(--danger-dark))"
          >
            <StatIcon 
              bgColor="var(--danger-light)" 
              iconColor="var(--danger)"
              hoverGradient="linear-gradient(135deg, var(--danger), var(--danger-dark))"
              variants={iconVariants}
            >
              <FiTrendingDown />
            </StatIcon>
            <StatInfo>
              <StatValue>${mockStats.totalExpenses.toFixed(2)}</StatValue>
              <StatLabel>Total Expenses</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            gradient="linear-gradient(90deg, var(--accent), var(--primary))"
          >
            <StatIcon 
              bgColor="var(--accent-primary-light)" 
              iconColor="var(--accent-primary)"
              hoverGradient="linear-gradient(135deg, var(--accent), var(--primary))"
              variants={iconVariants}
            >
              <FiDollarSign />
            </StatIcon>
            <StatInfo>
              <StatValue>${mockStats.netBalance.toFixed(2)}</StatValue>
              <StatLabel>Net Balance</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            gradient="linear-gradient(90deg, var(--info), var(--info-dark))"
          >
            <StatIcon 
              bgColor="var(--info-light)" 
              iconColor="var(--info)"
              hoverGradient="linear-gradient(135deg, var(--info), var(--info-dark))"
              variants={iconVariants}
            >
              <FiCreditCard />
            </StatIcon>
            <StatInfo>
              <StatValue>{mockStats.totalTransactions}</StatValue>
              <StatLabel>Total Transactions</StatLabel>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Main Content Sections */}
        <SectionGrid>
          {/* Quick Actions */}
          <Section
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <SectionHeader>
              <SectionTitle>
                <FiPlus />
                Quick Actions
              </SectionTitle>
            </SectionHeader>
            
            <QuickActionsGrid>
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <ActionIcon
                    variants={iconVariants}
                    bgColor={action.bgColor}
                  >
                    <action.icon />
                  </ActionIcon>
                  <ActionTitle>{action.title}</ActionTitle>
                </QuickActionCard>
              ))}
            </QuickActionsGrid>
          </Section>

          {/* Recent Transactions */}
          <Section
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <SectionHeader>
              <SectionTitle>
                <FiCreditCard />
                Recent Transactions
              </SectionTitle>
              <ViewAllButton>
                View All
                <FiArrowUpRight />
              </ViewAllButton>
            </SectionHeader>
            
            <TransactionsList>
              {mockRecentTransactions.map((transaction, index) => (
                <TransactionItem
                  key={transaction.id}
                  variants={transactionVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TransactionIcon type={transaction.type}>
                    {transaction.type === 'income' ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  </TransactionIcon>
                  <TransactionDetails>
                    <TransactionTitle>{transaction.title}</TransactionTitle>
                    <TransactionCategory>{transaction.category}</TransactionCategory>
                  </TransactionDetails>
                  <TransactionAmount type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </TransactionAmount>
                </TransactionItem>
              ))}
            </TransactionsList>
          </Section>
        </SectionGrid>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard; 