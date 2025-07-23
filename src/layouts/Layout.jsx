import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary);
  transition: background-color var(--transition-normal);
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left var(--transition-normal);
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const ContentWrapper = styled.div`
  flex: 1;
  padding: var(--space-2xl);
  background-color: var(--bg-secondary);
  min-height: calc(100vh - 70px);
  
  @media (max-width: 768px) {
    padding: var(--space-lg);
  }
`

const PageHeader = styled.div`
  margin-bottom: var(--space-2xl);
`

const PageTitle = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity var(--transition-normal), visibility var(--transition-normal);
  
  @media (min-width: 769px) {
    display: none;
  }
`

const Layout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <LayoutContainer>
      <SideBar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <MainContent sidebarOpen={sidebarOpen}>
        <Header onMenuClick={toggleSidebar} />
        
        <ContentWrapper>
          {title && (
            <PageHeader>
              <PageTitle>{title}</PageTitle>
            </PageHeader>
          )}
          {children}
        </ContentWrapper>
      </MainContent>

      <Overlay show={sidebarOpen} onClick={closeSidebar} />
    </LayoutContainer>
  )
}

export default Layout 