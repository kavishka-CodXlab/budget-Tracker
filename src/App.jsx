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
import HalalPractices from './pages/HalalPractices';
import ZakatCalculator from './pages/ZakatCalculator';  
import Help from './pages/Help';

 
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
          <Route path="/halal-guide" element={<HalalPractices />} />
          <Route path="/zakat-calculator" element={<ZakatCalculator />} />
          <Route path="/help" element={<Help />} />
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
 
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
