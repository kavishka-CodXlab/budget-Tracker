import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiDollarSign, FiSun, FiMoon, FiBell, FiUser, FiSearch, FiX, FiSettings, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip';

const HeaderContainer = styled(motion.header)`
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-2xl);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-normal);
  
  @media (max-width: 768px) {
    padding: 0 var(--space-lg);
  }
`;

const LeftSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
`;

const LogoIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  svg {
    position: relative;
    z-index: 1;
  }
`;

const CenterSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled(motion.div)`
  position: relative;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled(motion.input)`
  width: 100%;
  padding: var(--space-sm) var(--space-lg) var(--space-sm) 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

const SearchIcon = styled(motion.div)`
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1rem;
`;

const SearchResults = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: var(--space-xs);
  
  /* Custom scrollbar for better dark mode visibility */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--text-tertiary);
  }
`;

const SearchResultItem = styled(motion.div)`
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--accent-primary-light);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SearchResultTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const SearchResultSubtitle = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const RightSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const NotificationButton = styled(motion.button)`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent-primary);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NotificationPanel = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: var(--space-xs);
  
  /* Custom scrollbar for better dark mode visibility */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--text-tertiary);
  }
`;

const NotificationItem = styled(motion.div)`
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--accent-primary-light);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
`;

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const UserButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--text-inverse);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
  }
`;

const UserPanel = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin-top: var(--space-xs);
  overflow: hidden;
`;

const UserHeader = styled.div`
  padding: var(--space-lg);
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  color: white;
  text-align: center;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: var(--space-xs);
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const UserMenu = styled.div`
  padding: var(--space-sm);
`;

const UserMenuItem = styled(motion.button)`
  width: 100%;
  padding: var(--space-md);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--accent-primary-light);
    color: var(--accent-primary);
  }
`;

const ThemeToggle = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }
`;

const FloatingNotification = styled(motion.div)`
  position: fixed;
  top: 80px;
  right: var(--space-2xl);
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    right: var(--space-lg);
    left: var(--space-lg);
  }
`;

// Animation variants
const headerVariants = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const leftSectionVariants = {
  initial: {
    x: -20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

const centerSectionVariants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const rightSectionVariants = {
  initial: {
    x: 20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

const logoIconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const searchVariants = {
  focus: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

const panelVariants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

const notificationVariants = {
  initial: { opacity: 0, y: -20, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.8 },
};

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userRef = useRef(null);

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New transaction added', message: 'Salary payment received', time: '2 minutes ago' },
    { id: 2, title: 'Budget alert', message: 'You\'re approaching your food budget limit', time: '1 hour ago' },
    { id: 3, title: 'Goal milestone', message: 'Emergency fund goal 75% complete!', time: '3 hours ago' },
    { id: 4, title: 'Weekly report', message: 'Your weekly spending summary is ready', time: '1 day ago' },
  ];

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Search in transactions
    state.transactions?.forEach(transaction => {
      if (transaction.title.toLowerCase().includes(lowerQuery) ||
          transaction.category.toLowerCase().includes(lowerQuery) ||
          transaction.description?.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'transaction',
          id: transaction.id,
          title: transaction.title,
          subtitle: `${transaction.category} - $${transaction.amount}`,
          data: transaction
        });
      }
    });

    // Search in goals
    state.goals?.forEach(goal => {
      if (goal.title.toLowerCase().includes(lowerQuery) ||
          goal.description?.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'goal',
          id: goal.id,
          title: goal.title,
          subtitle: `Goal - $${goal.currentAmount}/${goal.targetAmount}`,
          data: goal
        });
      }
    });

    // Search in budgets
    state.budgets?.forEach(budget => {
      if (budget.name.toLowerCase().includes(lowerQuery) ||
          budget.category.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'budget',
          id: budget.id,
          title: budget.name,
          subtitle: `Budget - $${budget.amount}`,
          data: budget
        });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(results.length > 0);
  };

  const handleSearchResultClick = (result) => {
    setSearchQuery('');
    setShowSearchResults(false);
    
    switch (result.type) {
      case 'transaction':
        navigate('/transactions');
        break;
      case 'goal':
        navigate('/goals');
        break;
      case 'budget':
        navigate('/budget');
        break;
      default:
        break;
    }
  };

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotificationCount(prev => prev + 1);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isLoggedIn = state.user?.email && state.user?.email !== 'user@example.com';

  return (
    <>
      <HeaderContainer
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <LeftSection
          variants={leftSectionVariants}
          initial="initial"
          animate="animate"
        >
          <Tooltip content="Open sidebar menu" position="bottom">
            <MenuButton
              onClick={onMenuClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Open sidebar menu"
            >
              <FiMenu />
            </MenuButton>
          </Tooltip>
          <Tooltip content="Go to Dashboard" position="bottom">
            <Logo
              variants={logoIconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/')}
            >
              <LogoIcon>
                <FiDollarSign />
              </LogoIcon>
              <span>Budget Tracker</span>
            </Logo>
          </Tooltip>
        </LeftSection>

        <CenterSection
          variants={centerSectionVariants}
          initial="initial"
          animate="animate"
        >
          <SearchContainer ref={searchRef}>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search transactions, budgets, goals..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              variants={searchVariants}
              whileFocus="focus"
            />
            <AnimatePresence>
              {showSearchResults && (
                <SearchResults
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {searchResults.map((result) => (
                                          <SearchResultItem
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSearchResultClick(result)}
                        whileHover={{ backgroundColor: 'var(--accent-primary-light)' }}
                      >
                      <SearchResultTitle>{result.title}</SearchResultTitle>
                      <SearchResultSubtitle>{result.subtitle}</SearchResultSubtitle>
                    </SearchResultItem>
                  ))}
                </SearchResults>
              )}
            </AnimatePresence>
          </SearchContainer>
        </CenterSection>

        <RightSection
          variants={rightSectionVariants}
          initial="initial"
          animate="animate"
        >
          <div ref={notificationRef} style={{ position: 'relative' }}>
            <Tooltip content="Notifications" position="bottom">
              <NotificationButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell />
                {notificationCount > 0 && (
                  <NotificationBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </NotificationBadge>
                )}
              </NotificationButton>
            </Tooltip>
            
            <AnimatePresence>
              {showNotifications && (
                <NotificationPanel
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      whileHover={{ backgroundColor: 'var(--accent-primary-light)' }}
                    >
                      <NotificationTitle>{notification.title}</NotificationTitle>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>
                        {notification.message}
                      </div>
                      <NotificationTime>{notification.time}</NotificationTime>
                    </NotificationItem>
                  ))}
                </NotificationPanel>
              )}
            </AnimatePresence>
          </div>

          <div ref={userRef} style={{ position: 'relative' }}>
            <Tooltip content="User Profile" position="bottom">
              <UserButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="User Profile"
                onClick={() => setShowUserPanel(!showUserPanel)}
              >
                <FiUser />
              </UserButton>
            </Tooltip>
            
            <AnimatePresence>
              {showUserPanel && (
                <UserPanel
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <UserHeader>
                    <UserName>{state.user?.name || 'User'}</UserName>
                    <UserEmail>{state.user?.email || 'user@example.com'}</UserEmail>
                  </UserHeader>
                  <UserMenu>
                                          <UserMenuItem
                        onClick={() => {
                          setShowUserPanel(false);
                          navigate('/settings');
                        }}
                        whileHover={{ backgroundColor: 'var(--accent-primary-light)' }}
                      >
                      <FiSettings />
                      Settings
                    </UserMenuItem>
                                          <UserMenuItem
                        onClick={() => {
                          setShowUserPanel(false);
                          handleLogout();
                        }}
                        whileHover={{ backgroundColor: 'var(--accent-primary-light)' }}
                      >
                      <FiLogOut />
                      Logout
                    </UserMenuItem>
                  </UserMenu>
                </UserPanel>
              )}
            </AnimatePresence>
          </div>

          <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} position="bottom">
            <ThemeToggle
              onClick={toggleTheme}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </Tooltip>
        </RightSection>
      </HeaderContainer>

      <AnimatePresence>
        {showNotification && (
          <FloatingNotification
            variants={notificationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            New transaction added! 💰
          </FloatingNotification>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 