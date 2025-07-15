import React, { useState } from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBar'
import Header from '../components/Header'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: var(--xl);
  background: var(--bg-gradient);
  min-height: 100vh;
  margin-top: 72px;
  transition: margin 0.3s;

  @media (max-width: 768px) {
    padding: var(--md);
    min-height: 100vh;
    margin-top: 56px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--xl);
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageLayout = ({ children, title }) => {
  const [isMobileSidebar, setMobileSidebar] = useState(false);

  const handleMenuClick = () => setMobileSidebar(true);
  const handleSidebarClose = () => setMobileSidebar(false);

  return (
    <LayoutContainer>
      <Header onMenuClick={handleMenuClick} />
      {/* Sidebar as drawer on mobile */}
      <SideBar isMobile={isMobileSidebar} onClose={handleSidebarClose} />
      <MainContent>
        {title && <PageTitle>{title}</PageTitle>}
        {children}
      </MainContent>
    </LayoutContainer>
  )
}

export default PageLayout 