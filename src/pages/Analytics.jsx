import React, { useState, useMemo } from 'react';
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
import PageLayout from '../layouts/Layout';
import { useAppContext } from '../context/AppContext';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar, FiPieChart, FiBarChart3 } from 'react-icons/fi';

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xl);
`;

const ControlsSection = styled.div`
  display: flex;
  gap: var(--md);
  align-items: center;
  margin-bottom: var(--lg);
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'var(--accent-green)' : 'var(--bg-card-light)'};
  color: ${props => props.active ? 'var(--bg-card-light)' : 'var(--text-main-light)'};
  border: 1px solid ${props => props.active ? 'var(--accent-green)' : 'var(--border-light)'};
  border-radius: var(--radius);
  padding: var(--sm) var(--md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    border-color: var(--accent-green);
    ${props => !props.active && 'color: var(--accent-green-dark);'}
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--lg);
  margin-bottom: var(--xl);
`;

const StatCard = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--lg);
  display: flex;
  align-items: center;
  gap: var(--md);
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-light);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || 'var(--accent-green-light)'};
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.textColor || 'var(--accent-green-dark)'};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-main-light);
  margin-bottom: var(--xs);
`;

const StatLabel = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--xl);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  box-shadow: var(--shadow-light);
`;

const ChartTitle = styled.h3`
  color: var(--text-main-light);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: var(--lg);
  display: flex;
  align-items: center;
  gap: var(--sm);
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
        background: 'var(--bg-card-light)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius)',
        padding: 'var(--md)',
        boxShadow: 'var(--shadow-light)',
        color: 'var(--text-main-light)'
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
  
  // Mock data for demonstration (in a real app, this would come from your backend)
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

  // Use real transactions if available, otherwise use mock data
  const transactions = state.transactions.length > 0 ? state.transactions : mockTransactions;

  // Memoized calculations for performance
  const analyticsData = useMemo(() => {
    // Category breakdown for pie chart
    const categoryTotals = transactions.reduce((acc, transaction) => {
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
    const monthlyData = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7);
      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }
      acc[month][transaction.type] += parseFloat(transaction.amount);
      return acc;
    }, {});

    const monthlyTrends = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

    // Weekly spending for bar chart
    const weeklyData = transactions
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
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpense = transactions
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

  return (
    <PageLayout title="Financial Analytics">
      <AnalyticsContainer>
        {/* Time Filter Controls */}
        <ControlsSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sm)', color: 'var(--text-secondary-light)' }}>
            <FiCalendar />
            <span>Time Period:</span>
          </div>
          {timeFilters.map(filter => (
            <FilterButton
              key={filter.value}
              active={timeFilter === filter.value}
              onClick={() => setTimeFilter(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </ControlsSection>

        {/* Key Statistics */}
        <StatsGrid>
          <StatCard>
            <StatIcon color="var(--success-green)" textColor="var(--bg-card-light)">
              <FiTrendingUp />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.totalIncome.toFixed(2)}</StatValue>
              <StatLabel>Total Income</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--danger-red)" textColor="var(--bg-card-light)">
              <FiTrendingDown />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.totalExpense.toFixed(2)}</StatValue>
              <StatLabel>Total Expenses</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--accent-green)" textColor="var(--bg-card-light)">
              <FiDollarSign />
            </StatIcon>
            <StatInfo>
              <StatValue>${analyticsData.netSavings.toFixed(2)}</StatValue>
              <StatLabel>Net Savings</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon color="var(--warning-orange)" textColor="var(--bg-card-light)">
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
              <FiBarChart3 />
              Income vs Expenses
            </ChartTitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary-light)" />
                  <YAxis stroke="var(--text-secondary-light)" />
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
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="month" stroke="var(--text-secondary-light)" />
                <YAxis stroke="var(--text-secondary-light)" />
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
    </PageLayout>
  );
};

export default Analytics; 