import React, { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message && duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'var(--success)';
      case 'error':
        return 'var(--error)';
      case 'info':
        return 'var(--info)';
      default:
        return 'var(--info)';
    }
  };

  const styles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '4px',
    backgroundColor: getBackgroundColor(),
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    maxWidth: '300px',
    wordWrap: 'break-word'
  };

  return (
    <div style={styles}>
      {message}
    </div>
  );
};

export default Notification;
