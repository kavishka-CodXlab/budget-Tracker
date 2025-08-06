import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { migrateCurrencySymbolToCode } from '../utils/currency';

/* eslint-disable react-refresh/only-export-components */

// Initial state structure
const initialState = {
  // User data (always logged in for personal budget tracking)
  user: {
    name: 'Personal Budget',
    email: 'user@example.com',
    avatar: 'PB',
    currency: 'USD'
  },
  
  // Transactions data
  transactions: [],
  
  // Categories for transactions
  categories: {
    income: ['Salary', 'Freelance', 'Investment', 'Side Hustle', 'Gift', 'Other Income'],
    expense: ['Food & Dining', 'Transportation', 'Shopping', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Other Expense']
  },
  
  // Budget and goals
  budgets: [],
  goals: [],
  
  // UI state
  ui: {
    sidebarOpen: false,
    loading: false,
    notifications: []
  },
  
  // Card details
  cards: []
};

// Action types
export const ACTIONS = {
  // User actions
  UPDATE_USER: 'UPDATE_USER',
  
  // Transaction actions
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  
  // Budget actions
  ADD_BUDGET: 'ADD_BUDGET',
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  DELETE_BUDGET: 'DELETE_BUDGET',
  SET_BUDGETS: 'SET_BUDGETS',
  
  // Goal actions
  ADD_GOAL: 'ADD_GOAL',
  UPDATE_GOAL: 'UPDATE_GOAL',
  DELETE_GOAL: 'DELETE_GOAL',
  SET_GOALS: 'SET_GOALS',
  
  // UI actions
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR: 'SET_SIDEBAR',
  SET_LOADING: 'SET_LOADING',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  
  // Category actions
  SET_CATEGORIES: 'SET_CATEGORIES',
  
  // Card actions
  SET_CARDS: 'SET_CARDS',
  UPDATE_CARD: 'UPDATE_CARD'
};

 

// Reducer function to handle state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
      
    case ACTIONS.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };
      
    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
      
    case ACTIONS.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
      
    case ACTIONS.ADD_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, action.payload]
      };
      
    case ACTIONS.UPDATE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget.id === action.payload.id ? action.payload : budget
        )
      };
      
    case ACTIONS.DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter(budget => budget.id !== action.payload)
      };
      
    case ACTIONS.SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      };
      
    case ACTIONS.ADD_GOAL:
      return {
        ...state,
        goals: [...state.goals, action.payload]
      };
      
    case ACTIONS.UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal.id === action.payload.id ? action.payload : goal
        )
      };
      
    case ACTIONS.DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload)
      };
      
    case ACTIONS.SET_GOALS:
      return {
        ...state,
        goals: action.payload
      };
      
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      };
      
    case ACTIONS.SET_SIDEBAR:
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: action.payload }
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      };
      
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, action.payload]
        }
      };
      
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(notification => notification.id !== action.payload)
        }
      };
      
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
      
    case ACTIONS.SET_CARDS:
      return {
        ...state,
        cards: action.payload
      };
      
    case ACTIONS.UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card, idx) => idx === action.payload.idx ? action.payload.card : card)
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Helper function to load data from localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to save data to localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Helper function to check if localStorage is empty for a key
const isLocalStorageEmpty = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return !saved || saved === '[]' || saved === '{}';
  } catch {
    return true;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const shouldSeed = isLocalStorageEmpty('budgetTracker_transactions') && isLocalStorageEmpty('budgetTracker_goals');
  const halalSampleTransactions = [
    { id: '1', title: 'Salary Payment', amount: 3000, type: 'income', category: 'Salary', date: '2024-06-01', description: 'Monthly salary (halal)' },
    { id: '2', title: 'Grocery Shopping', amount: 120, type: 'expense', category: 'Food & Dining', date: '2024-06-02', description: 'Groceries for family' },
    { id: '3', title: 'Charity (Zakat)', amount: 200, type: 'expense', category: 'Charity', date: '2024-06-03', description: 'Zakat payment' },
    { id: '4', title: 'Freelance Project', amount: 800, type: 'income', category: 'Freelance', date: '2024-06-04', description: 'Web development (halal)' },
    { id: '5', title: 'Utilities Bill', amount: 90, type: 'expense', category: 'Utilities', date: '2024-06-05', description: 'Electricity and water' }
  ];
  const halalSampleGoals = [
    { id: 'g1', title: 'Umrah Savings', description: 'Save for Umrah trip', targetAmount: 5000, currentAmount: 1200, targetDate: '2025-06-01', createdAt: '2024-06-01' },
    { id: 'g2', title: 'Emergency Fund', description: 'Halal emergency fund', targetAmount: 10000, currentAmount: 3500, targetDate: '2025-12-31', createdAt: '2024-06-01' }
  ];
  // Load initial state from localStorage with currency migration
  const loadedUser = loadFromLocalStorage('budgetTracker_user', initialState.user);
  
  // Migrate old currency symbols to currency codes
  if (loadedUser.currency && loadedUser.currency.length <= 2) {
    loadedUser.currency = migrateCurrencySymbolToCode(loadedUser.currency);
  }
  
  const loadedState = {
    ...initialState,
    user: loadedUser,
    transactions: shouldSeed ? halalSampleTransactions : loadFromLocalStorage('budgetTracker_transactions', initialState.transactions),
    budgets: loadFromLocalStorage('budgetTracker_budgets', initialState.budgets),
    goals: shouldSeed ? halalSampleGoals : loadFromLocalStorage('budgetTracker_goals', initialState.goals),
    categories: loadFromLocalStorage('budgetTracker_categories', initialState.categories),
    cards: loadFromLocalStorage('budgetTracker_cards', initialState.cards)
  };
  
  const [state, dispatch] = useReducer(appReducer, loadedState);
  
  // Save to localStorage whenever relevant state changes
  useEffect(() => {
    saveToLocalStorage('budgetTracker_user', state.user);
  }, [state.user]);
  
  useEffect(() => {
    saveToLocalStorage('budgetTracker_transactions', state.transactions);
  }, [state.transactions]);
  
  useEffect(() => {
    saveToLocalStorage('budgetTracker_budgets', state.budgets);
  }, [state.budgets]);
  
  useEffect(() => {
    saveToLocalStorage('budgetTracker_goals', state.goals);
  }, [state.goals]);
  
  useEffect(() => {
    saveToLocalStorage('budgetTracker_categories', state.categories);
  }, [state.categories]);

  useEffect(() => {
    saveToLocalStorage('budgetTracker_cards', state.cards);
  }, [state.cards]);
  
  // Action creators for easier usage
  const actions = {
    // User actions
    updateUser: (userData) => dispatch({ type: ACTIONS.UPDATE_USER, payload: userData }),
    updateUserProfile: (userData) => dispatch({ type: ACTIONS.UPDATE_USER, payload: userData }),
    
    // Transaction actions
    addTransaction: (transaction) => {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: newTransaction });
      return newTransaction;
    },
    
    updateTransaction: (transaction) => dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: transaction }),
    deleteTransaction: (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id }),
    setTransactions: (transactions) => dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: transactions }),
    
    // Budget actions
    addBudget: (budget) => {
      const newBudget = {
        ...budget,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: ACTIONS.ADD_BUDGET, payload: newBudget });
      return newBudget;
    },
    
    updateBudget: (budget) => dispatch({ type: ACTIONS.UPDATE_BUDGET, payload: budget }),
    deleteBudget: (id) => dispatch({ type: ACTIONS.DELETE_BUDGET, payload: id }),
    
    // Goal actions
    addGoal: (goal) => {
      const newGoal = {
        ...goal,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: ACTIONS.ADD_GOAL, payload: newGoal });
      return newGoal;
    },
    
    updateGoal: (goal) => dispatch({ type: ACTIONS.UPDATE_GOAL, payload: goal }),
    deleteGoal: (id) => dispatch({ type: ACTIONS.DELETE_GOAL, payload: id }),
    
    // UI actions
    toggleSidebar: () => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR }),
    setSidebar: (isOpen) => dispatch({ type: ACTIONS.SET_SIDEBAR, payload: isOpen }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    
    // Notification actions
    addNotification: (message, type = 'info', duration = 5000) => {
      const notification = {
        id: Date.now().toString(),
        message,
        type,
        timestamp: new Date().toISOString()
      };
      dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification });
      
      // Auto remove notification after duration
      setTimeout(() => {
        dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: notification.id });
      }, duration);
      
      return notification;
    },
    
    removeNotification: (id) => dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id }),
    
    // Card actions
    setCards: (cards) => dispatch({ type: ACTIONS.SET_CARDS, payload: cards }),
    updateCard: (idx, card) => dispatch({ type: ACTIONS.UPDATE_CARD, payload: { idx, card } }),
    
    // Data management actions
    importData: (data) => {
      if (data.transactions) dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: data.transactions });
      if (data.budgets) dispatch({ type: ACTIONS.SET_BUDGETS, payload: data.budgets });
      if (data.goals) dispatch({ type: ACTIONS.SET_GOALS, payload: data.goals });
      if (data.categories) dispatch({ type: ACTIONS.SET_CATEGORIES, payload: data.categories });
      if (data.user) dispatch({ type: ACTIONS.UPDATE_USER, payload: data.user });
    },
    
    clearAllData: () => {
      dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: [] });
      dispatch({ type: ACTIONS.SET_BUDGETS, payload: [] });
      dispatch({ type: ACTIONS.SET_GOALS, payload: [] });
      dispatch({ type: ACTIONS.SET_CATEGORIES, payload: initialState.categories });
      dispatch({ type: ACTIONS.UPDATE_USER, payload: initialState.user });
    }
  };
  
  // Calculated values (derived state)
  const calculatedValues = {
    // Financial calculations
    totalIncome: state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      
    totalExpenses: state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      
    netBalance: state.transactions.reduce((sum, t) => {
      return t.type === 'income' 
        ? sum + parseFloat(t.amount)
        : sum - parseFloat(t.amount);
    }, 0),
    
    // Transaction statistics
    transactionCount: state.transactions.length,
    
    // Category spending
    categoryTotals: state.transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = { income: 0, expense: 0 };
      }
      acc[category][transaction.type] += parseFloat(transaction.amount);
      return acc;
    }, {}),
    
    // Monthly data
    monthlyData: state.transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      acc[month][transaction.type] += parseFloat(transaction.amount);
      return acc;
    }, {})
  };
  
  return (
    <AppContext.Provider value={{ 
      state, 
      actions, 
      calculated: calculatedValues 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
