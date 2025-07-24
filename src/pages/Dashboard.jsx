import React, { useEffect } from 'react';
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
  FiArrowDownRight,
  FiEye,
  FiEyeOff,
  FiEdit2
} from 'react-icons/fi';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';

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
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 6px 0 rgba(80, 80, 180, 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
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
    background: ${props => props.$gradient || 'var(--accent-primary)'};
    transition: height var(--transition-fast);
    opacity: 0.7;
  }
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60%;
    height: 30%;
    background: linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 50%;
    filter: blur(8px);
    pointer-events: none;
    opacity: 0.7;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 32px 0 rgba(31, 38, 135, 0.22), 0 2px 8px 0 rgba(80, 80, 180, 0.12);
    
    &::before {
      height: 4px;
    }
    &::after {
      opacity: 1;
      filter: blur(12px);
    }
  }
`;

const StatIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${props => props.$bgColor || 'var(--accent-primary-light)'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.$iconColor || 'var(--accent-primary)'};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    background: ${props => props.$hoverGradient};
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
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 6px 0 rgba(80, 80, 180, 0.06);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
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
  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40%;
    height: 20%;
    background: linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%);
    border-radius: 50%;
    filter: blur(10px);
    pointer-events: none;
    opacity: 0.5;
    z-index: 1;
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
  background: ${props => props.$bgColor};
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

// Add styled components for layout and UI blocks
const DashboardFlex = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;
const DashboardLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const DashboardRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const WalletCard = styled.div`
  background: ${({ idx }) =>
    idx === 0
      ? 'linear-gradient(135deg, rgba(35,35,43,0.7) 60%, rgba(68,68,90,0.5))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.35) 60%, rgba(234,234,234,0.25))'};
  color: ${({ idx }) => (idx === 0 ? 'white' : '#23232b')};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 12px;
  position: relative;
  min-height: 110px;
  box-shadow: 0 12px 32px 0 rgba(31, 38, 135, 0.22);
  backdrop-filter: blur(18px) saturate(200%);
  -webkit-backdrop-filter: blur(18px) saturate(200%);
  border: 1.5px solid rgba(255,255,255,0.22);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WalletCardHighlight = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; height: 18px;
  background: linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  filter: blur(2px);
  pointer-events: none;
  z-index: 2;
  animation: shine 2.5s linear infinite;
  background-size: 200% 100%;
  background-position: 0% 0%;
`;
const EditCardModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditCardModal = styled.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 32px;
  min-width: 340px;
  max-width: 420px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  position: relative;
  color: var(--text-primary);
`;
const EditCardModalButton = styled.button`
  flex: 1;
  background: ${({ active }) => (active ? 'var(--accent-primary)' : 'var(--bg-tertiary)')};
  color: ${({ active }) => (active ? 'var(--text-inverse)' : 'var(--text-primary)')};
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
`;
const GoalProgressContainer = styled.div`
  background: rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px 0 rgba(80,80,180,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const GoalBarBg = styled.div`
  background: #eaff6b;
  border-radius: 8px;
  height: 8px;
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
`;
const GoalBarFill = styled.div`
  background:  var(--accent-primary);
  height: 100%;
  border-radius: 8px;
  transition: width 0.4s;
`;
const GoalPercent = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
`;
const TableWrapper = styled.div`
  overflow-x: auto;
`;
const TableCell = styled.td`
  padding: 12px 8px;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  color: ${({ secondary }) => (secondary ? '#888' : 'inherit')};
  font-size: ${({ small }) => (small ? '13px' : 'inherit')};
`;
const TableHeaderCell = styled.th`
  padding: 12px 8px;
  color: var(--text-secondary);
  font-size: 14px;
  text-align: left;
`;
 

// Add a simple ripple effect for buttons
const RippleButton = styled.button`
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
  &:active::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200%;
    height: 200%;
    background: rgba(127,95,255,0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: ripple 0.5s linear;
  }
  @keyframes ripple {
    from { opacity: 1; }
    to { opacity: 0; }
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

const Dashboard = () => {
  const { state, actions } = useAppContext();
  const navigate = useNavigate();

  // --- Real-time Transactions Data ---
  const transactions = state.transactions || [];
  // Get last 7 days transactions
  const now = new Date();
  const last7Days = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return (now - txDate) / (1000 * 60 * 60 * 24) < 7;
  });
  const totalIncome7 = last7Days.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalExpense7 = last7Days.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  // Recent transactions (show 5 most recent)
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  // --- Real-time Goals Data ---
  const goals = state.goals || [];
  const calcProgress = (current, target) => target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  

  // Card state for edit/view
  const [showEditCard, setShowEditCard] = useState(false);
  const [editCardIdx, setEditCardIdx] = useState(0); // default to first card
  const [cardDetails, setCardDetails] = useState(() =>
    state.cards && state.cards.length === 2
      ? state.cards
      : [
          { bank: 'Universal Bank', number: '5495 7381 3759 2321', type: 'visa', expiry: '09/25', cvv: '123' },
          { bank: 'Commercial Bank', number: '8595 2548*****', type: 'visa', expiry: '09/25', cvv: '456' }
        ]
  );
  const [showCardNumber, setShowCardNumber] = useState([false, false]);

  // Quick Add Transaction modal state
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Quick Add Transaction form logic (reuse validation from Transactions)
  const validationRules = {
    title: {
      required: { message: 'Transaction title is required' },
      minLength: { value: 3, message: 'Title must be at least 3 characters' }
    },
    amount: {
      required: { message: 'Amount is required' },
      number: { message: 'Please enter a valid number' },
      positive: { message: 'Amount must be greater than 0' }
    },
    type: {
      required: { message: 'Transaction type is required' }
    },
    category: {
      required: { message: 'Category is required' }
    },
    date: {
      required: { message: 'Date is required' }
    }
  };
  const {
    values: quickValues,
    errors: quickErrors,
    touched: quickTouched,
    handleChange: quickHandleChange,
    handleBlur: quickHandleBlur,
    handleSubmit: quickHandleSubmit,
    reset: quickReset
  } = useForm(
    {
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    },
    validationRules
  );

  const handleQuickAdd = (formData) => {
    actions.addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    setShowQuickAdd(false);
    quickReset();
  };

  // On mount, update local state if context.cards changes (one-way sync)
  useEffect(() => {
    if (state.cards && state.cards.length === 2) {
      setCardDetails(state.cards);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Dashboard">
      <DashboardContainer
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Stats Cards */}
        <StatsGrid>
          <StatCard $gradient="linear-gradient(90deg, var(--primary), var(--success))">
            <StatIcon $bgColor="var(--primary-light)" $iconColor="var(--primary)"><FiCreditCard /></StatIcon>
            <StatInfo>
              <StatLabel>Total balance</StatLabel>
              <StatValue>${(totalIncome7 - totalExpense7).toFixed(2)}</StatValue>
            </StatInfo>
          </StatCard>
          <StatCard $gradient="linear-gradient(90deg, var(--danger), var(--danger-dark))">
            <StatIcon $bgColor="var(--danger-light)" $iconColor="var(--danger)"><FiTrendingDown /></StatIcon>
            <StatInfo>
              <StatLabel>Total spending (7d)</StatLabel>
              <StatValue style={{ color: 'var(--danger)' }}>-${totalExpense7.toFixed(2)}</StatValue>
            </StatInfo>
          </StatCard>
          <StatCard $gradient="linear-gradient(90deg, var(--success), var(--primary))">
            <StatIcon $bgColor="var(--success-light)" $iconColor="var(--success)"><FiTrendingUp /></StatIcon>
            <StatInfo>
              <StatLabel>Total income (7d)</StatLabel>
              <StatValue style={{ color: 'var(--success)' }}>+${totalIncome7.toFixed(2)}</StatValue>
            </StatInfo>
          </StatCard>
        </StatsGrid>
        <DashboardFlex>
          {/* Left: Chart + Recent Transactions */}
          <DashboardLeft>
            {/* Working Capital Summary */}
            <Section style={{ minHeight: 180, display: 'flex', flexDirection: 'column' }}>
              <SectionHeader>
                <SectionTitle>Working Capital (Last 7 Days)</SectionTitle>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>Income: +${totalIncome7.toFixed(2)}</span>
                  <span style={{ color: 'var(--danger)', fontWeight: 600 }}>Expenses: -${totalExpense7.toFixed(2)}</span>
                </div>
              </SectionHeader>
              <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Net: ${(totalIncome7 - totalExpense7).toFixed(2)}
              </div>
            </Section>
            {/* Recent Transactions Table */}
            <Section>
              <SectionHeader>
                <SectionTitle>Recent Transactions</SectionTitle>
                <ViewAllButton onClick={() => navigate('/transactions')}>View All</ViewAllButton>
              </SectionHeader>
              <TableWrapper>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-secondary)', fontSize: 14, textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px' }}>NAME/BUSINESS</th>
                      <th style={{ padding: '12px 8px' }}>TYPE</th>
                      <th style={{ padding: '12px 8px' }}>AMOUNT</th>
                      <th style={{ padding: '12px 8px' }}>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(tx => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
                        <TableCell bold>{tx.title}<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>{tx.category}</div></TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell style={{ color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>{tx.type === 'income' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}</TableCell>
                        <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrapper>
            </Section>
          </DashboardLeft>
          {/* Right: Wallet + Goals Progress */}
          <DashboardRight>
            {/* Edit Card and Quick Add Buttons - sticky on mobile, normal row on desktop */}
            <div>
              <div className="desktop-action-btn-row" style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
                <RippleButton onClick={() => { setShowEditCard(true); }} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 12, padding: '14px 28px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 4px 24px 0 rgba(80,80,180,0.10)' }}>
                  <FiEdit2 style={{ marginRight: 10 }} /> Edit Card
                </RippleButton>
                <RippleButton onClick={() => setShowQuickAdd(true)} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 12, padding: '14px 28px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 4px 24px 0 rgba(80,80,180,0.10)' }}>
                  <FiPlus style={{ marginRight: 10 }} /> Quick Add
                </RippleButton>
              </div>
              <div className="sticky-action-btn" style={{ gap: 16 }}>
                <RippleButton onClick={() => { setShowEditCard(true); }} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 12, padding: '14px 28px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 4px 24px 0 rgba(80,80,180,0.10)' }}>
                  <FiEdit2 style={{ marginRight: 10 }} /> Edit Card
                </RippleButton>
                <RippleButton onClick={() => setShowQuickAdd(true)} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 12, padding: '14px 28px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 4px 24px 0 rgba(80,80,180,0.10)' }}>
                  <FiPlus style={{ marginRight: 10 }} /> Quick Add
                </RippleButton>
              </div>
            </div>

            {/* Quick Add Modal */}
            {showQuickAdd && (
              <EditCardModalOverlay onClick={() => setShowQuickAdd(false)}>
                <EditCardModal onClick={e => e.stopPropagation()}>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Quick Add Transaction</div>
                  <form onSubmit={e => { e.preventDefault(); quickHandleSubmit(handleQuickAdd); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <label style={{ fontWeight: 600 }}>Title
                      <input type="text" value={quickValues.title} onChange={e => quickHandleChange('title', e.target.value)} onBlur={() => quickHandleBlur('title')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} />
                      {quickTouched.title && quickErrors.title && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{quickErrors.title}</div>}
                    </label>
                    <label style={{ fontWeight: 600 }}>Amount
                      <input type="number" value={quickValues.amount} onChange={e => quickHandleChange('amount', e.target.value)} onBlur={() => quickHandleBlur('amount')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} />
                      {quickTouched.amount && quickErrors.amount && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{quickErrors.amount}</div>}
                    </label>
                    <label style={{ fontWeight: 600 }}>Type
                      <select value={quickValues.type} onChange={e => quickHandleChange('type', e.target.value)} onBlur={() => quickHandleBlur('type')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                      {quickTouched.type && quickErrors.type && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{quickErrors.type}</div>}
                    </label>
                    <label style={{ fontWeight: 600 }}>Category
                      <select value={quickValues.category} onChange={e => quickHandleChange('category', e.target.value)} onBlur={() => quickHandleBlur('category')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }}>
                        <option value="">Select a category</option>
                        {Object.values(state.categories).flat().map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {quickTouched.category && quickErrors.category && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{quickErrors.category}</div>}
                    </label>
                    <label style={{ fontWeight: 600 }}>Date
                      <input type="date" value={quickValues.date} onChange={e => quickHandleChange('date', e.target.value)} onBlur={() => quickHandleBlur('date')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} />
                      {quickTouched.date && quickErrors.date && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{quickErrors.date}</div>}
                    </label>
                    <label style={{ fontWeight: 600 }}>Description (Optional)
                      <input type="text" value={quickValues.description} onChange={e => quickHandleChange('description', e.target.value)} onBlur={() => quickHandleBlur('description')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} />
                    </label>
                    <button type="submit" style={{ marginTop: 10, background: 'var(--accent-primary)', color: 'var(--text-inverse)', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}>Add Transaction</button>
                  </form>
                  <button onClick={() => setShowQuickAdd(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
                </EditCardModal>
              </EditCardModalOverlay>
            )}
            {/* Wallet Cards */}
            <Section style={{ padding: 0, background: 'transparent', boxShadow: 'none', border: 'none', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Wallet</div>
                {cardDetails.map((card, idx) => (
                  <WalletCard key={idx} idx={idx}>
                    {/* Animated highlight */}
                    <WalletCardHighlight />
                    <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, letterSpacing: 1 }}>Mitchell <span style={{ fontWeight: 400, fontSize: 13 }}>{card.bank}</span></div>
                    <div style={{ fontSize: 22, letterSpacing: 2, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      {showCardNumber[idx] ? card.number : card.number.replace(/.(?=.{4})/g, '*')}
                      <span style={{ cursor: 'pointer', marginLeft: 8 }} onClick={() => setShowCardNumber(showCardNumber.map((v, i) => i === idx ? !v : v))}>
                        {showCardNumber[idx] ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13 }}>{card.expiry}</span>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{card.type === 'visa' && <span>VISA</span>}</span>
                    </div>
                  </WalletCard>
                ))}
              </div>
            </Section>
            {/* Edit Card Modal */}
            {showEditCard && (
              <EditCardModalOverlay onClick={() => setShowEditCard(false)}>
                <EditCardModal onClick={e => e.stopPropagation()}>
                  <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, letterSpacing: 1 }}>Edit Card Details</div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                    <EditCardModalButton type="button" onClick={() => setEditCardIdx(0)} $active={editCardIdx === 0}>Card 1</EditCardModalButton>
                    <EditCardModalButton type="button" onClick={() => setEditCardIdx(1)} $active={editCardIdx === 1}>Card 2</EditCardModalButton>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setShowEditCard(false); actions.setCards(cardDetails); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <label style={{ fontWeight: 600 }}>Bank Name
                      <input type="text" value={cardDetails[editCardIdx].bank} onChange={e => setCardDetails(cardDetails.map((c, i) => i === editCardIdx ? { ...c, bank: e.target.value } : c))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} />
                    </label>
                    <label style={{ fontWeight: 600 }}>Card Number
                      <input type="text" value={cardDetails[editCardIdx].number} onChange={e => setCardDetails(cardDetails.map((c, i) => i === editCardIdx ? { ...c, number: e.target.value } : c))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15, letterSpacing: 2 }} maxLength={19} />
                    </label>
                    <label style={{ fontWeight: 600 }}>Expiry
                      <input type="text" value={cardDetails[editCardIdx].expiry} onChange={e => setCardDetails(cardDetails.map((c, i) => i === editCardIdx ? { ...c, expiry: e.target.value } : c))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }} placeholder="MM/YY" maxLength={5} />
                    </label>
                    <label style={{ fontWeight: 600 }}>CVV
                      <input type="text" value={cardDetails[editCardIdx].cvv} onChange={e => setCardDetails(cardDetails.map((c, i) => i === editCardIdx ? { ...c, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0,3) } : c))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15, letterSpacing: 2 }} maxLength={3} />
                    </label>
                    <label style={{ fontWeight: 600 }}>Type
                      <select value={cardDetails[editCardIdx].type} onChange={e => setCardDetails(cardDetails.map((c, i) => i === editCardIdx ? { ...c, type: e.target.value } : c))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginTop: 4, fontSize: 15 }}>
                        <option value="visa">VISA</option>
                        <option value="mastercard">MasterCard</option>
                        <option value="amex">AMEX</option>
                      </select>
                    </label>
                    <button type="submit" style={{ marginTop: 10, background: 'var(--accent-primary)', color: 'var(--text-inverse)', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}>Save</button>
                  </form>
                  <button onClick={() => setShowEditCard(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
                </EditCardModal>
              </EditCardModalOverlay>
            )}
            {/* Goals Progress */}
            <Section>
              <SectionHeader>
                <SectionTitle>Goals Progress</SectionTitle>
              </SectionHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {goals.length === 0 ? (
                  <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 24 }}>No goals yet. Add a goal to start tracking your progress!</div>
                ) : (
                  goals.map(goal => {
                    const percent = calcProgress(goal.currentAmount, goal.targetAmount);
                    return (
                      <GoalProgressContainer key={goal.id}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{goal.title || 'Goal'}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{goal.currentAmount || 0} / {goal.targetAmount || 0}</div>
                        <GoalBarBg>
                          <GoalBarFill style={{ width: `${percent}%` }} />
                        </GoalBarBg>
                        <GoalPercent>{percent}% complete</GoalPercent>
                      </GoalProgressContainer>
                    );
                  })
                )}
              </div>
            </Section>
          </DashboardRight>
        </DashboardFlex>
     
 
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard; 