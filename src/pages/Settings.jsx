import React, { useState } from 'react'
import styled from 'styled-components'
import PageLayout from '../layouts/Layout'
import { useAppContext } from '../context/AppContext'
import { useForm } from '../hooks/useForm'
import { 
  FiUser, 
  FiPalette, 
  FiDownload, 
  FiSettings, 
  FiSave,
  FiTrash2,
  FiRefreshCw,
  FiMoon,
  FiSun,
  FiDollarSign,
  FiMail,
  FiEdit3,
  FiCheck
} from 'react-icons/fi'

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--xl);
  max-width: 800px;
`;

const SettingsSection = styled.div`
  background: var(--bg-card-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--xl);
  box-shadow: var(--shadow-light);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sm);
  margin-bottom: var(--lg);
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--accent-green-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--accent-green-dark);
`;

const SectionTitle = styled.h2`
  color: var(--text-main-light);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;

const SectionDescription = styled.p`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
  margin: 0;
  margin-top: var(--xs);
`;

const FormGroup = styled.div`
  margin-bottom: var(--lg);
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  color: var(--text-main-light);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--sm);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--sm) var(--md);
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  color: var(--text-main-light);
  font-size: 0.95rem;
  transition: var(--transition);
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
  width: 100%;
  padding: var(--sm) var(--md);
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  color: var(--text-main-light);
  font-size: 0.95rem;
  transition: var(--transition);
  cursor: pointer;
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

const ThemeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--md);
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ThemeOption = styled.div`
  background: var(--bg-sidebar-light);
  border: 2px solid ${props => props.active ? 'var(--accent-green)' : 'var(--border-light)'};
  border-radius: var(--radius);
  padding: var(--md);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--sm);
  &:hover {
    border-color: var(--accent-green);
    background: var(--bg-card-light);
  }
`;

const ThemeIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: var(--radius);
  background: ${props => props.active ? 'var(--accent-green)' : 'var(--bg-card-light)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${props => props.active ? 'var(--bg-card-light)' : 'var(--text-secondary-light)'};
`;

const ThemeInfo = styled.div`
  flex: 1;
`;

const ThemeName = styled.div`
  color: var(--text-main-light);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2px;
`;

const ThemeDescription = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: ${props => props.variant === 'danger' ? 'var(--danger-red)' : 
                       props.variant === 'secondary' ? 'var(--bg-sidebar-light)' : 
                       'var(--accent-green)'};
  border: 1px solid ${props => props.variant === 'danger' ? 'var(--danger-red)' : 
                               props.variant === 'secondary' ? 'var(--border-light)' : 
                               'transparent'};
  border-radius: var(--radius);
  color: ${props => props.variant === 'secondary' ? 'var(--text-main-light)' : 'var(--bg-card-light)'};
  padding: var(--sm) var(--md);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--xs);
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.variant === 'danger' ? 'var(--danger-red)' : 
                           props.variant === 'secondary' ? 'var(--bg-card-light)' : 
                           'var(--accent-green-dark)'};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--sm);
  margin-top: var(--lg);
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const DataSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--md);
  margin-top: var(--lg);
`;

const DataCard = styled.div`
  background: var(--bg-sidebar-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: var(--md);
  text-align: center;
`;

const DataValue = styled.div`
  color: var(--accent-green);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--xs);
`;

const DataLabel = styled.div`
  color: var(--text-secondary-light);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SuccessMessage = styled.div`
  background: var(--success-green);
  color: var(--bg-card-light);
  padding: var(--sm) var(--md);
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--md);
  display: flex;
  align-items: center;
  gap: var(--xs);
`;

/**
 * Settings Component - updated with new theme
 */
const Settings = () => {
  const { state, actions, calculated } = useAppContext();
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Form for user profile settings
  const { values, handleChange, resetForm } = useForm({
    name: state.user.name,
    email: state.user.email,
    currency: state.user.currency
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Update user data
    actions.updateUser(values);
    
    // Show success message
    setSaveSuccess(true);
    actions.addNotification('Profile updated successfully!', 'success');
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleThemeChange = (isDark) => {
    actions.setTheme(isDark);
    actions.addNotification(
      `Switched to ${isDark ? 'dark' : 'light'} theme`,
      'success',
      3000
    );
  };

  const handleExportData = (format) => {
    try {
      const exportData = {
        user: state.user,
        transactions: state.transactions,
        budgets: state.budgets,
        goals: state.goals,
        categories: state.categories,
        exportDate: new Date().toISOString()
      };

      let dataStr, filename;
      
      if (format === 'json') {
        dataStr = JSON.stringify(exportData, null, 2);
        filename = `budget-data-${new Date().toISOString().split('T')[0]}.json`;
      } else {
        // CSV format for transactions
        const headers = ['Date', 'Title', 'Amount', 'Type', 'Category'];
        const csvData = [
          headers.join(','),
          ...state.transactions.map(t => [
            t.date,
            `"${t.title}"`,
            t.amount,
            t.type,
            `"${t.category}"`
          ].join(','))
        ];
        dataStr = csvData.join('\n');
        filename = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      }

      // Download file
      const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      actions.addNotification(`Data exported as ${format.toUpperCase()}`, 'success');
    } catch {
      actions.addNotification('Failed to export data', 'error');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      // Clear all data
      actions.setTransactions([]);
      localStorage.removeItem('budgetTracker_transactions');
      localStorage.removeItem('budgetTracker_budgets');
      localStorage.removeItem('budgetTracker_goals');
      
      actions.addNotification('All data has been reset', 'info');
    }
  };

  return (
    <PageLayout title="Settings">
      <SettingsContainer>
        {/* Profile Settings */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiUser />
            </SectionIcon>
            <div>
              <SectionTitle>Profile Settings</SectionTitle>
              <SectionDescription>Manage your personal information and preferences</SectionDescription>
            </div>
          </SectionHeader>

          {saveSuccess && (
            <SuccessMessage>
              <FiCheck />
              Profile saved successfully!
            </SuccessMessage>
          )}

          <form onSubmit={handleSaveProfile}>
            <FormGroup>
              <Label htmlFor="name">
                <FiEdit3 style={{ marginRight: '0.5rem' }} />
                Display Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FiMail style={{ marginRight: '0.5rem' }} />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="currency">
                <FiDollarSign style={{ marginRight: '0.5rem' }} />
                Preferred Currency
              </Label>
              <Select
                id="currency"
                name="currency"
                value={values.currency}
                onChange={handleChange}
              >
                <option value="$">US Dollar ($)</option>
                <option value="€">Euro (€)</option>
                <option value="£">British Pound (£)</option>
                <option value="¥">Japanese Yen (¥)</option>
                <option value="₹">Indian Rupee (₹)</option>
                <option value="C$">Canadian Dollar (C$)</option>
                <option value="A$">Australian Dollar (A$)</option>
              </Select>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit">
                <FiSave />
                Save Changes
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                <FiRefreshCw />
                Reset
              </Button>
            </ButtonGroup>
          </form>
        </SettingsSection>

        {/* Theme Settings */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiPalette />
            </SectionIcon>
            <div>
              <SectionTitle>Appearance</SectionTitle>
              <SectionDescription>Choose your preferred theme and display options</SectionDescription>
            </div>
          </SectionHeader>

          <FormGroup>
            <Label>Theme Selection</Label>
            <ThemeSelector>
              <ThemeOption 
                active={state.theme.isDark} 
                onClick={() => handleThemeChange(true)}
              >
                <ThemeIcon active={state.theme.isDark}>
                  <FiMoon />
                </ThemeIcon>
                <ThemeInfo>
                  <ThemeName>Dark Theme</ThemeName>
                  <ThemeDescription>Easy on the eyes</ThemeDescription>
                </ThemeInfo>
              </ThemeOption>

              <ThemeOption 
                active={!state.theme.isDark} 
                onClick={() => handleThemeChange(false)}
              >
                <ThemeIcon active={!state.theme.isDark}>
                  <FiSun />
                </ThemeIcon>
                <ThemeInfo>
                  <ThemeName>Light Theme</ThemeName>
                  <ThemeDescription>Clean and bright</ThemeDescription>
                </ThemeInfo>
              </ThemeOption>
            </ThemeSelector>
          </FormGroup>
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiSettings />
            </SectionIcon>
            <div>
              <SectionTitle>Data Management</SectionTitle>
              <SectionDescription>Export your data or reset your budget information</SectionDescription>
            </div>
          </SectionHeader>

          <DataSection>
            <DataCard>
              <DataValue>{calculated.transactionCount}</DataValue>
              <DataLabel>Transactions</DataLabel>
            </DataCard>
            <DataCard>
              <DataValue>{state.budgets.length}</DataValue>
              <DataLabel>Budget Plans</DataLabel>
            </DataCard>
            <DataCard>
              <DataValue>{state.goals.length}</DataValue>
              <DataLabel>Financial Goals</DataLabel>
            </DataCard>
            <DataCard>
              <DataValue>{state.user.currency}{calculated.netBalance.toFixed(0)}</DataValue>
              <DataLabel>Net Balance</DataLabel>
            </DataCard>
          </DataSection>

          <ButtonGroup>
            <Button onClick={() => handleExportData('json')}>
              <FiDownload />
              Export JSON
            </Button>
            <Button onClick={() => handleExportData('csv')}>
              <FiDownload />
              Export CSV
            </Button>
            <Button variant="danger" onClick={handleResetData}>
              <FiTrash2 />
              Reset All Data
            </Button>
          </ButtonGroup>
        </SettingsSection>
      </SettingsContainer>
    </PageLayout>
  )
}

export default Settings 