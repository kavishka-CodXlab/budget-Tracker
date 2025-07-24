import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import Layout from '../layouts/Layout';
import { useAppContext } from '../context/AppContext';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar, FiPieChart, FiBarChart2 } from 'react-icons/fi';

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
`;

const ControlsSection = styled.div`
  display: flex;
  gap: var(--space-lg);
  align-items: center;
  margin-bottom: var(--space-xl);
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.$active ? 'var(--accent-primary)' : 'var(--bg-card)'};
  color: ${props => props.$active ? 'var(--text-inverse)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.$active ? 'var(--accent-primary)' : 'var(--border-primary)'};
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover {
    border-color: var(--accent-primary);
    ${props => !props.$active && 'color: var(--accent-primary);'}
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
`;

const StatCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.$color || 'var(--accent-primary-light)'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.$textColor || 'var(--accent-primary)'};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
`;

const ChartTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const LargeChartCard = styled(ChartCard)`
  grid-column: 1 / -1;
`;

const LargeChartContainer = styled(ChartContainer)`
  height: 400px;
`;

// Color schemes for charts - updated to match new theme
const COLORS = ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#fbbf24', '#ef4444', '#8b5cf6', '#f59e0b'];

/**
 * Custom Tooltip Component for Charts
 * Updated to use new theme variables
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        boxShadow: 'var(--shadow-md)',
        color: 'var(--text-primary)'
      }}>
        <p style={{ marginBottom: '4px', fontWeight: '600' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
            {entry.name}: ${entry.value?.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Analytics Component
 * Updated with new theme and flattened design
 */
const Analytics = () => {
  const { state } = useAppContext();
  const [timeFilter, setTimeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  // Dummy/mock data for initial load
  const mockTransactions = [
    { id: 1, title: 'Salary', amount: 4200, type: 'income', category: 'Salary', date: '2024-01-15' },
    { id: 2, title: 'Groceries', amount: 85.50, type: 'expense', category: 'Food & Dining', date: '2024-01-14' },
    { id: 3, title: 'Freelance', amount: 750, type: 'income', category: 'Freelance', date: '2024-01-13' },
    { id: 4, title: 'Gas', amount: 45.20, type: 'expense', category: 'Transportation', date: '2024-01-12' },
    { id: 5, title: 'Shopping', amount: 120, type: 'expense', category: 'Shopping', date: '2024-01-11' },
    { id: 6, title: 'Electricity', amount: 95.30, type: 'expense', category: 'Utilities', date: '2024-01-10' },
    { id: 7, title: 'Investment', amount: 320, type: 'income', category: 'Investment', date: '2024-01-09' },
    { id: 8, title: 'Restaurant', amount: 65.80, type: 'expense', category: 'Food & Dining', date: '2024-01-08' },
  ];
  const [transactions, setTransactions] = useState(mockTransactions);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTransactions(state.transactions.length > 0 ? state.transactions : mockTransactions);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.transactions]);

  // Memoized calculations for performance
  const analyticsData = useMemo(() => {
    // Filter transactions by selected time period
    const now = new Date();
    let filteredTx = transactions;
    if (timeFilter === 'month') {
      filteredTx = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getFullYear() === now.getFullYear() && txDate.getMonth() === now.getMonth();
      });
    } else if (timeFilter === '3months') {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      filteredTx = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= threeMonthsAgo && txDate <= now;
      });
    } else if (timeFilter === 'year') {
      filteredTx = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getFullYear() === now.getFullYear();
      });
    }

    // Category breakdown for pie chart
    const categoryTotals = filteredTx.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
      }
      return acc;
    }, {});

    const categoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));

    // Monthly trends for line chart
    const monthlyData = filteredTx.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7);
      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }
      acc[month][transaction.type] += parseFloat(transaction.amount);
      return acc;
    }, {});

    const monthlyTrends = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

    // Weekly spending for bar chart
    const weeklyData = filteredTx
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const week = `Week ${Math.ceil(date.getDate() / 7)}`;
        acc[week] = (acc[week] || 0) + parseFloat(transaction.amount);
        return acc;
      }, {});

    const weeklySpending = Object.entries(weeklyData).map(([week, amount]) => ({
      week,
      amount
    }));

    // Income vs Expense comparison
    const totalIncome = filteredTx
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpense = filteredTx
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const comparisonData = [
      { name: 'Income', value: totalIncome, fill: '#4ade80' },
      { name: 'Expenses', value: totalExpense, fill: '#ef4444' }
    ];

    return {
      categoryData,
      monthlyTrends,
      weeklySpending,
      comparisonData,
      totalIncome,
      totalExpense,
      netSavings: totalIncome - totalExpense,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0
    };
  }, [transactions, timeFilter]);

  const timeFilters = [
    { label: 'All Time', value: 'all' },
    { label: 'This Month', value: 'month' },
    { label: 'Last 3 Months', value: '3months' },
    { label: 'This Year', value: 'year' }
  ];

  if (loading) {
    return (
      <Layout title="Financial Analytics">
        <AnalyticsContainer>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <div className="spinner" style={{ width: 48, height: 48, border: '4px solid #eaff6b', borderTop: '4px solid #7f5fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
            <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loading analytics...</div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </AnalyticsContainer>
      </Layout>
    );
  }

  return (
    <Layout title="Financial Analytics">
      <AnalyticsContainer>
        {/* Time Filter Controls */}
        <ControlsSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--text-secondary)' }}>
            <FiCalendar />
            <span>Time Period:</span>
          </div>
          {timeFilters.map(filter => (
            <FilterButton
              key={filter.value}
              $active={timeFilter === filter.value}
              onClick={() => setTimeFilter(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </ControlsSection>

        {/* Key Statistics */}
        <StatsGrid>
          <StatCard>
            <StatIcon $color="var(--success-light)" $textColor="var(--success)">
              <FiTrendingUp />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.totalIncome.toFixed(2)}</StatValue>
              <StatLabel>Total Income</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="var(--danger-light)" $textColor="var(--danger)">
              <FiTrendingDown />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.totalExpense.toFixed(2)}</StatValue>
              <StatLabel>Total Expenses</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="var(--accent-primary-light)" $textColor="var(--accent-primary)">
              <FiDollarSign />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.netSavings.toFixed(2)}</StatValue>
              <StatLabel>Net Savings</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="var(--warning-light)" $textColor="var(--warning)">
              <FiTrendingUp />
            </StatIcon>
            <StatInfo>
              <StatValue>{analyticsData.savingsRate.toFixed(1)}%</StatValue>
              <StatLabel>Savings Rate</StatLabel>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Charts Grid */}
        <ChartsGrid>
          {/* Category Breakdown Pie Chart */}
          <ChartCard>
            <ChartTitle>
              <FiPieChart />
              Spending by Category
            </ChartTitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>

          {/* Income vs Expenses Comparison */}
          <ChartCard>
            <ChartTitle>
              <FiBarChart2 />
              Income vs Expenses
            </ChartTitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>
        </ChartsGrid>

        {/* Monthly Trends - Large Chart */}
        <LargeChartCard>
          <ChartTitle>
            <FiTrendingUp />
            Monthly Financial Trends
          </ChartTitle>
          <LargeChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.monthlyTrends}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="#4ade80"
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stackId="2"
                  stroke="#ef4444"
                  fill="url(#expenseGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </LargeChartContainer>
        </LargeChartCard>
      </AnalyticsContainer>
    </Layout>
  );
};

export default Analytics; 