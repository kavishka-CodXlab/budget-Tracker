import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiCreditCard, 
  FiTarget, 
  FiBarChart3, 
  FiTrendingUp, 
  FiSettings,
  FiX
} from 'react-icons/fi'

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-primary);
  z-index: 999;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform var(--transition-normal);
  overflow-y: auto;
  
  @media (min-width: 769px) {
    transform: translateX(0);
    position: relative;
    height: 100vh;
  }
`

const SidebarHeader = styled.div`
  padding: var(--space-xl);
  border-bottom: 1px solid var(--border-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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

const SidebarTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`

const Navigation = styled.nav`
  padding: var(--space-lg);
`

const NavSection = styled.div`
  margin-bottom: var(--space-xl);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
  padding: 0 var(--space-md);
`

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`

const NavItem = styled.li`
  margin: 0;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
  
  &.active {
    background-color: var(--accent-primary-light);
    color: var(--accent-primary);
    font-weight: 600;
    
    svg {
      color: var(--accent-primary);
    }
  }
  
  svg {
    flex-shrink: 0;
    color: inherit;
  }
`

const SideBar = ({ isOpen, onClose }) => {
  const navigationItems = [
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
        { to: '/analytics', icon: FiBarChart3, label: 'Analytics' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { to: '/settings', icon: FiSettings, label: 'Settings' },
      ]
    }
  ]

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>Navigation</SidebarTitle>
        <CloseButton onClick={onClose}>
          <FiX size={16} />
        </CloseButton>
      </SidebarHeader>
      
      <Navigation>
        {navigationItems.map((section, index) => (
          <NavSection key={index}>
            <SectionTitle>{section.section}</SectionTitle>
            <NavList>
              {section.items.map((item) => (
                <NavItem key={item.to}>
                  <StyledNavLink 
                    to={item.to} 
                    onClick={onClose}
                    end={item.to === '/'}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </StyledNavLink>
                </NavItem>
              ))}
            </NavList>
          </NavSection>
        ))}
      </Navigation>
    </SidebarContainer>
  )
}

export default SideBar 