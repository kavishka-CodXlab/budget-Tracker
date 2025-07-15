import React from 'react'
import styled, { css } from 'styled-components'
import { FiHome, FiPieChart, FiCreditCard, FiTrendingUp, FiDollarSign, FiTarget, FiBarChart2, FiSettings, FiX } from 'react-icons/fi'

const SidebarContainer = styled.aside`
  width: var(--sidebar);
  height: 100vh;
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border-right: 1px solid var(--border);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  padding: var(--lg) 0;
  overflow-y: auto;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);

  @media (max-width: 768px) {
    width: 80vw;
    max-width: 320px;
    transform: translateX(-100%);
    ${(props) => props.isMobile && css`
      transform: translateX(0);
    `}
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.isMobile ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    z-index: 1199;
    transition: opacity 0.3s;
  }
`;

const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: none;
    border: none;
    color: var(--text-white);
    font-size: 1.5rem;
    padding: var(--sm);
    cursor: pointer;
    margin-left: auto;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--lg);
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
  margin-bottom: var(--xs);
`;

const AvatarName = styled.div`
  color: var(--text-white);
  font-size: 0.9rem;
  font-weight: 600;
`;

const SidebarHeader = styled.div`
  padding: 0 var(--md);
  margin-bottom: var(--lg);
`;

const BrandName = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--xs);
`;

const BrandSubtitle = styled.p`
  color: var(--text-gray);
  font-size: 0.8rem;
  margin: 0;
`;

const NavSection = styled.div`
  margin-bottom: var(--lg);
`;

const SectionTitle = styled.h3`
  color: var(--text-gray);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 var(--md);
  margin-bottom: var(--sm);
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
  gap: var(--sm);
  padding: var(--sm) var(--md);
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 0 var(--radius) var(--radius) 0;
  margin-right: var(--md);
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background: var(--bg-glass);
    color: var(--primary-green);
    transform: translateX(4px);
  }
  
  &.active {
    background: linear-gradient(90deg, rgba(0,230,118,0.18) 0%, rgba(0,230,118,0.10) 100%);
    color: var(--primary-green);
    font-weight: 700;
    box-shadow: 0 0 8px 0 var(--primary-green);
    
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
  font-size: 1rem;
  width: 18px;
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

const SideBar = ({ isMobile, onClose }) => {
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
    <>
      <Overlay isMobile={isMobile} onClick={onClose} />
      <SidebarContainer isMobile={isMobile}>
        <CloseButton onClick={onClose} aria-label="Close sidebar">
          <FiX />
        </CloseButton>
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
      </SidebarContainer>
    </>
  )
}

export default SideBar 