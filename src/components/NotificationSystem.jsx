import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

// Animations for toast entrance and exit
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Container for all notifications
const NotificationContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--sm);
  max-width: 400px;
  
  @media (max-width: 768px) {
    top: 60px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

// Individual notification styles
const NotificationItem = styled.div`
  background: var(--card-gradient);
  backdrop-filter: var(--blur);
  border: 1px solid var(--border);
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return 'var(--success-green)';
      case 'error': return 'var(--danger-red)';
      case 'warning': return 'var(--warning-orange)';
      default: return 'var(--primary-green)';
    }
  }};
  border-radius: var(--radius);
  padding: var(--md);
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: flex-start;
  gap: var(--sm);
  animation: ${slideIn} 0.3s ease-out;
  
  ${props => props.isExiting && css`
    animation: ${slideOut} 0.3s ease-in;
  `}
`;

const IconContainer = styled.div`
  color: ${props => {
    switch (props.type) {
      case 'success': return 'var(--success-green)';
      case 'error': return 'var(--danger-red)';
      case 'warning': return 'var(--warning-orange)';
      default: return 'var(--primary-green)';
    }
  }};
  font-size: 1.2rem;
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
  color: var(--text-white);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-gray);
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--text-white);
  }
`;

// Progress bar for auto-dismiss
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${props => {
    switch (props.type) {
      case 'success': return 'var(--success-green)';
      case 'error': return 'var(--danger-red)';
      case 'warning': return 'var(--warning-orange)';
      default: return 'var(--primary-green)';
    }
  }};
  width: 100%;
  transform-origin: left;
  animation: shrink 5s linear forwards;
  
  @keyframes shrink {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
`;

/**
 * Individual Notification Component
 * Demonstrates:
 * - Conditional rendering based on props
 * - Event handling (close button)
 * - CSS animations with styled-components
 * - Icon mapping based on notification type
 */
const Notification = ({ notification, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiAlertCircle />;
      case 'warning':
        return <FiAlertCircle />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <NotificationItem type={notification.type}>
      <IconContainer type={notification.type}>
        {getIcon(notification.type)}
      </IconContainer>
      <Content>
        {notification.message}
      </Content>
      <CloseButton onClick={() => onClose(notification.id)}>
        <FiX />
      </CloseButton>
      <ProgressBar type={notification.type} />
    </NotificationItem>
  );
};

/**
 * Main Notification System Component
 * Demonstrates:
 * - Using Context API to access global state
 * - Mapping over arrays to render components
 * - Conditional rendering (only show if notifications exist)
 */
const NotificationSystem = () => {
  const { state, actions } = useAppContext();
  const { notifications } = state.ui;

  // Don't render anything if no notifications
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <NotificationContainer>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={actions.removeNotification}
        />
      ))}
    </NotificationContainer>
  );
};

export default NotificationSystem; 