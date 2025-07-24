import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit3, FiTrash2, FiTarget, FiAlertCircle, FiCheckCircle, FiXCircle, FiCopy } from 'react-icons/fi';
import Layout from '../layouts/Layout';
import { useAppContext } from '../context/AppContext';
import useForm from '../hooks/useForm';
import Tooltip from '../components/Tooltip';

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
`;

const BudgetOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`;

const OverviewCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  box-shadow: var(--shadow-sm);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--accent-primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  font-size: 1.2rem;
`;

const CardTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const CardSubtext = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ActionsBar = styled.div`
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

const ActionButton = styled.button`
  background-color: var(--accent-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
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

const BudgetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
`;

const BudgetItem = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
`;

const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-lg);
`;

const BudgetInfo = styled.div`
  flex: 1;
`;

const BudgetCategory = styled.h4`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
`;

const BudgetAmount = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const BudgetActions = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

const IconButton = styled.button`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--space-sm);
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => {
    if (props.percentage > 100) return 'var(--danger)';
    if (props.percentage > 80) return 'var(--warning)';
    return 'var(--accent-primary)';
  }};
  width: ${props => Math.min(props.percentage, 100)}%;
  transition: all var(--transition-normal);
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const SpentAmount = styled.span`
  color: ${props => props.isOverBudget ? 'var(--danger)' : 'var(--text-primary)'};
  font-weight: 600;
`;

const RemainingAmount = styled.span`
  color: ${props => props.isOverBudget ? 'var(--danger)' : 'var(--text-secondary)'};
`;

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
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.1);
  }
  option {
    background-color: var(--bg-card);
    color: var(--text-primary);
  }
`;

const ErrorText = styled.div`
  color: var(--danger);
  font-size: 0.75rem;
  margin-top: var(--space-xs);
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

const EmptyState = styled.div`
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
`;

/**
 * Budget Component
 * Demonstrates:
 * - Complex state management with multiple pieces of state
 * - Modal management
 * - Form handling with custom hooks
 * - Data calculations and progress tracking
 * - CRUD operations (Create, Read, Update, Delete)
 */
const Budget = () => {
  const { state, actions } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
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

  // Calculate spending from real transactions
  const transactions = state.transactions || [];
  const getPeriodFilter = (period) => {
    const now = new Date();
    if (period === 'monthly') {
      return tx => {
        const txDate = new Date(tx.date);
        return txDate.getFullYear() === now.getFullYear() && txDate.getMonth() === now.getMonth();
      };
    } else if (period === 'weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return tx => {
        const txDate = new Date(tx.date);
        return txDate >= startOfWeek && txDate <= endOfWeek;
      };
    } else if (period === 'yearly') {
      return tx => {
        const txDate = new Date(tx.date);
        return txDate.getFullYear() === now.getFullYear();
      };
    }
    return () => true;
  };
  const getSpentForBudget = (budget) => {
    const periodFilter = getPeriodFilter(budget.period);
    return transactions
      .filter(tx => tx.category === budget.category && tx.type === 'expense' && periodFilter(tx))
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  };
  const totalBudgeted = budgets.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + getSpentForBudget(budget), 0);
  const totalRemaining = totalBudgeted - totalSpent;

  // Form validation rules
  const validationRules = {
    category: {
      required: { message: 'Category is required' }
    },
    amount: {
      required: { message: 'Amount is required' },
      number: { message: 'Please enter a valid number' },
      positive: { message: 'Amount must be greater than 0' }
    },
    period: {
      required: { message: 'Period is required' }
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
    reset
  } = useForm(
    {
      category: '',
      amount: '',
      period: 'monthly'
    },
    validationRules
  );

  // Mock budgets for demonstration
  const mockBudgets = [
    { id: '1', category: 'Food & Dining', amount: 400, period: 'monthly' },
    { id: '2', category: 'Transportation', amount: 200, period: 'monthly' },
    { id: '3', category: 'Shopping', amount: 300, period: 'monthly' },
    { id: '4', category: 'Utilities', amount: 250, period: 'monthly' },
    { id: '5', category: 'Entertainment', amount: 200, period: 'monthly' },
  ];

  // Use real budgets if available, otherwise use mock data
  const budgets = state.budgets.length > 0 ? state.budgets : mockBudgets;

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      if (editingBudget) {
        // Update existing budget
        actions.updateBudget({
          ...editingBudget,
          ...formData,
          amount: parseFloat(formData.amount)
        });
        actions.addNotification('Budget updated successfully!', 'success');
      } else {
        // Add new budget
        actions.addBudget({
          ...formData,
          amount: parseFloat(formData.amount)
        });
        actions.addNotification('Budget created successfully!', 'success');
      }
      
      // Close modal and reset form
      setShowModal(false);
      setEditingBudget(null);
      reset();
    } catch (error) {
      console.error('Budget operation error:', error);
      actions.addNotification('Failed to save budget. Please try again.', 'error');
    }
  };

  // Handle edit budget
  const handleEdit = (budget) => {
    setEditingBudget(budget);
    handleChange('category', budget.category);
    handleChange('amount', budget.amount.toString());
    handleChange('period', budget.period);
    setShowModal(true);
  };

  // Handle delete budget
  const handleDelete = (budgetId) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      actions.deleteBudget(budgetId);
      actions.addNotification('Budget deleted successfully!', 'success');
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBudget(null);
    reset();
  };

  return (
    <Layout title="Budget Planner">
      <BudgetContainer>
        {/* Budget Overview */}
        <BudgetOverview>
          <OverviewCard>
            <CardHeader>
              <CardIcon><FiTarget /></CardIcon>
              <CardTitle>Total Budgeted</CardTitle>
            </CardHeader>
            <CardValue>${totalBudgeted.toFixed(2)}</CardValue>
            <CardSubtext>Monthly budget allocation</CardSubtext>
          </OverviewCard>

          <OverviewCard>
            <CardHeader>
              <CardIcon><FiTarget /></CardIcon>
              <CardTitle>Total Spent</CardTitle>
            </CardHeader>
            <CardValue>${totalSpent.toFixed(2)}</CardValue>
            <CardSubtext>This month's expenses</CardSubtext>
          </OverviewCard>

          <OverviewCard>
            <CardHeader>
              <CardIcon><FiTarget /></CardIcon>
              <CardTitle>Remaining</CardTitle>
            </CardHeader>
            <CardValue style={{ color: totalRemaining >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              ${totalRemaining.toFixed(2)}
            </CardValue>
            <CardSubtext>
              {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
            </CardSubtext>
          </OverviewCard>
        </BudgetOverview>

        {/* Actions Bar */}
        <ActionsBar>
          <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Budget Categories</h2>
          <Tooltip content="Add new budget (Shortcut: N)" position="bottom">
            <ActionButton onClick={() => setShowModal(true)} aria-label="Add new budget">
              <FiPlus /> Add Budget
            </ActionButton>
          </Tooltip>
        </ActionsBar>

        {/* Budget List */}
        <BudgetList>
          {budgets.map(budget => {
            const spent = getSpentForBudget(budget);
            const percentage = (spent / budget.amount) * 100;
            const remaining = budget.amount - spent;
            const isOverBudget = spent > budget.amount;
            return (
              <BudgetItem key={budget.id}>
                <BudgetHeader>
                  <BudgetInfo>
                    <BudgetCategory>
                      {budget.category}
                      {isOverBudget && <FiAlertCircle style={{ color: 'var(--danger)', marginLeft: '8px' }} />}
                    </BudgetCategory>
                    <BudgetAmount>${budget.amount} / {budget.period}</BudgetAmount>
                  </BudgetInfo>
                  <BudgetActions>
                    <Tooltip content="Edit budget" position="top">
                      <IconButton onClick={() => handleEdit(budget)} aria-label="Edit budget"><FiEdit3 /></IconButton>
                    </Tooltip>
                    <Tooltip content="Delete budget" position="top">
                      <IconButton onClick={() => handleDelete(budget.id)} aria-label="Delete budget"><FiTrash2 /></IconButton>
                    </Tooltip>
                  </BudgetActions>
                </BudgetHeader>
                <ProgressBar>
                  <ProgressFill percentage={percentage} />
                </ProgressBar>
                <ProgressText>
                  <SpentAmount isOverBudget={isOverBudget}>
                    Spent: ${spent.toFixed(2)}
                  </SpentAmount>
                  <RemainingAmount isOverBudget={isOverBudget}>
                    {isOverBudget ? `Over by: $${Math.abs(remaining).toFixed(2)}` : `Remaining: $${remaining.toFixed(2)}`}
                  </RemainingAmount>
                </ProgressText>
              </BudgetItem>
            );
          })}

          {budgets.length === 0 && (
            <EmptyState>
              <FiTarget size={48} style={{ opacity: 0.5 }} />
              <div>No budgets created yet. Start by adding your first budget!</div>
            </EmptyState>
          )}
        </BudgetList>

        {/* Modal */}
        {showModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>{editingBudget ? 'Edit Budget' : 'Add New Budget'}</ModalTitle>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
              </ModalHeader>

              <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Select
                      id="category"
                      value={values.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      onBlur={() => handleBlur('category')}
                      aria-invalid={!!errors.category}
                      aria-describedby="category-error"
                    >
                      <option value="">Select a category</option>
                      {Object.values(state.categories).flat().map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Select>
                    {touched.category && !errors.category && <FiCheckCircle color="var(--success)" aria-label="Valid" />}
                    {touched.category && errors.category && <FiXCircle color="var(--danger)" aria-label="Invalid" />}
                  </div>
                  {touched.category && errors.category && (
                    <ErrorText id="category-error">{errors.category}</ErrorText>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="amount">Amount</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="Enter budget amount"
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
                  <Label htmlFor="period">Period</Label>
                  <Select
                    id="period"
                    value={values.period}
                    onChange={(e) => handleChange('period', e.target.value)}
                    onBlur={() => handleBlur('period')}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Select>
                </FormGroup>
                <FormActions>
                  <CancelButton type="button" onClick={handleCloseModal}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (editingBudget ? 'Update Budget' : 'Create Budget')}
                  </SubmitButton>
                </FormActions>
              </Form>
            </Modal>
          </ModalOverlay>
        )}
      </BudgetContainer>
    </Layout>
  );
};

export default Budget; 