import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiCreditCard, FiSave, FiMoon, FiSun, FiDownload, FiUpload, FiBell, FiLock, FiDatabase, FiLogIn, FiLogOut, FiShield, FiKey } from 'react-icons/fi';
import Layout from '../layouts/Layout';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import useForm from '../hooks/useForm';
import { getCurrencyOptions } from '../utils/currency';
import Swal from 'sweetalert2';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  max-width: 800px;
`;

const SettingsSection = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
`;

const SectionIcon = styled.div`
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

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
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
  transition: all var(--transition-fast);
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
  transition: all var(--transition-fast);
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

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg);
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-lg);
`;

const ToggleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const ToggleIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--accent-primary-light);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
`;

const ToggleLabel = styled.div`
  color: var(--text-primary);
  font-weight: 500;
`;

const ToggleDescription = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: var(--space-xs);
`;

const Toggle = styled.button`
  width: 52px;
  height: 28px;
  background-color: ${props => props.active ? 'var(--accent-primary)' : 'var(--bg-secondary)'};
  border: none;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: var(--text-inverse);
    border-radius: 50%;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-sm);
  }
`;

const ButtonGrid = styled.div`
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-xl);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? 'var(--accent-primary)' : 'var(--bg-tertiary)'};
  color: ${props => props.primary ? 'var(--text-inverse)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.primary ? 'var(--accent-primary)' : 'var(--border-primary)'};
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex: 1;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--accent-primary-hover)' : 'var(--bg-secondary)'};
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const AdvancedSection = styled.div`
  border-top: 1px solid var(--border-primary);
  padding-top: var(--space-xl);
  margin-top: var(--space-xl);
`;

const AdvancedTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-lg);
`;

const WarningBox = styled.div`
  background-color: var(--warning-light);
  border: 1px solid var(--warning);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  color: var(--warning-dark);
`;

const WarningTitle = styled.div`
  font-weight: 600;
  margin-bottom: var(--space-xs);
`;

const WarningText = styled.div`
  font-size: 0.875rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  justify-content: center;
  
  &:hover {
    background-color: var(--bg-secondary);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const ErrorText = styled.div`
  color: var(--danger);
  font-size: 0.75rem;
  margin-top: var(--space-xs);
`;

const AuthSection = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-2xl);
`;

const AuthStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg);
  background-color: ${props => props.isLoggedIn ? 'var(--success-light)' : 'var(--warning-light)'};
  border: 1px solid ${props => props.isLoggedIn ? 'var(--success)' : 'var(--warning)'};
  border-radius: var(--radius-md);
  margin-bottom: var(--space-xl);
`;

const AuthStatusText = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: ${props => props.isLoggedIn ? 'var(--success-dark)' : 'var(--warning-dark)'};
  font-weight: 500;
`;

const AuthButton = styled.button`
  background-color: ${props => props.primary ? 'var(--accent-primary)' : 'var(--bg-tertiary)'};
  color: ${props => props.primary ? 'var(--text-inverse)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.primary ? 'var(--accent-primary)' : 'var(--border-primary)'};
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--accent-primary-hover)' : 'var(--bg-secondary)'};
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
`;

const SecuritySection = styled.div`
  border-top: 1px solid var(--border-primary);
  padding-top: var(--space-xl);
  margin-top: var(--space-xl);
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const Settings = () => {
  const { state, actions } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(!!state.user?.email && state.user?.email !== 'user@example.com');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [notifications, setNotifications] = useState({
    transactionAlerts: true,
    budgetWarnings: true,
    goalReminders: false,
    weeklyReports: true
  });

  // Login form validation
  const loginValidationRules = {
    email: {
      required: { message: 'Email is required' },
      email: { message: 'Please enter a valid email address' }
    },
    password: {
      required: { message: 'Password is required' },
      minLength: { value: 6, message: 'Password must be at least 6 characters' }
    }
  };

  // Register form validation
  const registerValidationRules = {
    name: {
      required: { message: 'Name is required' },
      minLength: { value: 2, message: 'Name must be at least 2 characters' }
    },
    email: {
      required: { message: 'Email is required' },
      email: { message: 'Please enter a valid email address' }
    },
    password: {
      required: { message: 'Password is required' },
      minLength: { value: 6, message: 'Password must be at least 6 characters' }
    },
    confirmPassword: {
      required: { message: 'Please confirm your password' },
      custom: {
        validator: (value, values) => value === values.password,
        message: 'Passwords do not match'
      }
    }
  };

  // Password change validation
  const passwordValidationRules = {
    currentPassword: {
      required: { message: 'Current password is required' }
    },
    newPassword: {
      required: { message: 'New password is required' },
      minLength: { value: 6, message: 'Password must be at least 6 characters' }
    },
    confirmNewPassword: {
      required: { message: 'Please confirm your new password' },
      custom: {
        validator: (value, values) => value === values.newPassword,
        message: 'Passwords do not match'
      }
    }
  };

  // Profile form validation
  const profileValidationRules = {
    name: {
      required: { message: 'Name is required' },
      minLength: { value: 2, message: 'Name must be at least 2 characters' }
    },
    email: {
      required: { message: 'Email is required' },
      email: { message: 'Please enter a valid email address' }
    }
  };

  // Login form
  const {
    values: loginValues,
    errors: loginErrors,
    touched: loginTouched,
    isSubmitting: loginSubmitting,
    handleChange: handleLoginChange,
    handleBlur: handleLoginBlur,
    handleSubmit: handleLoginSubmit,
    resetForm: resetLoginForm
  } = useForm(
    {
      email: '',
      password: ''
    },
    loginValidationRules
  );

  // Register form
  const {
    values: registerValues,
    errors: registerErrors,
    touched: registerTouched,
    isSubmitting: registerSubmitting,
    handleChange: handleRegisterChange,
    handleBlur: handleRegisterBlur,
    handleSubmit: handleRegisterSubmit,
    resetForm: resetRegisterForm
  } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    registerValidationRules
  );

  // Password change form
  const {
    values: passwordValues,
    errors: passwordErrors,
    touched: passwordTouched,
    isSubmitting: passwordSubmitting,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    handleSubmit: handlePasswordSubmit,
    resetForm: resetPasswordForm
  } = useForm(
    {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    passwordValidationRules
  );

  // Profile form
  const {
    values: profileValues,
    errors: profileErrors,
    touched: profileTouched,
    isSubmitting: profileSubmitting,
    handleChange: handleProfileChange,
    handleBlur: handleProfileBlur,
    handleSubmit: handleProfileSubmit
  } = useForm(
    {
      name: state.user?.name || '',
      email: state.user?.email || '',
      currency: state.user?.currency || 'USD',
      timezone: state.user?.timezone || 'UTC',
      language: state.user?.language || 'en'
    },
    profileValidationRules
  );

  // Currency options from utility
  const currencies = getCurrencyOptions();

  // Timezone options (simplified list)
  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Australia/Sydney', label: 'Sydney' }
  ];

  // Handle login
  const onLoginSubmit = async (formData) => {
    try {
      // Simulate login - in a real app, this would call an API
      const userData = {
        name: formData.email.split('@')[0], // Use email prefix as name
        email: formData.email,
        currency: 'USD',
        timezone: 'UTC',
        language: 'en',
        isAuthenticated: true
      };
      
      actions.updateUser(userData);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      resetLoginForm();
      actions.addNotification('Successfully logged in!', 'success');
    } catch (error) {
      console.error('Login error:', error);
      actions.addNotification('Login failed. Please try again.', 'error');
    }
  };

  // Handle register
  const onRegisterSubmit = async (formData) => {
    try {
      // Simulate registration - in a real app, this would call an API
      const userData = {
        name: formData.name,
        email: formData.email,
        currency: 'USD',
        timezone: 'UTC',
        language: 'en',
        isAuthenticated: true
      };
      
      actions.updateUser(userData);
      setIsLoggedIn(true);
      setShowRegisterForm(false);
      resetRegisterForm();
      actions.addNotification('Account created successfully!', 'success');
    } catch (error) {
      console.error('Registration error:', error);
      actions.addNotification('Registration failed. Please try again.', 'error');
    }
  };

  // Handle password change
  const onPasswordSubmit = async (formData) => {
    try {
      // Simulate password change - in a real app, this would call an API
      actions.addNotification('Password changed successfully!', 'success');
      setShowPasswordForm(false);
      resetPasswordForm();
    } catch (error) {
      console.error('Password change error:', error);
      actions.addNotification('Password change failed. Please try again.', 'error');
    }
  };

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Log out?',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#81a163',
      cancelButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-primary') || '#9cc773',
      confirmButtonText: 'Yes, log out',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'swal2-popup-custom',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const defaultUser = {
          name: 'Personal Budget',
          email: 'user@example.com',
          avatar: 'PB',
          currency: '$',
          isAuthenticated: false
        };
        actions.updateUser(defaultUser);
        setIsLoggedIn(false);
        actions.addNotification('Logged out successfully!', 'info');
      }
    });
  };

  // Handle profile form submission
  const onProfileSubmit = async (formData) => {
    try {
      actions.updateUserProfile(formData);
      actions.addNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Profile update error:', error);
      actions.addNotification('Failed to update profile. Please try again.', 'error');
    }
  };

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle data export
  const handleExportData = () => {
    try {
      const exportData = {
        user: state.user,
        transactions: state.transactions,
        budgets: state.budgets,
        goals: state.goals,
        categories: state.categories,
        exportedAt: new Date().toISOString()
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `budget-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      actions.addNotification('Data exported successfully!', 'success');
    } catch (error) {
      console.error('Export error:', error);
      actions.addNotification('Failed to export data. Please try again.', 'error');
    }
  };

  // Handle data import
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate imported data structure
        if (!importedData.transactions || !importedData.budgets || !importedData.goals) {
          throw new Error('Invalid file format');
        }

        actions.importData(importedData);
        actions.addNotification('Data imported successfully!', 'success');
      } catch (error) {
        console.error('Import error:', error);
        actions.addNotification('Failed to import data. Please check the file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Handle clear all data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      actions.clearAllData();
      actions.addNotification('All data cleared successfully!', 'warning');
    }
  };

  return (
    <Layout title="Settings">
      <SettingsContainer>
        {/* Authentication Section */}
        <AuthSection>
          <SectionHeader>
            <SectionIcon>
              <FiShield />
            </SectionIcon>
            <SectionTitle>Account & Security</SectionTitle>
          </SectionHeader>

          <AuthStatus isLoggedIn={isLoggedIn}>
            <AuthStatusText isLoggedIn={isLoggedIn}>
              <FiUser />
              {isLoggedIn ? `Logged in as ${state.user?.name}` : 'Not logged in'}
            </AuthStatusText>
            {isLoggedIn ? (
              <AuthButton onClick={handleLogout}>
                <FiLogOut />
                Logout
              </AuthButton>
            ) : (
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <AuthButton onClick={() => setShowLoginForm(true)}>
                  <FiLogIn />
                  Login
                </AuthButton>
                <AuthButton primary onClick={() => setShowRegisterForm(true)}>
                  <FiUser />
                  Register
                </AuthButton>
              </div>
            )}
          </AuthStatus>

          {/* Login Form */}
          {showLoginForm && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLoginSubmit(onLoginSubmit);
            }}>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    value={loginValues.email}
                    onChange={(e) => handleLoginChange('email', e.target.value)}
                    onBlur={() => handleLoginBlur('email')}
                  />
                  {loginTouched.email && loginErrors.email && (
                    <ErrorText>{loginErrors.email}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    type="password"
                    id="login-password"
                    placeholder="Enter your password"
                    value={loginValues.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                    onBlur={() => handleLoginBlur('password')}
                  />
                  {loginTouched.password && loginErrors.password && (
                    <ErrorText>{loginErrors.password}</ErrorText>
                  )}
                </FormGroup>
              </FormGrid>

              <ButtonGrid>
                <Button primary type="submit" disabled={loginSubmitting}>
                  <FiLogIn />
                  {loginSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <Button onClick={() => {
                  setShowLoginForm(false);
                  resetLoginForm();
                }}>
                  Cancel
                </Button>
              </ButtonGrid>
            </form>
          )}

          {/* Register Form */}
          {showRegisterForm && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRegisterSubmit(onRegisterSubmit);
            }}>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    type="text"
                    id="register-name"
                    placeholder="Enter your full name"
                    value={registerValues.name}
                    onChange={(e) => handleRegisterChange('name', e.target.value)}
                    onBlur={() => handleRegisterBlur('name')}
                  />
                  {registerTouched.name && registerErrors.name && (
                    <ErrorText>{registerErrors.name}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="register-email">Email Address</Label>
                  <Input
                    type="email"
                    id="register-email"
                    placeholder="Enter your email"
                    value={registerValues.email}
                    onChange={(e) => handleRegisterChange('email', e.target.value)}
                    onBlur={() => handleRegisterBlur('email')}
                  />
                  {registerTouched.email && registerErrors.email && (
                    <ErrorText>{registerErrors.email}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    type="password"
                    id="register-password"
                    placeholder="Enter your password"
                    value={registerValues.password}
                    onChange={(e) => handleRegisterChange('password', e.target.value)}
                    onBlur={() => handleRegisterBlur('password')}
                  />
                  {registerTouched.password && registerErrors.password && (
                    <ErrorText>{registerErrors.password}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <Input
                    type="password"
                    id="register-confirm-password"
                    placeholder="Confirm your password"
                    value={registerValues.confirmPassword}
                    onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                    onBlur={() => handleRegisterBlur('confirmPassword')}
                  />
                  {registerTouched.confirmPassword && registerErrors.confirmPassword && (
                    <ErrorText>{registerErrors.confirmPassword}</ErrorText>
                  )}
                </FormGroup>
              </FormGrid>

              <ButtonGrid>
                <Button primary type="submit" disabled={registerSubmitting}>
                  <FiUser />
                  {registerSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
                <Button onClick={() => {
                  setShowRegisterForm(false);
                  resetRegisterForm();
                }}>
                  Cancel
                </Button>
              </ButtonGrid>
            </form>
          )}

          {/* Security Section */}
          {isLoggedIn && (
            <SecuritySection>
              <AdvancedTitle>Security</AdvancedTitle>
              
              {!showPasswordForm ? (
                <Button onClick={() => setShowPasswordForm(true)}>
                  <FiKey />
                  Change Password
                </Button>
              ) : (
                <PasswordForm onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordSubmit(onPasswordSubmit);
                }}>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        type="password"
                        id="current-password"
                        placeholder="Enter current password"
                        value={passwordValues.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        onBlur={() => handlePasswordBlur('currentPassword')}
                      />
                      {passwordTouched.currentPassword && passwordErrors.currentPassword && (
                        <ErrorText>{passwordErrors.currentPassword}</ErrorText>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        type="password"
                        id="new-password"
                        placeholder="Enter new password"
                        value={passwordValues.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        onBlur={() => handlePasswordBlur('newPassword')}
                      />
                      {passwordTouched.newPassword && passwordErrors.newPassword && (
                        <ErrorText>{passwordErrors.newPassword}</ErrorText>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                      <Input
                        type="password"
                        id="confirm-new-password"
                        placeholder="Confirm new password"
                        value={passwordValues.confirmNewPassword}
                        onChange={(e) => handlePasswordChange('confirmNewPassword', e.target.value)}
                        onBlur={() => handlePasswordBlur('confirmNewPassword')}
                      />
                      {passwordTouched.confirmNewPassword && passwordErrors.confirmNewPassword && (
                        <ErrorText>{passwordErrors.confirmNewPassword}</ErrorText>
                      )}
                    </FormGroup>
                  </FormGrid>

                  <ButtonGrid>
                    <Button primary type="submit" disabled={passwordSubmitting}>
                      <FiKey />
                      {passwordSubmitting ? 'Changing Password...' : 'Change Password'}
                    </Button>
                    <Button onClick={() => {
                      setShowPasswordForm(false);
                      resetPasswordForm();
                    }}>
                      Cancel
                    </Button>
                  </ButtonGrid>
                </PasswordForm>
              )}
            </SecuritySection>
          )}
        </AuthSection>

        {/* Profile Settings */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiUser />
            </SectionIcon>
            <SectionTitle>Profile Settings</SectionTitle>
          </SectionHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleProfileSubmit(onProfileSubmit);
          }}>
            <FormGrid>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={profileValues.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  onBlur={() => handleProfileBlur('name')}
                />
                {profileTouched.name && profileErrors.name && (
                  <ErrorText>{profileErrors.name}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={profileValues.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  onBlur={() => handleProfileBlur('email')}
                />
                {profileTouched.email && profileErrors.email && (
                  <ErrorText>{profileErrors.email}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  id="currency"
                  value={profileValues.currency}
                  onChange={(e) => handleProfileChange('currency', e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  id="timezone"
                  value={profileValues.timezone}
                  onChange={(e) => handleProfileChange('timezone', e.target.value)}
                >
                  {timezones.map(timezone => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormGrid>

            <ButtonGrid>
              <Button primary type="submit" disabled={profileSubmitting}>
                <FiSave />
                {profileSubmitting ? 'Saving...' : 'Save Profile'}
              </Button>
            </ButtonGrid>
          </form>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              {theme === 'dark' ? <FiMoon /> : <FiSun />}
            </SectionIcon>
            <SectionTitle>Appearance</SectionTitle>
          </SectionHeader>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleIcon>
                {theme === 'dark' ? <FiMoon /> : <FiSun />}
              </ToggleIcon>
              <div>
                <ToggleLabel>Dark Mode</ToggleLabel>
                <ToggleDescription>
                  Switch between light and dark themes
                </ToggleDescription>
              </div>
            </ToggleInfo>
            <Toggle active={theme === 'dark'} onClick={toggleTheme} />
          </ToggleContainer>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiBell />
            </SectionIcon>
            <SectionTitle>Notifications</SectionTitle>
          </SectionHeader>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleIcon>
                <FiBell />
              </ToggleIcon>
              <div>
                <ToggleLabel>Transaction Alerts</ToggleLabel>
                <ToggleDescription>
                  Get notified when transactions are added
                </ToggleDescription>
              </div>
            </ToggleInfo>
            <Toggle 
              active={notifications.transactionAlerts} 
              onClick={() => handleNotificationToggle('transactionAlerts')} 
            />
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleIcon>
                <FiCreditCard />
              </ToggleIcon>
              <div>
                <ToggleLabel>Budget Warnings</ToggleLabel>
                <ToggleDescription>
                  Alert when approaching budget limits
                </ToggleDescription>
              </div>
            </ToggleInfo>
            <Toggle 
              active={notifications.budgetWarnings} 
              onClick={() => handleNotificationToggle('budgetWarnings')} 
            />
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleIcon>
                <FiLock />
              </ToggleIcon>
              <div>
                <ToggleLabel>Goal Reminders</ToggleLabel>
                <ToggleDescription>
                  Remind me about my financial goals
                </ToggleDescription>
              </div>
            </ToggleInfo>
            <Toggle 
              active={notifications.goalReminders} 
              onClick={() => handleNotificationToggle('goalReminders')} 
            />
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleIcon>
                <FiDatabase />
              </ToggleIcon>
              <div>
                <ToggleLabel>Weekly Reports</ToggleLabel>
                <ToggleDescription>
                  Receive weekly spending summaries
                </ToggleDescription>
              </div>
            </ToggleInfo>
            <Toggle 
              active={notifications.weeklyReports} 
              onClick={() => handleNotificationToggle('weeklyReports')} 
            />
          </ToggleContainer>
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FiDatabase />
            </SectionIcon>
            <SectionTitle>Data Management</SectionTitle>
          </SectionHeader>

          <ButtonGrid>
            <Button onClick={handleExportData}>
              <FiDownload />
              Export Data
            </Button>
            
            <FileLabel htmlFor="import-file">
              <FiUpload />
              Import Data
            </FileLabel>
            <FileInput
              type="file"
              id="import-file"
              accept=".json"
              onChange={handleImportData}
            />
          </ButtonGrid>

          <AdvancedSection>
            <AdvancedTitle>Advanced Options</AdvancedTitle>
            
            <WarningBox>
              <WarningTitle>Danger Zone</WarningTitle>
              <WarningText>
                This action will permanently delete all your data including transactions, budgets, and goals. This cannot be undone.
              </WarningText>
            </WarningBox>

            <Button 
              onClick={handleClearData}
              style={{ 
                backgroundColor: 'var(--danger)', 
                color: 'var(--text-inverse)',
                borderColor: 'var(--danger)'
              }}
            >
              Clear All Data
            </Button>
          </AdvancedSection>
        </SettingsSection>
      </SettingsContainer>
    </Layout>
  );
};

export default Settings;
