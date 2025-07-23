import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import PageLayout from '../layouts/Layout'
import { useAppContext } from '../context/AppContext'
import useForm from '../hooks/useForm'
import useDebounce from '../hooks/useDebounce'
import { FiFilter, FiSearch, FiDownload, FiPlus, FiEdit3, FiTrash2, FiCalendar, FiDollarSign, FiTrendingUp, FiTrendingDown, FiCreditCard } from 'react-icons/fi'

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
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--md);
    align-items: stretch;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: var(--md);
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-main-light);
  font-size: 0.95rem;
  &::placeholder {
    color: var(--text-secondary-light);
  }
  &:focus {
    outline: none;
    border-color: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(34,197,94,0.10);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterButton = styled.button`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-secondary-light);
  display: flex;
  align-items: center;
  gap: var(--sm);
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    border-color: var(--accent-green);
    color: var(--accent-green-dark);
  }
`;

const FilterSelect = styled.select`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-main-light);
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: var(--accent-green);
  }
  option {
    background: var(--bg-card-light);
    color: var(--text-main-light);
  }
`;

const ActionButton = styled.button`
  background: var(--accent-green);
  border: none;
  border-radius: var(--radius);
  padding: var(--md) var(--lg);
  color: var(--bg-card-light);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--sm);
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    background: var(--accent-green-dark);
    transform: translateY(-1px);
  }
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--lg);
  margin-bottom: var(--xl);
`;

const StatCard = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--lg);
  text-align: center;
  box-shadow: var(--shadow-light);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main-light);
  margin-bottom: var(--xs);
`;

const StatLabel = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TransactionsTable = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-light);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  gap: var(--md);
  padding: var(--lg) var(--xl);
  background: var(--bg-sidebar-light);
  border-bottom: 1px solid var(--border-light);
  font-weight: 600;
  color: var(--text-secondary-light);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
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
  gap: var(--md);
  padding: var(--lg) var(--xl);
  border-bottom: 1px solid var(--border-light);
  transition: var(--transition);
  &:hover {
    background: var(--bg-sidebar-light);
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
  gap: var(--sm);
  color: var(--text-main-light);
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
  color: var(--bg-card-light);
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: var(--text-main-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionCategory = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.8rem;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'income' ? 'var(--success-green)' : 'var(--danger-red)'};
  text-align: right;
`;

const TransactionDate = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  background: var(--accent-green-light);
  color: var(--accent-green-dark);
  padding: var(--xs) var(--sm);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  background: ${props => props.status === 'completed' ? 'var(--success-green)' : 
                props.status === 'pending' ? 'var(--warning-orange)' : 'var(--danger-red)'};
  color: var(--bg-card-light);
  padding: var(--xs) var(--sm);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--xs);
`;

const IconButton = styled.button`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--xs);
  color: var(--text-secondary-light);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: var(--accent-green-dark);
    border-color: var(--accent-green);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--xxl);
  color: var(--text-secondary-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--md);
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--md);
`;

const Modal = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-light);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--lg);
`;

const ModalTitle = styled.h3`
  color: var(--text-main-light);
  font-size: 1.3rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: var(--text-main-light);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--md);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xs);
`;

const Label = styled.label`
  color: var(--text-main-light);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-main-light);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(34,197,94,0.10);
  }
  &::placeholder {
    color: var(--text-secondary-light);
  }
`;

const Select = styled.select`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-main-light);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent-green);
  }
  option {
    background: var(--bg-card-light);
    color: var(--text-main-light);
  }
`;

const Textarea = styled.textarea`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  color: var(--text-main-light);
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: var(--accent-green);
  }
  &::placeholder {
    color: var(--text-secondary-light);
  }
`;

const TypeToggle = styled.div`
  display: flex;
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  overflow: hidden;
`;

const TypeOption = styled.button`
  flex: 1;
  padding: var(--md);
  background: ${props => props.active ? 'var(--accent-green)' : 'transparent'};
  color: ${props => props.active ? 'var(--bg-card-light)' : 'var(--text-main-light)'};
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--xs);
  &:hover {
    background: ${props => props.active ? 'var(--accent-green)' : 'var(--accent-green-light)'};
    color: ${props => props.active ? 'var(--bg-card-light)' : 'var(--accent-green-dark)'};
  }
`;

const ErrorText = styled.div`
  color: var(--danger-red);
  font-size: 0.8rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: var(--md);
  margin-top: var(--lg);
`;

const SubmitButton = styled.button`
  background: var(--accent-green);
  color: var(--bg-card-light);
  border: none;
  border-radius: var(--radius);
  padding: var(--md) var(--lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  flex: 1;
  &:hover {
    background: var(--accent-green-dark);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: var(--bg-sidebar-light);
  color: var(--text-main-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md) var(--lg);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    border-color: var(--accent-green);
    color: var(--accent-green-dark);
  }
`;

const Transactions = () => {
  const { state, actions } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

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
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      actions.deleteTransaction(transactionId);
      actions.addNotification('Transaction deleted successfully!', 'success');
    }
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

  return (
    <PageLayout title="Transaction History">
      <TransactionsContainer>
        {/* Header Section */}
        <HeaderSection>
          <SearchSection>
            <div style={{ position: 'relative' }}>
              <SearchInput 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </FilterSelect>
            <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>
          </SearchSection>
          <div style={{ display: 'flex', gap: 'var(--md)' }}>
            <FilterButton onClick={handleExport}>
              <FiDownload />
              Export
            </FilterButton>
            <ActionButton onClick={() => setShowModal(true)}>
              <FiPlus />
              Add Transaction
            </ActionButton>
          </div>
        </HeaderSection>

        {/* Stats Cards */}
        <StatsCards>
          <StatCard>
            <StatNumber>{totalTransactions}</StatNumber>
            <StatLabel>Total Transactions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{state.user.currency}{totalIncome.toFixed(2)}</StatNumber>
            <StatLabel>Total Income</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{state.user.currency}{totalExpenses.toFixed(2)}</StatNumber>
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
                  <TransactionIcon type={transaction.type}>
                    {transaction.type === 'income' ? <FiTrendingUp /> : <FiTrendingDown />}
                  </TransactionIcon>
                  <TransactionInfo>
                    <TransactionTitle>{transaction.title}</TransactionTitle>
                    <TransactionCategory>{transaction.category}</TransactionCategory>
                  </TransactionInfo>
                </TransactionCell>
                
                <TransactionCell>
                  <TransactionAmount type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '-'}{state.user.currency}{Math.abs(transaction.amount).toFixed(2)}
                  </TransactionAmount>
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
                    <IconButton onClick={() => handleEdit(transaction)}>
                      <FiEdit3 />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(transaction.id)}>
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
              <div style={{ fontSize: '0.9rem' }}>
                {searchTerm || filterType !== 'all' || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first transaction'
                }
              </div>
            </EmptyState>
          )}
        </TransactionsTable>

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
                  <Input
                    type="text"
                    id="title"
                    placeholder="e.g., Grocery Shopping, Salary Payment"
                    value={values.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    onBlur={() => handleBlur('title')}
                  />
                  {touched.title && errors.title && (
                    <ErrorText>{errors.title}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    value={values.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    onBlur={() => handleBlur('amount')}
                    step="0.01"
                    min="0"
                  />
                  {touched.amount && errors.amount && (
                    <ErrorText>{errors.amount}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={values.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    onBlur={() => handleBlur('category')}
                  >
                    <option value="">Select a category</option>
                    {state.categories[values.type]?.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <ErrorText>{errors.category}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    id="date"
                    value={values.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    onBlur={() => handleBlur('date')}
                  />
                  {touched.date && errors.date && (
                    <ErrorText>{errors.date}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional notes..."
                    value={values.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
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
    </PageLayout>
  )
}

export default Transactions 