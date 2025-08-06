import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100vh;
  width: 270px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  overflow-x: hidden;

  @media (min-width: 769px) {
    position: relative;
    transform: none;
    box-shadow: none;
  }
`;

const MobileCloseButton = styled(motion.button)`
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #7b8494;
  font-size: 1.7rem;
  cursor: pointer;
  z-index: 1101;
  display: block;
  border-radius: var(--radius-md);
  padding: var(--space-xs);
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    transform: scale(1.1);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarHeader = styled(motion.div)`
  padding: var(--space-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  min-height: 70px;
  backdrop-filter: blur(10px);
`;

const HeaderTitle = styled(motion.div)`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
`;

const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    transform: scale(1.1);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarContent = styled(motion.div)`
  flex: 1;
  padding: var(--space-l) 0;
  background: transparent;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-primary), var(--primary));
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 14px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--accent-primary);
    border-radius: 0 2px 2px 0;
    transition: height 0.3s ease;
    transform: translateY(-50%);
  }
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    transform: translateX(4px);
    
    &::before {
      opacity: 0.05;
    }
    
    &::after {
      height: 60%;
    }
  }
  
  &.active {
    background: linear-gradient(135deg, var(--accent-primary), var(--primary));
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(74, 144, 226, 0.3);
    transform: translateX(4px);
    
    &::before {
      opacity: 0;
    }
    
    &::after {
      height: 80%;
      background: white;
    }
    
    & svg {
      color: white;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  
  ${NavigationLink}:hover & {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  ${NavigationLink}.active & {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const LabelSpan = styled(motion.span)`
  display: ${props => (props.collapsed ? 'none' : 'inline')};
  transition: display 0.2s;
`;

const SidebarLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 0 24px 0;
  justify-content: center;
`;

const LogoImg = styled(motion.div)`
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #fff;
  font-family: 'Pacifico', cursive;
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
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BottomSection = styled(motion.div)`
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-primary), var(--primary));
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--accent-primary);
    transform: translateX(4px);
    
    &::before {
      opacity: 0.05;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const SideBar = ({ isOpen, onClose }) => {
  const navigationData = [
    { to: '/', icon: FiHome, label: 'Dashboard' },
    { to: '/transactions', icon: FiCreditCard, label: 'Transactions' },
    { to: '/goals', icon: FiTrendingUp, label: 'Goals' },
    { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { to: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Log out?',
      text: 'Are you sure you want to log out? All your data will be cleared from this device.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#4a90e2',
      cancelButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-primary') || '#5ba0f5',
      confirmButtonText: 'Yes, log out',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'swal2-popup-custom',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <SidebarContainer 
      $isOpen={isOpen}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MobileCloseButton 
        onClick={onClose} 
        aria-label="Close sidebar"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        &times;
      </MobileCloseButton>
      
      <SidebarLogo
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <LogoImg
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          B
        </LogoImg>
        <LogoText
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Budget Tracker
        </LogoText>
      </SidebarLogo>
      
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <AnimatePresence>
          {navigationData.map((item, index) => (
            <NavigationItem
              key={item.to}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <NavigationLink
                to={item.to}
                onClick={() => window.innerWidth <= 768 && onClose()}
                {...(item.to === '/' ? { end: true } : {})}  
                aria-label={item.label}
                tabIndex={0}
              >
                <IconWrapper
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon />
                </IconWrapper>
                <LabelSpan>{item.label}</LabelSpan>
              </NavigationLink>
            </NavigationItem>
          ))}
        </AnimatePresence>
      </nav>
      
      <BottomSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <BottomLink to="/help">
          <IconWrapper
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHelpCircle />
          </IconWrapper>
          Help
        </BottomLink>
        <BottomLink 
          as="a" 
          href="#" 
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <IconWrapper
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiLogOut />
          </IconWrapper>
          Logout
        </BottomLink>
      </BottomSection>
    </SidebarContainer>
  );
};

export default SideBar; 