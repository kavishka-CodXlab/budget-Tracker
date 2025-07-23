import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit3, FiTrash2, FiTarget, FiAlertCircle } from 'react-icons/fi';
import PageLayout from '../layouts/Layout';
import { useAppContext } from '../context/AppContext';
import useForm from '../hooks/useForm';

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xl);
`;

const BudgetOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--lg);
  margin-bottom: var(--xl);
`;

const OverviewCard = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--lg);
  display: flex;
  flex-direction: column;
  gap: var(--sm);
  box-shadow: var(--shadow-light);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sm);
  margin-bottom: var(--md);
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: var(--accent-green-light);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-green-dark);
  font-size: 1.2rem;
`;

const CardTitle = styled.h3`
  color: var(--text-main-light);
  font-size: 1.1rem;
  font-weight: 600;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main-light);
  margin-bottom: var(--xs);
`;

const CardSubtext = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
`;

const ActionsBar = styled.div`
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

const ActionButton = styled.button`
  background: var(--accent-green);
  color: var(--bg-card-light);
  border: none;
  border-radius: var(--radius);
  padding: var(--md) var(--lg);
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

const BudgetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--lg);
`;

const BudgetItem = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--lg);
  box-shadow: var(--shadow-light);
`;

const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--md);
`;

const BudgetInfo = styled.div`
  flex: 1;
`;

const BudgetCategory = styled.h4`
  color: var(--text-main-light);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--xs);
`;

const BudgetAmount = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
`;

const BudgetActions = styled.div`
  display: flex;
  gap: var(--sm);
`;

const IconButton = styled.button`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--sm);
  color: var(--text-secondary-light);
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    color: var(--accent-green-dark);
    border-color: var(--accent-green);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--bg-sidebar-light);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--sm);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => {
    if (props.percentage > 100) return 'var(--danger-red)';
    if (props.percentage > 80) return 'var(--warning-orange)';
    return 'var(--accent-green)';
  }};
  width: ${props => Math.min(props.percentage, 100)}%;
  transition: var(--transition);
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const SpentAmount = styled.span`
  color: ${props => props.isOverBudget ? 'var(--danger-red)' : 'var(--text-main-light)'};
  font-weight: 600;
`;

const RemainingAmount = styled.span`
  color: ${props => props.isOverBudget ? 'var(--danger-red)' : 'var(--text-secondary-light)'};
`;

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
    box-shadow: 0 0 0 2px rgba(34,197,94,0.10);
  }
  option {
    background: var(--bg-card-light);
    color: var(--text-main-light);
  }
`;

const ErrorText = styled.div`
  color: var(--danger-red);
  font-size: 0.8rem;
  margin-top: var(--xs);
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

const EmptyState = styled.div`
  text-align: center;
  padding: var(--xxl);
  color: var(--text-secondary-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--md);
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

  // Mock spending data (in a real app, this would be calculated from transactions)
  const mockSpending = {
    'Food & Dining': 320.50,
    'Transportation': 180.25,
    'Shopping': 450.00,
    'Utilities': 220.30,
    'Entertainment': 150.75,
  };

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

  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);
  const totalSpent = Object.values(mockSpending).reduce((sum, amount) => sum + amount, 0);
  const totalRemaining = totalBudgeted - totalSpent;

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
    <PageLayout title="Budget Planning">
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
            <CardValue style={{ color: totalRemaining >= 0 ? 'var(--success-green)' : 'var(--danger-red)' }}>
              ${totalRemaining.toFixed(2)}
            </CardValue>
            <CardSubtext>
              {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
            </CardSubtext>
          </OverviewCard>
        </BudgetOverview>

        {/* Actions Bar */}
        <ActionsBar>
          <h2 style={{ color: 'var(--text-main-light)', margin: 0 }}>Budget Categories</h2>
          <ActionButton onClick={() => setShowModal(true)}>
            <FiPlus />
            Add Budget
          </ActionButton>
        </ActionsBar>

        {/* Budget List */}
        <BudgetList>
          {budgets.map(budget => {
            const spent = mockSpending[budget.category] || 0;
            const percentage = (spent / budget.amount) * 100;
            const remaining = budget.amount - spent;
            const isOverBudget = spent > budget.amount;

            return (
              <BudgetItem key={budget.id}>
                <BudgetHeader>
                  <BudgetInfo>
                    <BudgetCategory>
                      {budget.category}
                      {isOverBudget && <FiAlertCircle style={{ color: 'var(--danger-red)', marginLeft: '8px' }} />}
                    </BudgetCategory>
                    <BudgetAmount>${budget.amount} / {budget.period}</BudgetAmount>
                  </BudgetInfo>
                  <BudgetActions>
                    <IconButton onClick={() => handleEdit(budget)}>
                      <FiEdit3 />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(budget.id)}>
                      <FiTrash2 />
                    </IconButton>
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
                <ModalTitle>
                  {editingBudget ? 'Edit Budget' : 'Create New Budget'}
                </ModalTitle>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
              </ModalHeader>

              <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={values.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    onBlur={() => handleBlur('category')}
                  >
                    <option value="">Select a category</option>
                    {state.categories.expense.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <ErrorText>{errors.category}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="amount">Budget Amount</Label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter budget amount"
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
                  {touched.period && errors.period && (
                    <ErrorText>{errors.period}</ErrorText>
                  )}
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
    </PageLayout>
  );
};

export default Budget; 