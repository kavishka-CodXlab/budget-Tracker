import React from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBar'
import Header from '../components/Header'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: var(--sidebar);
  margin-top: var(--header-height);
  padding: var(--xl);
  background: var(--bg-gradient);
  min-height: calc(100vh - var(--header-height));
`;

const PageLayout = ({ children, title }) => {
  return (
    <LayoutContainer>
      <SideBar />
      <div style={{ flex: 1 }}>
        <Header />
        <MainContent>
          {title && (
            <PageTitle>{title}</PageTitle>
          )}
          {children}
        </MainContent>
      </div>
    </LayoutContainer>
  )
}

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--xl);
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export default PageLayout 