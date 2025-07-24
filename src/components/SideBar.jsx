import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiCreditCard, 
  FiTrendingUp, 
  FiBarChart2, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut, 
  FiBook, 
  FiPercent
} from 'react-icons/fi';
import Tooltip from './Tooltip';
import Swal from 'sweetalert2';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100vh;
  width: 270px;
  background: var(--bg-sidebar);
  border-right: 1px solid #f3f4f6;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 16px rgba(80, 80, 180, 0.04);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  overflow-x: hidden;

  @media (min-width: 769px) {
    position: relative;
    transform: none;
    box-shadow: none;
  }
`;


const MobileCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #7b8494;
  font-size: 1.7rem;
  cursor: pointer;
  z-index: 1101;
  display: block;
  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
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

const CloseButton = styled.button`
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

const SidebarContent = styled.div`
  flex: 1;
  padding: var(--space-l) 0;
  background-color: var(--bg-sidebar);
`;

const NavigationSection = styled.div`
  margin-bottom: var(--space-2xl);
`;

const SectionTitle = styled.h3`
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 var(--space-xl) var(--space-lg);
  padding-bottom: var(--space-sm);
`;

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavigationItem = styled.li`
  margin: 0;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 32px;
  color: #7b8494;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.08rem;
  border-radius: 14px;
  margin: 0 12px 8px 12px;
  height: 48px;
  min-height: 48px;
  box-sizing: border-box;
  line-height: 1;
  transition: background 0.18s, color 0.18s, font-weight 0.18s;
  &:hover {
    background: #f3f4f6;
    color: #23232b;
  }
  &.active {
    background: #eaff6b;
    color: #23232b;
    font-weight: 700;
    box-shadow: 0 2px 8px 0 rgba(200,220,80,0.08);
    & svg {
      color: #23232b;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  width: 28px;
  height: 28px;
`;

const LabelSpan = styled.span`
  display: ${props => (props.collapsed ? 'none' : 'inline')};
  transition: display 0.2s;
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 0 24px 0;
  justify-content: center;
`;
const LogoImg = styled.div`
  width: 38px;
  height: 38px;
  background: #23232b;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #fff;
  font-family: 'Pacifico', cursive;
`;
const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
`;
const BottomSection = styled.div`
  margin-top: auto;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const BottomLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 32px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 12px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #f3f4f6;
    color: #23232b;
  }
`;

const SideBar = ({ isOpen, onClose }) => {
  const navigationData = [
    { to: '/', icon: FiHome, label: 'Dashboard' },
    { to: '/transactions', icon: FiCreditCard, label: 'Transactions' },
    { to: '/goals', icon: FiTrendingUp, label: 'Goals' },
    { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { to: '/halal-guide', icon: FiBook, label: 'Halal Guide' },
    { to: '/zakat-calculator', icon: FiPercent, label: 'Zakat Calculator' },
    { to: '/settings', icon: FiSettings, label: 'Settings' },

  ];

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'All your local data will be cleared.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#eaff6b',
      cancelButtonColor: '#23232b',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      background: '#23232b',
      color: '#fff',
      customClass: {
        popup: 'swal2-custom',
        confirmButton: 'swal2-confirm-custom',
        cancelButton: 'swal2-cancel-custom'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <MobileCloseButton onClick={onClose} aria-label="Close sidebar">&times;</MobileCloseButton>
      <SidebarLogo>
        <LogoImg>M</LogoImg>
        <LogoText>Mitchell</LogoText>
      </SidebarLogo>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {navigationData.map((item) => (
          <NavigationLink
            key={item.to}
            to={item.to}
            onClick={() => window.innerWidth <= 768 && onClose()}
            {...(item.to === '/' ? { end: true } : {})}  
            aria-label={item.label}
            tabIndex={0}
          >
            <IconWrapper>
              <item.icon />
            </IconWrapper>
            <span>{item.label}</span>
          </NavigationLink>
        ))}
      </nav>
      <BottomSection>
        <BottomLink to="/help">
          <IconWrapper><FiHelpCircle /></IconWrapper>
          Help
        </BottomLink>
        <BottomLink as="a" href="#" onClick={handleLogout}>
          <IconWrapper><FiLogOut /></IconWrapper>
          Logout
        </BottomLink>
      </BottomSection>
    </SidebarContainer>
  );
};

export default SideBar; 