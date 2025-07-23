import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NotificationSystem from './components/NotificationSystem';

// Import pages
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

// Import global styles
import './App.css';

/**
 * App Router Component
 * Demonstrates:
 * - React Router setup with multiple routes
 * - Simplified routing without authentication
 * - Clean app structure
 */
const AppRouter = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main application routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all other routes and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        
        {/* Global notification system */}
        <NotificationSystem />
      </div>
    </Router>
  );
};

/**
 * Main App Component
 * Demonstrates:
 * - Context Provider pattern
 * - Component composition
 * - Simplified app structure
 */
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
