import React, { useState, useRef } from 'react';

const Tooltip = ({ children, content, position = 'top', delay = 100 }) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef();

  const show = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timeout.current);
    setVisible(false);
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      aria-label={typeof content === 'string' ? content : undefined}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '0.35em 0.75em',
            fontSize: '0.85em',
            boxShadow: 'var(--shadow-md)',
            pointerEvents: 'none',
            top: position === 'top' ? '-2.2em' : 'auto',
            bottom: position === 'bottom' ? '-2.2em' : 'auto',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.97,
            transition: 'opacity 0.15s',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip; 