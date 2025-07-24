import React, { useState, useMemo, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../layouts/Layout'
import { useAppContext } from '../context/AppContext'
import useForm from '../hooks/useForm'
import useDebounce from '../hooks/useDebounce'
import Tooltip from '../components/Tooltip'
import { FiFilter, FiSearch, FiDownload, FiPlus, FiEdit3, FiTrash2, FiCalendar, FiDollarSign, FiTrendingUp, FiTrendingDown, FiCreditCard, FiCheckCircle, FiXCircle, FiCopy } from 'react-icons/fi'
import Swal from 'sweetalert2';

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-lg);
    align-items: stretch;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: var(--space-lg);
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  font-size: 0.875rem;
  &::placeholder {
    color: var(--text-secondary);
  }
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.1);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
  option {
    background-color: var(--bg-card);
    color: var(--text-primary);
  }
`;

const ActionButton = styled.button`
  background-color: var(--accent-primary);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  color: var(--text-inverse);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover {
    background-color: var(--accent-primary-hover);
    transform: translateY(-1px);
  }
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`;

const StatCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TransactionsTable = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  gap: var(--space-lg);
  padding: var(--space-xl);
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 100px;
    > div:nth-child(3),
    > div:nth-child(4),
    > div:nth-child(5) {
      display: none;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  gap: var(--space-lg);
  padding: var(--space-xl);
  border-bottom: 1px solid var(--border-primary);
  transition: all var(--transition-fast);
  &:hover {
    background-color: var(--bg-tertiary);
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 100px;
    > div:nth-child(3),
    > div:nth-child(4),
    > div:nth-child(5) {
      display: none;
    }
  }
`;

const TransactionCell = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);
`;

const TransactionIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${props => props.type === 'income' ? 'var(--success)' : 'var(--danger)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: var(--text-inverse);
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionCategory = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'income' ? 'var(--success)' : 'var(--danger)'};
  text-align: right;
`;

const TransactionDate = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const CategoryBadge = styled.span`
  background-color: var(--accent-primary-light);
  color: var(--accent-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  background-color: ${props => props.status === 'completed' ? 'var(--success)' : 
                props.status === 'pending' ? 'var(--warning)' : 'var(--danger)'};
  color: var(--text-inverse);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-xs);
`;

const IconButton = styled.button`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--space-lg);
`;

const Modal = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
`;

const ModalTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: var(--text-primary);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.1);
  }
  &::placeholder {
    color: var(--text-secondary);
  }
  &:invalid {
    border-color: var(--danger);
    box-shadow: none;
  }
  &:valid {
    border-color: var(--success);
    box-shadow: none;
  }
`;

const Select = styled.select`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
  option {
    background-color: var(--bg-card);
    color: var(--text-primary);
  }
`;

const Textarea = styled.textarea`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const TypeToggle = styled.div`
  display: flex;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const TypeOption = styled.button`
  flex: 1;
  padding: var(--space-md);
  background-color: ${props => props.active ? 'var(--accent-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--text-inverse)' : 'var(--text-primary)'};
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-primary)' : 'var(--accent-primary-light)'};
    color: ${props => props.active ? 'var(--text-inverse)' : 'var(--accent-primary)'};
  }
`;

const ErrorText = styled.div`
  color: var(--danger);
  font-size: 0.75rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-xl);
`;

const SubmitButton = styled.button`
  background-color: var(--accent-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  flex: 1;
  &:hover {
    background-color: var(--accent-primary-hover);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const Transactions = () => {
  const { state, actions } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewingTransaction, setViewingTransaction] = useState(null);
  const searchInputRef = useRef();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'n' || e.key === 'N') {
        setShowModal(true);
      }
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Form validation rules
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

  // Form hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue
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

  // Mock transactions for demo
  const mockTransactions = [
    { id: '1', title: 'Salary Payment', amount: 4200, type: 'income', category: 'Salary', date: '2024-01-15', description: 'Monthly salary' },
    { id: '2', title: 'Grocery Shopping', amount: 85.50, type: 'expense', category: 'Food & Dining', date: '2024-01-14', description: 'Weekly groceries' },
    { id: '3', title: 'Freelance Work', amount: 750, type: 'income', category: 'Freelance', date: '2024-01-13', description: 'Website development project' },
    { id: '4', title: 'Gas Station', amount: 45.20, type: 'expense', category: 'Transportation', date: '2024-01-12', description: 'Fuel for car' },
    { id: '5', title: 'Online Purchase', amount: 120, type: 'expense', category: 'Shopping', date: '2024-01-11', description: 'Books and electronics' },
    { id: '6', title: 'Electricity Bill', amount: 95.30, type: 'expense', category: 'Utilities', date: '2024-01-10', description: 'Monthly electricity bill' },
    { id: '7', title: 'Investment Dividend', amount: 320, type: 'income', category: 'Investment', date: '2024-01-09', description: 'Quarterly dividend payment' },
    { id: '8', title: 'Restaurant Dinner', amount: 65.80, type: 'expense', category: 'Food & Dining', date: '2024-01-08', description: 'Dinner with friends' },
  ];

  // Use real transactions if available, otherwise use mock data
  const allTransactions = state.transactions.length > 0 ? state.transactions : mockTransactions;

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      const matchesSearch = transaction.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           (transaction.description && transaction.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [allTransactions, debouncedSearchTerm, filterType, filterCategory]);

  // Calculate stats
  const totalTransactions = filteredTransactions.length;
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  // Get unique categories
  const allCategories = [...new Set(allTransactions.map(t => t.category))];

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (editingTransaction) {
        actions.updateTransaction({ ...editingTransaction, ...transactionData });
        actions.addNotification('Transaction updated successfully!', 'success');
      } else {
        actions.addTransaction(transactionData);
        actions.addNotification('Transaction added successfully!', 'success');
      }
      
      setShowModal(false);
      setEditingTransaction(null);
      reset();
    } catch (error) {
      console.error('Transaction operation error:', error);
      actions.addNotification('Failed to save transaction. Please try again.', 'error');
    }
  };

  // Handle edit transaction
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setValue('title', transaction.title);
    setValue('amount', transaction.amount.toString());
    setValue('type', transaction.type);
    setValue('category', transaction.category);
    setValue('date', transaction.date);
    setValue('description', transaction.description || '');
    setShowModal(true);
  };

  // Handle delete transaction
  const handleDelete = (transactionId) => {
    Swal.fire({
      title: 'Delete Transaction?',
      text: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    }).then((result) => {
      if (result.isConfirmed) {
        actions.deleteTransaction(transactionId);
        actions.addNotification('Transaction deleted successfully!', 'success');
      }
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
    reset();
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      'Date,Title,Category,Type,Amount,Description',
      ...filteredTransactions.map(t => 
        `${t.date},"${t.title}",${t.category},${t.type},${t.amount},"${t.description || ''}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    actions.addNotification('Transactions exported successfully!', 'success');
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    actions.addNotification('Copied to clipboard!', 'success');
  };

  return (
    <Layout title="Transaction History">
      <TransactionsContainer>
        {/* Header Section */}
        <HeaderSection>
          <SearchSection>
            <div style={{ position: 'relative' }}>
              <Tooltip content="Search transactions (Shortcut: /)" position="bottom">
                <SearchInput 
                  ref={searchInputRef}
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Tooltip>
            </div>
            <Tooltip content="Filter by type" position="bottom">
              <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </FilterSelect>
            </Tooltip>
            <Tooltip content="Filter by category" position="bottom">
              <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </FilterSelect>
            </Tooltip>
          </SearchSection>
          <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
            <Tooltip content="Export transactions as CSV" position="bottom">
              <ActionButton onClick={handleExport} aria-label="Export transactions">
                <FiDownload />
                Export
              </ActionButton>
            </Tooltip>
            <div className="desktop-action-btn-row">
              <Tooltip content="Add new transaction (Shortcut: N)" position="bottom">
                <ActionButton onClick={() => setShowModal(true)} aria-label="Add new transaction">
                  <FiPlus /> Add Transaction
                </ActionButton>
              </Tooltip>
            </div>
          </div>
        </HeaderSection>
        {/* Sticky Add Transaction Button for Mobile */}
        <div className="sticky-action-btn">
          <ActionButton onClick={() => setShowModal(true)} aria-label="Add new transaction">
            <FiPlus /> Add Transaction
          </ActionButton>
        </div>

        {/* Stats Cards */}
        <StatsCards>
          <StatCard>
            <StatNumber>{totalTransactions}</StatNumber>
            <StatLabel>Total Transactions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>${totalIncome.toFixed(2)}</StatNumber>
            <StatLabel>Total Income</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>${totalExpenses.toFixed(2)}</StatNumber>
            <StatLabel>Total Expenses</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{allCategories.length}</StatNumber>
            <StatLabel>Categories</StatLabel>
          </StatCard>
        </StatsCards>

        {/* Transactions Table */}
        <TransactionsTable>
          <TableHeader>
            <div>Transaction</div>
            <div>Amount</div>
            <div>Category</div>
            <div>Date</div>
            <div>Type</div>
            <div>Actions</div>
          </TableHeader>
          
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TransactionCell>
                  <Tooltip content="Copy title" position="top">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {transaction.title}
                      <FiCopy style={{ cursor: 'pointer' }} onClick={() => handleCopy(transaction.title)} tabIndex={0} aria-label="Copy title" />
                    </span>
                  </Tooltip>
                </TransactionCell>
                
                <TransactionCell>
                  <Tooltip content="Copy amount" position="top">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {transaction.amount}
                      <FiCopy style={{ cursor: 'pointer' }} onClick={() => handleCopy(transaction.amount)} tabIndex={0} aria-label="Copy amount" />
                    </span>
                  </Tooltip>
                </TransactionCell>
                
                <TransactionCell>
                  <CategoryBadge>{transaction.category}</CategoryBadge>
                </TransactionCell>
                
                <TransactionCell>
                  <TransactionDate>{new Date(transaction.date).toLocaleDateString()}</TransactionDate>
                </TransactionCell>
                
                <TransactionCell>
                  <StatusBadge status="completed">
                    {transaction.type}
                  </StatusBadge>
                </TransactionCell>
                
                <TransactionCell>
                  <ActionButtons>
                    <IconButton onClick={() => setViewingTransaction(transaction)} aria-label="View transaction">
                      View
                    </IconButton>
                    <IconButton onClick={() => handleEdit(transaction)} aria-label="Edit transaction">
                      <FiEdit3 />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(transaction.id)} aria-label="Delete transaction">
                      <FiTrash2 />
                    </IconButton>
                  </ActionButtons>
                </TransactionCell>
              </TableRow>
            ))
          ) : (
            <EmptyState>
              <FiCreditCard size={48} style={{ opacity: 0.5 }} />
              <div>No transactions found</div>
              <div style={{ fontSize: '0.875rem' }}>
                {searchTerm || filterType !== 'all' || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first transaction'
                }
              </div>
            </EmptyState>
          )}
        </TransactionsTable>

        {/* View Transaction Modal */}
        {viewingTransaction && (
          <ModalOverlay onClick={() => setViewingTransaction(null)}>
            <Modal onClick={e => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>View Transaction</ModalTitle>
                <CloseButton onClick={() => setViewingTransaction(null)}>×</CloseButton>
              </ModalHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div><b>Title:</b> {viewingTransaction.title}</div>
                <div><b>Amount:</b> {viewingTransaction.amount}</div>
                <div><b>Type:</b> {viewingTransaction.type}</div>
                <div><b>Category:</b> {viewingTransaction.category}</div>
                <div><b>Date:</b> {new Date(viewingTransaction.date).toLocaleDateString()}</div>
                {viewingTransaction.description && (
                  <div><b>Description:</b> {viewingTransaction.description}</div>
                )}
              </div>
            </Modal>
          </ModalOverlay>
        )}
        {/* Modal */}
        {showModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>
                  {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                </ModalTitle>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
              </ModalHeader>

              <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}>
                <FormGroup>
                  <Label>Transaction Type</Label>
                  <TypeToggle>
                    <TypeOption
                      type="button"
                      active={values.type === 'expense'}
                      onClick={() => handleChange('type', 'expense')}
                    >
                      <FiTrendingDown /> Expense
                    </TypeOption>
                    <TypeOption
                      type="button"
                      active={values.type === 'income'}
                      onClick={() => handleChange('type', 'income')}
                    >
                      <FiTrendingUp /> Income
                    </TypeOption>
                  </TypeToggle>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="title">Title</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Enter transaction title"
                      value={values.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      onBlur={() => handleBlur('title')}
                      aria-invalid={!!errors.title}
                      aria-describedby="title-error"
                    />
                    {touched.title && !errors.title && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                    {touched.title && errors.title && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  </div>
                  {touched.title && errors.title && (
                    <ErrorText id="title-error">{errors.title}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="amount">Amount</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="Enter amount"
                      value={values.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      onBlur={() => handleBlur('amount')}
                      aria-invalid={!!errors.amount}
                      aria-describedby="amount-error"
                    />
                    {touched.amount && !errors.amount && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                    {touched.amount && errors.amount && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  </div>
                  {touched.amount && errors.amount && (
                    <ErrorText id="amount-error">{errors.amount}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={values.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    onBlur={() => handleBlur('category')}
                    aria-invalid={!!errors.category}
                    aria-describedby="category-error"
                  >
                    <option value="">Select a category</option>
                    {state.categories[values.type]?.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  {touched.category && !errors.category && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                  {touched.category && errors.category && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  {touched.category && errors.category && (
                    <ErrorText id="category-error">{errors.category}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="date">Date</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Input
                      type="date"
                      id="date"
                      value={values.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      onBlur={() => handleBlur('date')}
                      aria-invalid={!!errors.date}
                      aria-describedby="date-error"
                    />
                    {touched.date && !errors.date && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                    {touched.date && errors.date && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  </div>
                  {touched.date && errors.date && (
                    <ErrorText id="date-error">{errors.date}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional notes..."
                    value={values.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    aria-invalid={!!errors.description}
                    aria-describedby="description-error"
                  />
                  {touched.description && !errors.description && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                  {touched.description && errors.description && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  {touched.description && errors.description && (
                    <ErrorText id="description-error">{errors.description}</ErrorText>
                  )}
                </FormGroup>

                <FormActions>
                  <CancelButton type="button" onClick={handleCloseModal}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (editingTransaction ? 'Update Transaction' : 'Add Transaction')}
                  </SubmitButton>
                </FormActions>
              </Form>
            </Modal>
          </ModalOverlay>
        )}
      </TransactionsContainer>
    </Layout>
  )
}

export default Transactions 