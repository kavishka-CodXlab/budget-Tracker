import React, { useState } from 'react'
import styled from 'styled-components'
import { FiLogOut, FiSun, FiMenu, FiMoon } from 'react-icons/fi'

const HeaderContainer = styled.header`
  width: 100%;
  height: 72px;
  background: var(--bg-glass);
  backdrop-filter: var(--blur);
  color: #fff;
  display: flex;  
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 12px 0 var(--shadow);
  opacity: 1;
  transition: background 0.3s;

  @media (max-width: 768px) {
    height: 56px;
    top: 0;
    padding: 0 1rem;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--xl);
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-green);
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: var(--md);
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
`;

const AvatarName = styled.div`
  color: var(--text-white);
  font-size: 1rem;
  font-weight: 600;
`;

const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  object-fit: cover;
  background: var(--bg-card);
  box-shadow: 0 2px 8px 0 var(--shadow);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--md);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  padding: var(--sm);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--bg-glass);
    color: var(--primary-green);
  }
`;

const Header = ({ onMenuClick }) => {
  const [toggleBtn,setToggleBtn] = useState(false);
  return (
    <HeaderContainer>
      <HeaderContent>
        <Left>
          <MenuButton onClick={onMenuClick} aria-label="Open sidebar menu">
            <FiMenu />
          </MenuButton>
          <Avatar>BT</Avatar>
          <AvatarName>Budget User</AvatarName>
        </Left>
        <Actions>
          <IconButton title="Toggle theme" onClick={()=>{
            setToggleBtn(!toggleBtn);
            console.log("toggleBtn",toggleBtn); 
          }}>
            {toggleBtn ? <FiMoon /> : <FiSun />}  
          </IconButton>
          <IconButton title="Log out">
            <FiLogOut />
          </IconButton>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header 