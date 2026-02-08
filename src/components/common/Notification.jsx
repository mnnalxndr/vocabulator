import React, { useEffect } from 'react';
import './Notification.css';

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

  return (
    <div
      className="Notification-toast"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {message}
    </div>
  );
};

export default Notification;
