import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-normal);
`;

const MainContent = styled(motion.main)`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  transition: margin-left var(--transition-normal);
  height: 100vh;
  overflow: hidden;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled(motion.div)`
  padding: var(--space-2xl);
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: var(--space-lg);
  }
`;

const PageTitle = styled(motion.h1)`
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--space-2xl);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-bg-strong);
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Layout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <SideBar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />
      
      <MainContent
        sidebarOpen={sidebarOpen}
      >
        <Header 
          onMenuClick={toggleSidebar}
        />
        
        <AnimatePresence mode="wait">
          <ContentArea
            key={title}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {title && (
              <PageTitle
                variants={titleVariants}
                initial="initial"
                animate="animate"
              >
                {title}
              </PageTitle>
            )}
            
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              {children}
            </motion.div>
          </ContentArea>
        </AnimatePresence>
      </MainContent>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <Overlay
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default Layout; 