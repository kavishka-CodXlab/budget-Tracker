import React from 'react'
import styled from 'styled-components'
import { FiMenu, FiSun, FiMoon, FiDollarSign } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xl);
  height: 70px;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all var(--transition-normal);
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: transparent;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  
  svg {
    color: var(--accent-primary);
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    background-color: var(--accent-primary-light);
    color: var(--accent-primary);
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-secondary);
  font-size: 0.875rem;
  
  @media (max-width: 480px) {
    display: none;
  }
`

const Header = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onMenuClick}>
          <FiMenu size={20} />
        </MenuButton>
        
        <Logo>
          <FiDollarSign size={24} />
          Budget Tracker
        </Logo>
      </LeftSection>

      <RightSection>
        <ThemeToggle onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </ThemeToggle>
        
        <UserSection>
          Personal Finance
        </UserSection>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header 