import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiCreditCard, 
  FiTarget, 
  FiBarChart2, 
  FiTrendingUp, 
  FiSettings,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import Tooltip from './Tooltip';

const CollapseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: -18px;
  z-index: 1100;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover {
    background: var(--accent-primary-light);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${props => (props.collapsed ? '72px' : '280px')};
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-primary);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  transition: width var(--transition-normal), background-color var(--transition-normal);
  overflow-x: hidden;
  @media (max-width: 768px) {
    width: 280px;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
  @media (min-width: 769px) {
    position: relative;
    transform: none;
    box-shadow: none;
  }
`;

const SidebarHeader = styled(motion.div)`
  padding: var(--space-xl);
  border-bottom: 1px solid var(--border-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-card);
  min-height: 70px;
`;

const HeaderTitle = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
`;

const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--accent-primary);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarContent = styled(motion.div)`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-xl) 0;
  background-color: var(--bg-sidebar);
`;

const NavigationSection = styled(motion.div)`
  margin-bottom: var(--space-2xl);
`;

const SectionTitle = styled(motion.h3)`
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 var(--space-xl) var(--space-lg);
  padding-bottom: var(--space-sm);
`;

const NavigationList = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavigationItem = styled(motion.li)`
  margin: 0;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${props => (props.collapsed ? '0' : 'var(--space-md)')};
  padding: var(--space-lg) var(--space-xl);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  position: relative;
  margin: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  justify-content: ${props => (props.collapsed ? 'center' : 'flex-start')};
  
  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateX(2px);
  }
  
  &.active {
    background: linear-gradient(135deg, var(--accent-primary-light), var(--accent-primary-light));
    color: var(--accent-primary);
    font-weight: 600;
    border: 1px solid var(--accent-primary);
    box-shadow: var(--shadow-sm);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background-color: var(--accent-primary);
      border-radius: 0 2px 2px 0;
    }
    
    svg {
      color: var(--accent-primary);
    }
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all var(--transition-fast);
  width: 20px;
  height: 20px;
`;

const LabelSpan = styled.span`
  display: ${props => (props.collapsed ? 'none' : 'inline')};
  transition: display 0.2s;
`;

// Animation variants
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    x: -280,
    transition: {
      duration: 0.3,
      ease: "easeIn",
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const headerVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const contentVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.9,
  },
};

const closeButtonVariants = {
  hover: {
    scale: 1.1,
    rotate: 90,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.9,
  },
};

const SideBar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigationData = [
    {
      section: 'Overview',
      items: [
        { to: '/', icon: FiHome, label: 'Dashboard' },
        { to: '/transactions', icon: FiCreditCard, label: 'Transactions' },
      ]
    },
    {
      section: 'Planning',
      items: [
        { to: '/budget', icon: FiTarget, label: 'Budget' },
        { to: '/goals', icon: FiTrendingUp, label: 'Goals' },
      ]
    },
    {
      section: 'Analytics',
      items: [
        { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { to: '/settings', icon: FiSettings, label: 'Settings' },
      ]
    }
  ];

  // Keyboard navigation: Enter/Space on nav links
  const handleNavKeyDown = (e, to, onClick) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
      window.location.href = to;
    }
  };

  return (
    <AnimatePresence>
      {(isOpen || window.innerWidth > 768) && (
        <SidebarContainer
          isOpen={isOpen}
          collapsed={collapsed}
          variants={sidebarVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <SidebarHeader
            variants={headerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <HeaderTitle>Navigation</HeaderTitle>
            <Tooltip content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} position="right">
              <CollapseButton
                onClick={() => setCollapsed(c => !c)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                tabIndex={0}
              >
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </CollapseButton>
            </Tooltip>
            <Tooltip content="Close sidebar" position="right">
              <CloseButton
                onClick={onClose}
                variants={closeButtonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Close sidebar"
              >
                <FiX />
              </CloseButton>
            </Tooltip>
          </SidebarHeader>

          <SidebarContent
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navigationData.map((section) => (
              <NavigationSection
                key={section.section}
                variants={sectionVariants}
              >
                <SectionTitle variants={itemVariants}>
                  <LabelSpan collapsed={collapsed}>{section.section}</LabelSpan>
                </SectionTitle>
                <NavigationList>
                  {section.items.map((item) => (
                    <NavigationItem
                      key={item.to}
                      variants={itemVariants}
                    >
                      <Tooltip content={item.label} position="right">
                        <NavigationLink
                          to={item.to}
                          onClick={() => window.innerWidth <= 768 && onClose()}
                          end={item.to === '/'}
                          aria-label={item.label}
                          tabIndex={0}
                          onKeyDown={e => handleNavKeyDown(e, item.to, () => window.innerWidth <= 768 && onClose())}
                          collapsed={collapsed}
                        >
                          <IconWrapper
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <item.icon />
                          </IconWrapper>
                          <LabelSpan collapsed={collapsed}>{item.label}</LabelSpan>
                        </NavigationLink>
                      </Tooltip>
                    </NavigationItem>
                  ))}
                </NavigationList>
              </NavigationSection>
            ))}
          </SidebarContent>
        </SidebarContainer>
      )}
    </AnimatePresence>
  );
};

export default SideBar; 