import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiDollarSign, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Tooltip from './Tooltip';

const HeaderContainer = styled(motion.header)`
  height: 70px;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-2xl);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
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
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--accent-primary);
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
`;

const LogoIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  background: var(--accent-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  font-size: 1.2rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--primary), var(--accent));
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  svg {
    position: relative;
    z-index: 1;
  }
`;

const LogoText = styled(motion.span)`
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const RightSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const ThemeToggle = styled(motion.button)`
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--accent-primary-light);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: translateY(-1px);
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
      duration: 0.3,
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

const themeToggleVariants = {
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

const menuButtonVariants = {
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

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
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
            variants={menuButtonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Open sidebar menu"
          >
            <FiMenu />
          </MenuButton>
        </Tooltip>
        <Tooltip content="Go to Dashboard" position="bottom">
          <Logo tabIndex={0} aria-label="Budget Tracker Home">
            <LogoIcon
              variants={logoIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiDollarSign />
            </LogoIcon>
            <LogoText>Budget Tracker</LogoText>
          </Logo>
        </Tooltip>
      </LeftSection>

      <RightSection
        variants={rightSectionVariants}
        initial="initial"
        animate="animate"
      >
        <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} position="bottom">
          <ThemeToggle
            onClick={toggleTheme}
            variants={themeToggleVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
        </Tooltip>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 