import React from 'react'
import styled from 'styled-components'
import { FiBell, FiUser, FiSettings, FiTrendingUp } from 'react-icons/fi'

const HeaderContainer = styled.header`
  width: 100%;
  height: var(--header-height);
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--xl);
  position: fixed;
  top: 0;
  left: var(--sidebar);
  right: 0;
  z-index: 100;
  box-shadow: var(--shadow-card);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sm);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white);
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--bg-dark);
  box-shadow: var(--shadow-glow);
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Tagline = styled.span`
  color: var(--text-gray);
  font-size: 0.9rem;
  font-weight: 400;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
`;

const NotificationButton = styled.button`
  width: 40px;
  height: 40px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    color: var(--primary-green);
    border-color: var(--primary-green);
    transform: translateY(-2px);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: var(--danger-red);
  border-radius: 50%;
  border: 2px solid var(--bg-dark);
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
  padding: var(--sm) var(--md);
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    transform: translateY(-2px);
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-dark);
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--text-white);
  font-size: 0.9rem;
`;

const UserRole = styled.span`
  color: var(--text-gray);
  font-size: 0.8rem;
`;

const SettingsButton = styled.button`
  width: 40px;
  height: 40px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-green);
    border-color: var(--primary-green);
    transform: translateY(-2px);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <Logo>
          <LogoIcon>
            <FiTrendingUp />
          </LogoIcon>
          <div>
            <LogoText>BudgetTracker</LogoText>
            <Tagline>Smart Financial Management</Tagline>
          </div>
        </Logo>
      </LogoSection>
      
      <HeaderActions>
        <NotificationButton>
          <FiBell />
          <NotificationBadge />
        </NotificationButton>
        
        <UserSection>
          <UserAvatar>JD</UserAvatar>
          <UserInfo>
            <UserName>John Doe</UserName>
            <UserRole>Premium User</UserRole>
          </UserInfo>
        </UserSection>
        
        <SettingsButton>
          <FiSettings />
        </SettingsButton>
      </HeaderActions>
    </HeaderContainer>
  )
}

export default Header 