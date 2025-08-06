import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Card Component with Glassmorphism
export const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--primary));
    opacity: 0.8;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 60%;
    height: 30%;
    background: linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 50%;
    filter: blur(8px);
    pointer-events: none;
    opacity: 0.6;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    
    &::before {
      height: 4px;
    }
    
    &::after {
      opacity: 1;
      filter: blur(12px);
    }
  }
  
  > * {
    position: relative;
    z-index: 2;
  }
`;

// Enhanced Button Component
export const EnhancedButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Floating Action Button
export const FloatingActionButton = styled(motion.button)`
  position: fixed;
  bottom: var(--space-2xl);
  right: var(--space-2xl);
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(74, 144, 226, 0.4);
  }
  
  @media (max-width: 768px) {
    bottom: var(--space-lg);
    right: var(--space-lg);
  }
`;

// Progress Bar Component
export const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--primary));
    border-radius: 4px;
    width: ${props => props.progress}%;
    transition: width 0.5s ease;
  }
`;

// Loading Spinner
export const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Toast Notification Component
export const Toast = styled(motion.div)`
  position: fixed;
  top: 80px;
  right: var(--space-2xl);
  background: linear-gradient(135deg, var(--accent-primary), var(--primary));
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 300px;
  
  @media (max-width: 768px) {
    right: var(--space-lg);
    left: var(--space-lg);
  }
`;

// Modal Overlay
export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
`;

// Modal Content
export const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--primary));
  }
`;

// Tooltip Component
export const Tooltip = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
  }
  
  &.top::before {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: rgba(0, 0, 0, 0.8);
  }
  
  &.bottom::before {
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: rgba(0, 0, 0, 0.8);
  }
`;

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover animations
export const hoverScale = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const hoverLift = {
  hover: { y: -4, scale: 1.02 },
  tap: { y: 0, scale: 0.98 }
};

// Toast Notification Hook
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);
  
  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };
  
  const ToastContainer = () => (
    <div style={{ position: 'fixed', top: '80px', right: 'var(--space-2xl)', zIndex: 1000 }}>
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: index > 0 ? 'var(--space-sm)' : 0 }}
          >
            {toast.message}
          </Toast>
        ))}
      </AnimatePresence>
    </div>
  );
  
  return { showToast, ToastContainer };
};

// Confetti Animation Component
export const Confetti = ({ isActive }) => {
  const confettiColors = ['#4a90e2', '#5ba0f5', '#7bb3f0', '#ffffff'];
  
  return (
    <AnimatePresence>
      {isActive && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999 }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              initial={{ y: -10, x: 0, rotate: 0 }}
              animate={{
                y: window.innerHeight + 10,
                x: Math.random() * 200 - 100,
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

// Pulse Animation Component
export const Pulse = styled(motion.div)`
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  background: var(--accent-primary);
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--accent-primary);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

export default {
  GlassCard,
  EnhancedButton,
  FloatingActionButton,
  ProgressBar,
  LoadingSpinner,
  Toast,
  ModalOverlay,
  ModalContent,
  Tooltip,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  hoverScale,
  hoverLift,
  useToast,
  Confetti,
  Pulse
}; 