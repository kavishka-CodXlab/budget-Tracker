import React from 'react'
import styled from 'styled-components'
import { FiHome, FiPieChart, FiCreditCard, FiTrendingUp, FiDollarSign, FiTarget, FiBarChart2, FiSettings } from 'react-icons/fi'

const SidebarContainer = styled.aside`
  width: var(--sidebar);
  height: 100vh;
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border-right: 1px solid var(--border);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  padding: var(--xl) 0;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 0 var(--lg);
  margin-bottom: var(--xl);
`;

const BrandName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--xs);
`;

const BrandSubtitle = styled.p`
  color: var(--text-gray);
  font-size: 0.9rem;
  margin: 0;
`;

const NavSection = styled.div`
  margin-bottom: var(--xl);
`;

const SectionTitle = styled.h3`
  color: var(--text-gray);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 var(--lg);
  margin-bottom: var(--md);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: var(--xs);
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--md);
  padding: var(--md) var(--lg);
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 0 var(--radius) var(--radius) 0;
  margin-right: var(--lg);
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background: var(--bg-glass);
    color: var(--primary-green);
    transform: translateX(4px);
  }
  
  &.active {
    background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
    color: var(--bg-dark);
    font-weight: 600;
    box-shadow: var(--shadow-glow);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--primary-green);
      border-radius: 0 2px 2px 0;
    }
  }
`;

const NavIcon = styled.div`
  font-size: 1.2rem;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavText = styled.span`
  flex: 1;
`;

const Badge = styled.span`
  background: var(--danger-red);
  color: var(--text-white);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

const SidebarFooter = styled.div`
  padding: var(--lg);
  border-top: 1px solid var(--border);
  margin-top: auto;
`;

const QuickStats = styled.div`
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--md);
  margin-bottom: var(--md);
`;

const QuickStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sm);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const QuickStatLabel = styled.span`
  color: var(--text-gray);
  font-size: 0.8rem;
`;

const QuickStatValue = styled.span`
  color: var(--primary-green);
  font-weight: 600;
  font-size: 0.9rem;
`;

const SideBar = () => {
  const mainNavItems = [
    { icon: FiHome, text: 'Dashboard', active: true },
    { icon: FiPieChart, text: 'Overview' },
    { icon: FiCreditCard, text: 'Transactions' },
    { icon: FiTrendingUp, text: 'Analytics' }
  ]

  const financialNavItems = [
    { icon: FiDollarSign, text: 'Income', badge: '3' },
    { icon: FiTarget, text: 'Goals' },
    { icon: FiBarChart2, text: 'Reports' },
    { icon: FiSettings, text: 'Settings' }
  ]

  return (
    <SidebarContainer>
      <SidebarHeader>
        <BrandName>BudgetTracker</BrandName>
        <BrandSubtitle>Financial Freedom</BrandSubtitle>
      </SidebarHeader>

      <NavSection>
        <SectionTitle>Main Menu</SectionTitle>
        <NavList>
          {mainNavItems.map((item, index) => (
            <NavItem key={index}>
              <NavLink href="#" className={item.active ? 'active' : ''}>
                <NavIcon>
                  <item.icon />
                </NavIcon>
                <NavText>{item.text}</NavText>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavSection>

      <NavSection>
        <SectionTitle>Financial Tools</SectionTitle>
        <NavList>
          {financialNavItems.map((item, index) => (
            <NavItem key={index}>
              <NavLink href="#">
                <NavIcon>
                  <item.icon />
                </NavIcon>
                <NavText>{item.text}</NavText>
                {item.badge && <Badge>{item.badge}</Badge>}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavSection>

      <SidebarFooter>
        <QuickStats>
          <QuickStatItem>
            <QuickStatLabel>Monthly Budget</QuickStatLabel>
            <QuickStatValue>$4,200</QuickStatValue>
          </QuickStatItem>
          <QuickStatItem>
            <QuickStatLabel>Spent</QuickStatLabel>
            <QuickStatValue>$2,850</QuickStatValue>
          </QuickStatItem>
          <QuickStatItem>
            <QuickStatLabel>Remaining</QuickStatLabel>
            <QuickStatValue>$1,350</QuickStatValue>
          </QuickStatItem>
        </QuickStats>
      </SidebarFooter>
    </SidebarContainer>
  )
}

export default SideBar 