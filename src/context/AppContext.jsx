import React, { createContext, useContext, useReducer, useEffect } from 'react';

/* eslint-disable react-refresh/only-export-components */

// Initial state structure
const initialState = {
  // User data (always logged in for personal budget tracking)
  user: {
    name: 'Personal Budget',
    email: 'user@example.com',
    avatar: 'PB',
    currency: '$'
  },
  
  // Theme state
  theme: {
    isDark: true,
    primaryColor: '#00e676'
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
  }
};

// Action types
export const ACTIONS = {
  // User actions
  UPDATE_USER: 'UPDATE_USER',
  
  // Theme actions
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  
  // Transaction actions
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  
  // Budget actions
  ADD_BUDGET: 'ADD_BUDGET',
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  DELETE_BUDGET: 'DELETE_BUDGET',
  
  // Goal actions
  ADD_GOAL: 'ADD_GOAL',
  UPDATE_GOAL: 'UPDATE_GOAL',
  DELETE_GOAL: 'DELETE_GOAL',
  
  // UI actions
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR: 'SET_SIDEBAR',
  SET_LOADING: 'SET_LOADING',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Helper function to apply theme to CSS variables
const applyTheme = (isDark) => {
  const root = document.documentElement;
  
  if (isDark) {
    // Dark theme
    root.style.setProperty('--bg-dark', '#10151c');
    root.style.setProperty('--bg-darker', '#0a0e14');
    root.style.setProperty('--bg-card', '#181e25');
    root.style.setProperty('--bg-glass', 'rgba(24, 30, 37, 0.85)');
    root.style.setProperty('--text-white', '#ffffff');
    root.style.setProperty('--text-light', '#e0e6ed');
    root.style.setProperty('--text-gray', '#94a3b8');
    root.style.setProperty('--border', 'rgba(36, 255, 164, 0.08)');
    root.style.setProperty('--border-light', 'rgba(255,255,255,0.04)');
  } else {
    // Light theme
    root.style.setProperty('--bg-dark', '#ffffff');
    root.style.setProperty('--bg-darker', '#f8fafc');
    root.style.setProperty('--bg-card', '#f1f5f9');
    root.style.setProperty('--bg-glass', 'rgba(241, 245, 249, 0.85)');
    root.style.setProperty('--text-white', '#1e293b');
    root.style.setProperty('--text-light', '#334155');
    root.style.setProperty('--text-gray', '#64748b');
    root.style.setProperty('--border', 'rgba(0, 230, 118, 0.15)');
    root.style.setProperty('--border-light', 'rgba(0,0,0,0.08)');
  }
};

// Reducer function to handle state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    case ACTIONS.TOGGLE_THEME: {
      const newIsDark = !state.theme.isDark;
      applyTheme(newIsDark);
      return {
        ...state,
        theme: { ...state.theme, isDark: newIsDark }
      };
    }
      
    case ACTIONS.SET_THEME:
      applyTheme(action.payload);
      return {
        ...state,
        theme: { ...state.theme, isDark: action.payload }
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

// Provider component
export const AppProvider = ({ children }) => {
  // Load initial state from localStorage
  const loadedState = {
    ...initialState,
    user: loadFromLocalStorage('budgetTracker_user', initialState.user),
    theme: loadFromLocalStorage('budgetTracker_theme', initialState.theme),
    transactions: loadFromLocalStorage('budgetTracker_transactions', initialState.transactions),
    budgets: loadFromLocalStorage('budgetTracker_budgets', initialState.budgets),
    goals: loadFromLocalStorage('budgetTracker_goals', initialState.goals),
    categories: loadFromLocalStorage('budgetTracker_categories', initialState.categories)
  };
  
  const [state, dispatch] = useReducer(appReducer, loadedState);
  
  // Apply theme on initial load
  useEffect(() => {
    applyTheme(state.theme.isDark);
  }, []);
  
  // Save to localStorage whenever relevant state changes
  useEffect(() => {
    saveToLocalStorage('budgetTracker_user', state.user);
  }, [state.user]);
  
  useEffect(() => {
    saveToLocalStorage('budgetTracker_theme', state.theme);
  }, [state.theme]);
  
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
  
  // Action creators for easier usage
  const actions = {
    // User actions
    updateUser: (userData) => dispatch({ type: ACTIONS.UPDATE_USER, payload: userData }),
    
    // Theme actions
    toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
    setTheme: (isDark) => dispatch({ type: ACTIONS.SET_THEME, payload: isDark }),
    
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
    
    removeNotification: (id) => dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id })
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